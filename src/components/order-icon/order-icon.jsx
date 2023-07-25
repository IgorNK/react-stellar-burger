import styles from "./order-icon.module.css";

const OrderIcon = ({ image, rest, extraStyle }) => {
  return (
    <div className={styles.orderIcon} style={extraStyle}>
      <img src={image} className={styles.innerImage} style={{opacity: `${rest ? "60%" : "100%"}`}} />
      <p className={styles.innerText + " text text_type_main-small"}>{rest}</p>
    </div>
  );
};

export default OrderIcon;
