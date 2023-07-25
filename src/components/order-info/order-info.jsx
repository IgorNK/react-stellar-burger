import styles from "./order-info.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  testFeedOrders,
  getOrderStatus,
  formatDate,
  formatNumber,
} from "../../utils/data";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIcon from "../order-icon/order-icon";

const OrderInfo = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderList, setOrderList] = useState(null);
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  useEffect(() => {
    setOrder(
      testFeedOrders.orders.find((order) => order.number === Number(id))
    );
  }, [id]);

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
      [...ingredientsSet].map((id) => {
        const ingredient = getIngredient(id);
        const amount = order?.ingredients.reduce(
          (acc, ingredientId) => (id === ingredientId ? acc + 1 : acc),
          0
        );
        return (
          <div className={styles.listElement}>
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
    // const truncatedIngredients = order.ingredients.slice(0, maxIcons);
    // const restAmount = order.ingredients.length - maxIcons + 1;
    // setIcons(
    //   truncatedIngredients.map((id, index) => {
    //     if (restAmount > 1 && index >= maxIcons - 1) {
    //       return (
    //         <OrderIcon
    //           image={getImage(id)}
    //           rest={`+${restAmount}`}
    //           extraStyle={{ zIndex: "1" }}
    //         />
    //       );
    //     }
    //     return (
    //       <OrderIcon
    //         image={getImage(id)}
    //         extraStyle={{ zIndex: `${maxIcons - index}` }}
    //       />
    //     );
    //   })
    // );
  }, [ingredients, getIngredient, order]);

  return (
    <div className={styles.orderInfo}>
      <p
        className={styles.orderNumber + " text text_type_digits-default mb-10"}
      >{`#${order?.number}`}</p>
      <h2 className="text text_type_main-medium mb-3">
        Black Hole Singularity острый бургер
      </h2>
      <p className="text text_type_main-small mb-15">
        {getOrderStatus(order?.status)}
      </p>
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
