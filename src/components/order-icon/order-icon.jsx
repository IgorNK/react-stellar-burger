import styles from "./order-icon.module.css";

const OrderIcon = ({image, content}) => {
  
  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    opacity: content ? "100%" : "60%",
    backgroundSize: "contain",
  };
  
  return (
    <div className={[ styles.orderIcon, backgroundStyle ]}>
      <p className="text text_type_main-small">content</p>
    </div>
  )
}

export default OrderIcon;