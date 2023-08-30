import styles from "./orders-list.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OrderEntry from "../order-entry/order-entry";
import { WS_CONNECTION_CLOSE } from "../../services/actions/socket";

const OrdersList: React.FC<{
  orders: TOrder[], 
  showStatus: boolean
}> = ({ orders, showStatus }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, []);

  return (
    <div className={styles.orders + " custom-scroll pr-2"}>
      {orders?.map((order: TOrder) => (
        <OrderEntry key={order._id} order={order} showStatus={showStatus} />
      ))}
    </div>
  );
};

export default OrdersList;
