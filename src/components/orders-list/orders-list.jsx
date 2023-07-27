import styles from "./orders-list.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OrderEntry from "../order-entry/order-entry";
import { WS_CONNECTION_CLOSE } from "../../services/actions/socket";
import { PropTypes } from "prop-types";

const OrdersList = ({ orders, showStatus }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, []);

  return (
    <div className={styles.orders + " custom-scroll pr-2"}>
      {orders?.map((order) => (
        <OrderEntry key={order._id} order={order} showStatus={showStatus} />
      ))}
    </div>
  );
};

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  showStatus: PropTypes.bool,
};

export default OrdersList;
