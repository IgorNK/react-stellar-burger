import styles from "./feed.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { testFeedOrders } from "../utils/data";
import { formatNumber } from "../utils/data";
import OrdersList from "../components/orders-list/orders-list";
import { WS_CONNECTION_START } from "../services/actions/socket";

export const FeedPage = () => {
  //const { orders, total, totalToday } = testFeedOrders;
  const dispatch = useDispatch();
  const { wsConnected, orders, total, totalToday } = useSelector(store => store.feed);
  const [readyOrderNumbers, setReadyOrderNumbers] = useState([]);
  const [cookingOrderNumbers, setCookingOrderNumbers] = useState([]);

  useEffect(
    () => {
      if (!wsConnected) { 
        console.log('not connected, dispatching connect action');
        dispatch({ type: WS_CONNECTION_START });
      } else {
        console.log('is now connected!');
      }
    },
    [wsConnected, dispatch]
  );

  useEffect(() => {
    console.log(`orders updated: ${orders?.length}`);
    setReadyOrderNumbers(
      orders
        ?.filter((order) => order.status === "done")
        .map((order) => order.number)
    );
    setCookingOrderNumbers(
      orders
        ?.filter((order) => order.status !== "done")
        .map((order) => order.number)
    );
  }, [orders])

  return (
    <section className={styles.twoColumns}>
      <div className={styles.feed}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <OrdersList orders={orders} />
      </div>
      <div className={styles.ordersInfo}>
        <div className={styles.ordersTable}>
          <div className={styles.ordersColumn}>
            <h2 className="text text_type_main-medium">Готовы:</h2>
            <div className={styles.ordersList + " mt-6"}>
              {readyOrderNumbers?.map((number) => (
                <p
                  className="text text_type_digits-default mt-2 mr-4"
                  style={{ color: "#0cc" }}
                >
                  {number}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.ordersColumn}>
            <h2 className="text text_type_main-medium">В работе:</h2>
            <div className={styles.ordersList + " mt-6"}>
              {cookingOrderNumbers?.map((number) => (
                <p className="text text_type_digits-default mt-2 mr-4">
                  {number}
                </p>
              ))}
            </div>
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
