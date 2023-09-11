import styles from "./order-info.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "../../services/hooks";
import {
  getOrderStatus,
  formatDate,
  formatNumber,
  dataUrl,
} from "../../utils/data";
import Api from "../../services/api";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsListElement from "../ingredients-list-element/ingredients-list-element";
import { TIngredient, TOrder, TOrdersResponse } from "../../services/types/data";

const OrderInfo: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<TOrder | null>(null);
  const [orderList, setOrderList] = useState<React.ReactElement[] | null>(null);
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  const getOrder = useCallback(async () => {
    if (!id) return;
    const api = new Api({ baseUrl: dataUrl });
    const order = await api.getOrder(id) as TOrdersResponse;
    setOrder(order?.orders[0]);
  }, [id]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  const getIngredient = useCallback(
    (id) => {
      return ingredients.find((ingredient: TIngredient) => ingredient._id === id);
    },
    [ingredients]
  );

  const calculatePrice = useCallback(
    (ids) => {
      return ids?.reduce((acc: number, id: string) => {
        const price = ingredients?.find((item: TIngredient) => item._id === id)?.price;
        if (price) return acc + price; else return acc;
      }, 0);
    },
    [ingredients]
  );

  useEffect(() => {
    const ingredientsSet = new Set(order?.ingredients);
    setOrderList(
      [...ingredientsSet].map((id: string, index: number) => {
        const ingredient = getIngredient(id);
        const amount = order?.ingredients.reduce(
          (acc: number, ingredientId: string) => (id === ingredientId ? acc + 1 : acc),
          0
        );
        return (
          <IngredientsListElement
            key={index}
            ingredient={ingredient}
            amount={amount}
          />
        );
      })
    );
  }, [ingredients, getIngredient, order]);

  return (
    <div className={styles.orderInfo}>
      <p
        className={styles.orderNumber + " text text_type_digits-default mb-10"}
      >{`#${order ? order.number : "Подождите..."}`}</p>
      <h2 className="text text_type_main-medium mb-3">{order?.name ? order?.name : ""}</h2>
      <div className="mb-15">{getOrderStatus(order?.status ? order?.status : "")}</div>
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <ul className={styles.ordersList + " custom-scroll"}>{orderList}</ul>
      <div className={styles.orderBottomLine + " mt-10"}>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(order?.createdAt ? order?.createdAt : "")}
        </p>
        <div className={styles.orderPrice}>
          <p className="text text_type_digits-default mr-2">
            {order?.ingredients ? formatNumber(calculatePrice(order?.ingredients)) : ""}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
