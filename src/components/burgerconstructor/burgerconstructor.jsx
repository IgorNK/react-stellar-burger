import { useState, useEffect, useMemo } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerconstructor.module.css";

const BurgerConstructor = (props) => {
  const getTotal = (ingredients) => {
    console.log(ingredients);
    return ingredients.reduce((sum, item) => sum + item.price, 0);
  };

  const [order, setOrder] = useState({});

  useEffect(() => {
    console.log("data in props:");
    console.log(props.data);
    setOrder({
      total: getTotal(props.data),
      ingredients: [...props.data],
    });
  }, [props.data]);

  const bun = useMemo(() => {
    console.log("order is:");
    console.log(order);
    order.find((item) => item.type === "bun");
  }, [order]);

  const renderBun = (item, type) => {
    return (
      <li key={item._id + type} className="pl-8 pr-8">
        <ConstructorElement
          type={type}
          isLocked={true}
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
        />
      </li>
    );
  };

  const renderIngredient = (item) => {
    return item.type !== "bun" ? (
      <li key={item._id} className={styles.draggable + " pl-8"}>
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
        {renderBun(bun, "top")}
        <li className={styles.ingredientsContainer + " custom-scroll pr-4"}>
          <ul className={styles.list}>
            {order.ingredients.map((item) => {
              return renderIngredient(item);
            })}
          </ul>
        </li>
        {renderBun(bun, "bottom")}
      </ul>
      <div className={styles.checkoutContainer + " pr-8"}>
        <div className={styles.totalContainer}>
          <p className="text text_type_digits-medium">{order.total}</p>
          <CurrencyIcon className={styles.priceIcon} />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
