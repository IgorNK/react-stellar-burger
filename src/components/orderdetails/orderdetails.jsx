import styles from "./orderdetails.module.css";
import orderAcceptedIcon from "../../images/order_accepted.svg";

const OrderDetails = (props) => {
  return (
    <div className={styles.container + " mt-30 mb-30"}>
      <p className={styles.orderid + " text text_type_digits-large"}>
        {props.number}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img
        className="mt-15 mb-15"
        src={orderAcceptedIcon}
        alt="Order accepted"
      />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
