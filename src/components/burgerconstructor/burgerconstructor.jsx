import { useMemo, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { submitOrder } from "../../services/actions/order";

import { ADD_TO_CART, REMOVE_FROM_CART } from "../../services/actions/cart";

import styles from "./burgerconstructor.module.css";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.ingredients);
  const { total, cartItems } = useSelector((store) => store.cart);

  const bun = useMemo(() => {
    if (cartItems)
      return cartItems.find((cartItem) => cartItem.item.type === "bun");
  }, [cartItems]);

  const renderBun = (item, pos, key) => {
    return (
      <li key={key + pos} className="pl-8 pr-8">
        <ConstructorElement
          type={pos}
          isLocked={true}
          text={item.name + (pos === "top" ? " (верх)" : " (низ)")}
          price={item.price}
          thumbnail={item.image_mobile}
        />
      </li>
    );
  };

  const renderIngredient = (item, key) => {
    // console.log(`item: ${item.name}, index: ${index}`);
    return item.type !== "bun" ? (
      <li key={key} className={styles.draggable + " pl-8"}>
        <div className={styles.dragHandle}>
          <DragIcon />
        </div>
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
          handleClose={() => removeFromCart({ key: key })}
        />
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
      removeFromCart({ key: bun.key });
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

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      ...item,
    });
  };

  return (
    <div
      ref={dropTarget}
      className={`${styles.burgerconstructor} mt-25 pl-4 ${
        isHover ? styles.onHover : ""
      }`}
    >
      <ul className={styles.list}>
        {bun && renderBun(bun.item, "top", bun.key)}
        <li className={styles.ingredientsContainer + " custom-scroll pr-4"}>
          <ul className={styles.list}>
            {cartItems &&
              cartItems.map((cartItem) => {
                return renderIngredient(cartItem.item, cartItem.key);
              })}
          </ul>
        </li>
        {bun && renderBun(bun.item, "bottom", bun.key)}
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
