import styles from "./orders-list.module.css";
import OrderEntry from "../order-entry/order-entry";

const OrdersList = ({ orders, showStatus }) => {
  return (
    <div className={styles.orders + " custom-scroll pr-2"}>
      {orders?.map((order) => (
        <OrderEntry key={order._id} order={order} showStatus={showStatus} />
      ))}
    </div>
  );
};

export default OrdersList;
