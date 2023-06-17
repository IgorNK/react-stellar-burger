import { useState, useEffect, useMemo, useContext } from "react";
import { PropTypes } from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { CartContext } from "../../services/cartContext";
import styles from "./burgerconstructor.module.css";

const BurgerConstructor = ({ modalHandler }) => {
  const { cartState } = useContext(CartContext);

  const bun = useMemo(() => {
    if (cartState)
      return cartState.ingredients.find((item) => item.type === "bun");
  }, [cartState]);

  const renderBun = (item, type) => {
    return (
      <li key={item._id + type} className="pl-8 pr-8">
        <ConstructorElement
          type={type}
          isLocked={true}
          text={item.name + (type === "top" ? " (верх)" : " (низ)")}
          price={item.price}
          thumbnail={item.image_mobile}
        />
      </li>
    );
  };

  const renderIngredient = (item, index) => {
    // console.log(`item: ${item.name}, index: ${index}`);
    return item.type !== "bun" ? (
      <li key={index} className={styles.draggable + " pl-8"}>
        <div className={styles.dragHandle}>
          <DragIcon />
        </div>
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
        />
      </li>
    ) : null;
  };

  return (
    <div className={styles.burgerconstructor + " mt-25 pl-4"}>
      <ul className={styles.list}>
        {bun && renderBun(bun, "top")}
        <li className={styles.ingredientsContainer + " custom-scroll pr-4"}>
          <ul className={styles.list}>
            {cartState &&
              cartState.ingredients.map((item, index) => {
                return renderIngredient(item, index);
              })}
          </ul>
        </li>
        {bun && renderBun(bun, "bottom")}
      </ul>
      <div className={styles.checkoutContainer + " pr-8"}>
        <div className={styles.totalContainer}>
          <p className="text text_type_digits-medium">
            {cartState && cartState.total}
          </p>
          <CurrencyIcon className={styles.priceIcon} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            modalHandler(cartState);
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
  modalHandler: PropTypes.func,
};

export default BurgerConstructor;
