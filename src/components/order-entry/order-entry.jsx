import styles from "./order-entry.module.css";
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIcon from "../order-icon/order-icon";
import { useSelector } from "react-redux";

const OrderEntry = ({ order }) => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  
  const getImage = (id) => {
    return ingredients.find(ingredient => ingredient._id == id);
  };

  const orderIcons = (ids) => {
    return (
      <>
        {
          ids.map(id => <OrderIcon image={getImage(id)} />)
        }
      </>
    )
  }
  
  return (
    <div className={styles.orderEntry}>
      <div className={styles.orderNumber + " mt-6"}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <div className="mt-6">
        <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
      </div>
      <div className={styles.orderInfo + " mt-6 mb-6"}>
        <div classname={styles.orderContents}>
          {orderIcons(order.ingredients)}
        </div>
        <div className={styles.orderPrice}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  )
}

export default OrderEntry;