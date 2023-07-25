import { useMemo } from "react";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types.js";
import styles from "./ingredient.module.css";

const Ingredient = (props) => {
  const { item } = props;
  const { cartItems, bun } = useSelector((store) => store.cart);

  const count = useMemo(() => {
    const newCount = [...cartItems, bun].reduce(
      (acc, cartItem) => (cartItem?.item?._id === item._id ? acc + 1 : acc),
      0
    );
    return newCount;
  }, [cartItems, item, bun]);

  const [, ref] = useDrag({
    type: "ingredient",
    item: { item: item },
  });

  const listIngredient = (
    <div ref={ref} className={styles.ingredient}>
      <img src={item.image} alt="ingredient" />
      <div className={styles.priceContainer}>
        <p className="text text_type_digits-default pr-2">{item.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
    </div>
  );

  return listIngredient;
};

Ingredient.propTypes = {
  item: ingredientPropType,
};

export default Ingredient;
