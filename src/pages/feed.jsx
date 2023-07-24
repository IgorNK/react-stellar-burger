import styles from "./feed.module.css";
import { testFeedOrders } from "../utils/data";
import OrderEntry from "../components/order-entry/order-entry";

export const FeedPage = () => {
  const { orders, total, totalToday } = testFeedOrders;

  const readyOrderNumbers = orders.filter(order => order.status === "done").map(order => order.number);
  const cookingOrderNumbers = orders.filter(order => order.status !== "done").map(order => order.number);
  
  return (
    <section className={styles.twoColumns}>
      <div className={styles.feed}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Лента заказов
        </h1>
        <div className={styles.orders}>
          { orders.map(order => <OrderEntry key={order._id} order={order} />) }
        </div>
      </div>
      <div className={styles.ordersInfo}>
        <div className={styles.ordersTable}>
          <div className={styles.ordersColumn}>
            <h2 className="text text_type_main-small">Готовы:</h2>
            <div className={styles.ordersList}>
              {readyOrderNumbers.map(number => <p className="text text_type_digits-default">{number}</p>)}
            </div>
          </div>
          <div className={styles.ordersColumn}>
            <h2 className="text text_type_main-small">В работе:</h2>          
            <div className={styles.ordersList}>
              {cookingOrderNumbers.map(number => <p className="text text_type_digits-default">{number}</p>)}
            </div>
          </div>
        </div>
        <div className={styles.ordersCompleted}>
          <h2 className="text text_type_main-small">Выполнено за все время:</h2>
          <p className="text text_type_digits-large">{total}</p>
        </div>
        <div className={styles.ordersCompleted}>
          <h2 className="text text_type_main-small">Выполнено сегодня:</h2>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </section>
  );
}