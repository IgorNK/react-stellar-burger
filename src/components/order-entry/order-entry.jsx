import styles from "./order-entry.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIcon from "../order-icon/order-icon";
import { useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";

const OrderEntry = ({ order }) => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const [orderIcons, setIcons] = useState(null);
  const maxIcons = 5;

  const getImage = useCallback(
    (id) => {
      return ingredients.find((ingredient) => ingredient._id === id)?.image;
    },
    [ingredients]
  );

  const calculatePrice = useCallback((ids) => {
    return ids.reduce((acc, id) => {
      const price = ingredients.find(item => item._id === id)?.price;
      return acc + price;
    }, 0);
  }, [ingredients]);

  //in: "2021-06-23T14:43:22.587Z"
  //out: Сегодня, 16:20 i-GMT+3
  const formatDate = (date) => {
    const orderDate = new Date(Date.parse(date));
    const currentDate = new Date(Date.now());
    const twoDays = 2*24*60*60*1000;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const hoursOffset = currentDate.getTimezoneOffset() / 60;
    const dateOptions = { dateStyle: 'medium', timeStyle: 'medium', timeZone: timezone };
    if (currentDate - orderDate < twoDays) {
      //TODO
    }
    return `${orderDate.toLocaleString(navigator.language, dateOptions)}, i-GMT${hoursOffset > 0 ? '+' + hoursOffset : hoursOffset}`;
  }

  useEffect(() => {
    const truncatedIngredients = order.ingredients.slice(0, maxIcons);
    const restAmount = order.ingredients.length - maxIcons + 1;
    setIcons(truncatedIngredients.map((id, index) => {
      if (restAmount > 1 && index >= maxIcons - 1) {
        return <OrderIcon image={getImage(id)} rest={`+${restAmount}`} extraStyle={{zIndex: "1"}} />
      }
      return <OrderIcon image={getImage(id)} extraStyle={{zIndex: `${maxIcons - index}`}} />
    }));
  }, [ingredients, getImage, order.ingredients]);

  return (
    <div className={styles.orderEntry}>
      <div className={styles.orderNumber + " mt-6"}>
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(order.createdAt)}
        </p>
      </div>
      <div className="mt-6">
        <p className="text text_type_main-medium">
          Death Star Starship Main бургер
        </p>
      </div>
      <div className={styles.orderInfo + " mt-6 mb-6"}>
        <div className={styles.orderContents}>
          {orderIcons}
        </div>
        <div className={styles.orderPrice}>
          <p className="text text_type_digits-default">{calculatePrice(order.ingredients)}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

export default OrderEntry;
