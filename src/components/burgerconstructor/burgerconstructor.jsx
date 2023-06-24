import { useMemo, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "../constructoringredient/constructoringredient";
import ConstructorDropArea from "../constructordroparea/constructordroparea";
import { submitOrder } from "../../services/actions/order";

import { ADD_TO_CART, REMOVE_FROM_CART } from "../../services/actions/cart";

import styles from "./burgerconstructor.module.css";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { total, cartItems, isDragging } = useSelector((store) => store.cart);

  const bun = useMemo(() => {
    if (cartItems)
      return cartItems.find((cartItem) => cartItem.item.type === "bun");
  }, [cartItems]);

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
    // console.log(`item: ${item.name}, index: ${index}`);
    return item.type !== "bun" ? (
      <li key={key}>
        <ConstructorIngredient item={item} cartID={key} />
        {isDragging && <ConstructorDropArea index={index + 1} />}
      </li>
    ) : null;
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
      console.log("bun exists!");
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
      className={`${styles.burgerconstructor} mt-25 pl-4 ${
        isHover ? styles.onHover : ""
      }`}
    >
      <ul className={styles.list}>
        {bun && renderBun({ item: bun.item, pos: "top", key: bun.key })}
        <div className={styles.ingredientsContainer + " custom-scroll pr-4"}>
          <ul className={styles.list}>
            {isDragging && <ConstructorDropArea index={0} />}
            {cartItems &&
              cartItems.map((cartItem, index) => {
                return renderIngredient({
                  item: cartItem.item,
                  key: cartItem.key,
                  index: index,
                });
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
