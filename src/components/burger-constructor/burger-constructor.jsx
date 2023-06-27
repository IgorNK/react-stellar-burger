import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import { submitOrder } from "../../services/actions/order";

import { ADD_TO_CART, REMOVE_FROM_CART } from "../../services/actions/cart";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { total, cartItems, bun } = useSelector((store) => ({
    total: store.cart.total,
    cartItems: store.cart.cartItems,
    bun: store.cart.bun,
  }));

  const renderBun = ({ item, pos, key }) => {
    return (
      <ConstructorIngredient
        item={item}
        key={key + pos}
        cartID={key}
        pos={pos}
      />
    );
  };

  const renderIngredient = ({ item, index, key }) => {
    return (
      <li key={key}>
        <ConstructorIngredient item={item} index={index} cartID={key} />
      </li>
    );
  };

  const handleSubmitOrder = useCallback(() => {
    dispatch(submitOrder(cartItems.map((cartItem) => cartItem.item._id)));
  }, [dispatch, cartItems]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      addToCart(item);
    },
  });

  const addToCart = (cartItem) => {
    if (bun && cartItem.item.type === "bun") {
      dispatch({
        type: REMOVE_FROM_CART,
        key: bun.key,
      });
      dispatch({
        type: ADD_TO_CART,
        ...cartItem,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        ...cartItem,
      });
    }
  };

  return (
    <div
      ref={dropTarget}
      className={`${styles.burgerConstructor} mt-25 pl-4 ${
        isHover ? styles.onHover : ""
      }`}
    >
      <ul className={styles.list}>
        {bun && renderBun({ item: bun.item, pos: "top", key: bun.key })}
        <div className={styles.ingredientsContainer + " custom-scroll pr-4"}>
          <ul className={styles.list}>
            {cartItems &&
              cartItems.map((cartItem, index) => {
                if (cartItem.item.type !== "bun") {
                  return renderIngredient({
                    item: cartItem.item,
                    key: cartItem.key,
                    index: index,
                  });
                } else return null;
              })}
          </ul>
        </div>
        {bun && renderBun({ item: bun.item, pos: "bottom", key: bun.key })}
      </ul>
      <div className={styles.checkoutContainer + " pr-8"}>
        <div className={styles.totalContainer}>
          <p className="text text_type_digits-medium">{total}</p>
          <CurrencyIcon className={styles.priceIcon} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            handleSubmitOrder();
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
