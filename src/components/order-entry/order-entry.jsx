import styles from "./order-entry.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIcon from "../order-icon/order-icon";
import { useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { formatNumber, getOrderStatus, formatDate } from "../../utils/data";

const OrderEntry = ({ order, showStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const [orderIcons, setIcons] = useState(null);
  const maxIcons = 6;

  const getImage = useCallback(
    (id) => {
      return ingredients.find((ingredient) => ingredient._id === id)?.image;
    },
    [ingredients]
  );

  const calculatePrice = useCallback(
    (ids) => {
      return ids.reduce((acc, id) => {
        const price = ingredients.find((item) => item._id === id)?.price;
        return acc + price;
      }, 0);
    },
    [ingredients]
  );

  useEffect(() => {
    const truncatedIngredients = order.ingredients.slice(0, maxIcons);
    const restAmount = order.ingredients.length - maxIcons + 1;
    setIcons(
      truncatedIngredients.map((id, index) => {
        if (restAmount > 1 && index >= maxIcons - 1) {
          return (
            <OrderIcon
              image={getImage(id)}
              rest={`+${restAmount}`}
              extraStyle={{ zIndex: "1", marginLeft: "-16px" }}
            />
          );
        }
        return (
          <OrderIcon
            image={getImage(id)}
            extraStyle={{ zIndex: `${maxIcons - index}`, marginLeft: "-16px" }}
          />
        );
      })
    );
  }, [ingredients, getImage, order.ingredients]);

  const onOrderClick = useCallback(() => {
    navigate(`${order.number}`, { state: { background: location } });
  }, [navigate, location, order.number]);

  return (
    <div onClick={onOrderClick} className={styles.orderEntry}>
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
      {showStatus && <div className="mt-2">{getOrderStatus(order.status)}</div>}
      <div className={styles.orderInfo + " mt-6 mb-6"}>
        <div className={styles.orderContents + " ml-4"}>{orderIcons}</div>
        <div className={styles.orderPrice}>
          <p className="text text_type_digits-default mr-2">
            {formatNumber(calculatePrice(order.ingredients))}
          </p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

export default OrderEntry;
