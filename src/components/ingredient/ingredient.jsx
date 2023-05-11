import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";

const Ingredient = (props) => {
  return (
    <div className={styles.ingredient}>
      <img src={props.image} alt="ingredient" />
      <div className={styles.priceContainer}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{props.name}</p>
    </div>
  );
};

export default Ingredient;
