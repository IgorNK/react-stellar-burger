import styles from "./orderdetails.module.css";

const OrderDetails = (props) => {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large">{props.data.orderId}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src="/order-accepted.svg" alt="Order accepted" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
