import styles from "./feed.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { formatNumber, wsFeedUrl } from "../utils/data";
import OrdersList from "../components/orders-list/orders-list";
import { WS_CONNECTION_START } from "../services/actions/socket";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { wsConnected, feedOrders, total, totalToday } = useSelector(
    (store) => store.feed
  );
  const [readyOrderNumbers, setReadyOrderNumbers] = useState([]);
  const [cookingOrderNumbers, setCookingOrderNumbers] = useState([]);

  useEffect(() => {
    if (!wsConnected) {
      dispatch({
        type: WS_CONNECTION_START,
        payload: { wsUrl: wsFeedUrl, storage: "feed" },
      });
    } else {
    }
  }, [wsConnected, dispatch]);

  useEffect(() => {
    setReadyOrderNumbers(
      feedOrders
        ?.filter((order) => order.status === "done")
        .map((order) => order.number)
        .slice(0, 20)
    );
    setCookingOrderNumbers(
      feedOrders
        ?.filter((order) => order.status !== "done")
        .map((order) => order.number)
        .slice(0, 20)
    );
  }, [feedOrders]);

  return (
    <section className={styles.twoColumns}>
      <div className={styles.feed}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <OrdersList orders={feedOrders} />
      </div>
      <div className={styles.ordersInfo}>
        <div className={styles.ordersTable}>
          <div className={styles.ordersColumn}>
            <h2 className="text text_type_main-medium">Готовы:</h2>
            <ul className={styles.ordersList + " mt-6"}>
              {readyOrderNumbers?.map((number, index) => (
                <li
                  key={index}
                  className={
                    styles.listElement +
                    "text text_type_digits-default mt-2 mr-4"
                  }
                  style={{ color: "#0cc" }}
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.ordersColumn}>
            <h2 className="text text_type_main-medium">В работе:</h2>
            <ul className={styles.ordersList + " mt-6"}>
              {cookingOrderNumbers?.map((number, index) => (
                <li
                  key={index}
                  className={
                    styles.listElement +
                    "text text_type_digits-default mt-2 mr-4"
                  }
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.ordersCompleted}>
          <h2 className="text text_type_main-medium mt-15">
            Выполнено за все время:
          </h2>
          <p className={styles.fancyShadow + " text text_type_digits-large"}>
            {formatNumber(total)}
          </p>
        </div>
        <div className={styles.ordersCompleted}>
          <h2 className="text text_type_main-medium mt-15">
            Выполнено сегодня:
          </h2>
          <p className={styles.fancyShadow + " text text_type_digits-large"}>
            {formatNumber(totalToday)}
          </p>
        </div>
      </div>
    </section>
  );
};
