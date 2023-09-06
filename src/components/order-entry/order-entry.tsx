import styles from "./order-entry.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIcon from "../order-icon/order-icon";
import { useSelector } from "../../services/hooks";
import { useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { formatNumber, getOrderStatus, formatDate } from "../../utils/data";
import { TIngredient, TOrder } from "../../services/types/data";

const OrderEntry: React.FC<{
  index?: number, 
  order: TOrder, 
  showStatus: boolean
}> = ({ index, order, showStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const [orderIcons, setIcons] = useState<React.ReactElement[] | null>(null);
  const maxIcons = 6;

  const getImage = useCallback(
    (id) => {
      return ingredients.find((ingredient: TIngredient) => ingredient._id === id)?.image;
    },
    [ingredients]
  );

  const calculatePrice = useCallback(
    (ids) => {
      return ids.reduce((acc: number, id: string) => {
        const price = ingredients.find((item: TIngredient) => item._id === id)?.price;
        if (price) return acc + price; else return acc;
      }, 0);
    },
    [ingredients]
  );

  useEffect(() => {
    const truncatedIngredients = order.ingredients.slice(0, maxIcons);
    const restAmount = order.ingredients.length - maxIcons + 1;
    setIcons(
      truncatedIngredients.map((id: string, index: number) => {
        if (restAmount > 1 && index >= maxIcons - 1) {
          return (
            <OrderIcon
              key={`${index}+${id}`}
              image={getImage(id)}
              rest={`+${restAmount}`}
              extraStyle={{ zIndex: "1", marginLeft: "-16px" }}
            />
          );
        }
        return (
          <OrderIcon
            key={`${index}+${id}`}
            image={getImage(id)}
            rest={null}
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
        <p className="text text_type_main-medium">{order.name? order.name : ""}</p>
      </div>
      {showStatus && <div className="mt-2">{getOrderStatus(order.status)}</div>}
      <div className={styles.orderInfo + " mt-6 mb-6"}>
        <div className={styles.orderContents + " ml-4"}>{orderIcons}</div>
        <div className={styles.orderPrice}>
          <p className="text text_type_digits-default mr-2">
            {formatNumber(calculatePrice(order.ingredients))}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderEntry;
