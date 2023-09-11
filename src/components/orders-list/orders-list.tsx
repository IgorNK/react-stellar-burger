import styles from "./orders-list.module.css";
// import { useEffect } from "react";
// import { useDispatch } from "../../services/hooks";
import OrderEntry from "../order-entry/order-entry";
// import { WS_CONNECTION_CLOSE, wsClose } from "../../services/actions/socket";
import { TOrder } from "../../services/types/data";

const OrdersList: React.FC<{
  orders: ReadonlyArray<TOrder>, 
  showStatus: boolean
}> = ({ orders, showStatus }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     dispatch(wsClose());
  //   };
  // }, []);

  return (
    <div className={styles.orders + " custom-scroll pr-2"}>
      {orders?.map((order: TOrder) => (
        <OrderEntry key={order._id} order={order} showStatus={showStatus} />
      ))}
    </div>
  );
};

export default OrdersList;
