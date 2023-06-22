import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { submitOrder } from "../../services/actions/order";

import styles from "./burgerconstructor.module.css";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { total, items } = useSelector((store) => store.cart);

  const bun = useMemo(() => {
    return items.find((item) => item.type === "bun");
  }, [items]);

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

  const handleSubmitOrder = useCallback(() => {
    dispatch(submitOrder(getIngredientIDs(items)));
  }, [dispatch, items]);

  const getIngredientIDs = (ingredients) => {
    return ingredients.map((item) => item._id);
  };

  return (
    <div className={styles.burgerconstructor + " mt-25 pl-4"}>
      <ul className={styles.list}>
        {bun && renderBun(bun, "top")}
        <li className={styles.ingredientsContainer + " custom-scroll pr-4"}>
          <ul className={styles.list}>
            {items.map((item, index) => {
              return renderIngredient(item, index);
            })}
          </ul>
        </li>
        {bun && renderBun(bun, "bottom")}
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
