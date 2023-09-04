import styles from "./order-details.module.css";
import orderAcceptedIcon from "../../images/order_accepted.svg";
import { useEffect } from "react";
import { useDispatch } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { ORDER_REPORTED } from "../../services/actions/order";

const OrderDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({
      type: ORDER_REPORTED,
    });
  }, [dispatch]);

  return (
    <div className={styles.container + " mt-30 mb-30"}>
      <p className={styles.orderId + " text text_type_digits-large"}>{id}</p>
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
