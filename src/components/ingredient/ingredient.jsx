import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types.js";
import styles from "./ingredient.module.css";

const Ingredient = ({ clickHandler, ...props }) => {
  const [count, setCount] = useState(0);

  // const handleClick = () => {
  //   setCount(count + 1);
  // };

  return (
    <div className={styles.ingredient} onClick={clickHandler}>
      <img src={props.image} alt="ingredient" />
      <div className={styles.priceContainer}>
        <p className="text text_type_digits-default pr-2">{props.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{props.name}</p>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
    </div>
  );
};

Ingredient.propTypes = ingredientPropType;

export default Ingredient;
