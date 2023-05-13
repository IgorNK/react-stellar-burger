import { useState } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import styles from "./burgerconstructor.module.css";

const BurgerConstructor = (props) => {
  const getTotal = (ingredients) => {
    return ingredients.reduce((sum, item) => sum + item.price, 0);
  };

  const [order, setOrder] = useState({
    total: getTotal(data),
    ingredients: [...data],
  });

  const getBun = (data) => {
    const bun = data.find((item) => item.type === "bun");
    return bun;
  };

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
        {renderBun(getBun(order.ingredients), "top")}
        <li className={styles.ingredientsContainer + " custom-scroll pr-4"}>
          <ul className={styles.list}>
            {order.ingredients.map((item) => {
              return renderIngredient(item);
            })}
          </ul>
        </li>
        {renderBun(getBun(order.ingredients), "bottom")}
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
