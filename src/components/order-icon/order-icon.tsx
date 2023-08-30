import styles from "./order-icon.module.css";

const OrderIcon: React.FC<{
  image: string, 
  rest?: string | null, 
  extraStyle?: React.CSSProperties
}> = ({ image, rest, extraStyle }) => {
  return (
    <div className={styles.orderIcon} style={extraStyle}>
      <div className={styles.innerContainer}>
        <img
          alt="ingredient"
          src={image}
          className={styles.innerImage}
          style={{ opacity: `${rest ? "60%" : "100%"}` }}
        />
        <p className={styles.innerText + " text text_type_main-default"}>
          {rest}
        </p>
      </div>
    </div>
  );
};

export default OrderIcon;
