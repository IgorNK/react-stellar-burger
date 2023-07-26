import styles from "./order-info.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  getOrderStatus,
  formatDate,
  formatNumber,
  dataUrl,
} from "../../utils/data";
import Api from "../../services/api";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIcon from "../order-icon/order-icon";

const OrderInfo = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderList, setOrderList] = useState(null);
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  const getOrder = useCallback(async () => {
    const api = new Api({ baseUrl: dataUrl });
    const order = await api.getOrder(id);
    setOrder(order?.orders[0]);
  }, [id]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  const getIngredient = useCallback(
    (id) => {
      return ingredients.find((ingredient) => ingredient._id === id);
    },
    [ingredients]
  );

  const calculatePrice = useCallback(
    (ids) => {
      return ids?.reduce((acc, id) => {
        const price = ingredients?.find((item) => item._id === id)?.price;
        return acc + price;
      }, 0);
    },
    [ingredients]
  );

  useEffect(() => {
    const ingredientsSet = new Set(order?.ingredients);
    setOrderList(
      [...ingredientsSet].map((id, index) => {
        const ingredient = getIngredient(id);
        const amount = order?.ingredients.reduce(
          (acc, ingredientId) => (id === ingredientId ? acc + 1 : acc),
          0
        );
        return (
          <div key={index} className={styles.listElement}>
            <OrderIcon image={ingredient?.image} />
            <p className="text text_type_main-default">{ingredient?.name}</p>
            <div className={styles.orderPrice}>
              <p className="text text_type_digits-default mr-2">{`${amount} x ${ingredient?.price}`}</p>
              <CurrencyIcon />
            </div>
          </div>
        );
      })
    );
  }, [ingredients, getIngredient, order]);

  return (
    <div className={styles.orderInfo}>
      <p
        className={styles.orderNumber + " text text_type_digits-default mb-10"}
      >{`#${order ? order.number : "Подождите..."}`}</p>
      <h2 className="text text_type_main-medium mb-3">{order?.name}</h2>
      <div className="mb-15">{getOrderStatus(order?.status)}</div>
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <div className={styles.ordersList + " custom-scroll mb-10 pr-6"}>
        {orderList}
      </div>
      <div className={styles.orderBottomLine}>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(order?.createdAt)}
        </p>
        <div className={styles.orderPrice}>
          <p className="text text_type_digits-default mr-2">
            {formatNumber(calculatePrice(order?.ingredients))}
          </p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
