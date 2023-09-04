import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { useDrop } from "react-dnd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import { submitOrder } from "../../services/actions/order";
import { TIngredient } from "../ingredient/ingredient";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../../services/actions/cart";

import styles from "./burger-constructor.module.css";

const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { total, cartItems, bun } = useSelector((store) => ({
    total: store.cart.total,
    cartItems: store.cart.cartItems,
    bun: store.cart.bun,
  }));
  const { orderRequest, orderSuccess, number } = useSelector((store) => ({
    orderRequest: store.order.orderRequest,
    orderSuccess: store.order.orderSuccess,
    number: store.order.number,
  }));
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (orderSuccess) {
      dispatch({
        type: CLEAR_CART,
      });
      navigate(`/profile/order-accepted/${number}`, {
        state: { background: location },
      });
    }
  }, [orderSuccess]);

  const renderBun = ({ item, pos, key}: { item: TIngredient, pos: string, key: number }) => {
    return (
      <ConstructorIngredient
        item={item}
        key={key + pos}
        cartID={key}
        pos={pos}
      />
    );
  };

  const renderIngredient = ({ item, index, key }: { item: TIngredient, index: number, key: number }) => {
    return (
      <li key={key}>
        <ConstructorIngredient item={item} index={index} cartID={key} />
      </li>
    );
  };

  const handleSubmitOrder = useCallback(() => {
    user
      ? dispatch(
          submitOrder(
            cartItems
              .concat(bun)
              .concat(bun)
              .map((cartItem) => cartItem.item._id)
          )
        )
      : navigate("/login");
  }, [dispatch, cartItems, user, navigate, bun]);

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
          disabled={cartItems.length && !orderRequest ? false : true}
          onClick={() => {
            handleSubmitOrder();
          }}
        >
          {orderRequest ? "Подождите..." : "Оформить заказ"}
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
