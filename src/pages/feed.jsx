import styles from "./feed.module.css";
import { testFeedOrders } from "../utils/data";
import { formatNumber } from "../utils/data";
import OrdersList from "../components/orders-list/orders-list";

export const FeedPage = () => {
  const { orders, total, totalToday } = testFeedOrders;

  const readyOrderNumbers = orders
    .filter((order) => order.status === "done")
    .map((order) => order.number);
  const cookingOrderNumbers = orders
    .filter((order) => order.status !== "done")
    .map((order) => order.number);

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
              {readyOrderNumbers.map((number) => (
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
              {cookingOrderNumbers.map((number) => (
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
