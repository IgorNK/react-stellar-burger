import { useState, useEffect, useMemo } from "react";
import { PropTypes } from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerconstructor.module.css";

const BurgerConstructor = ({ data, modalHandler }) => {
  const getTotal = (ingredients) => {
    return ingredients.reduce((sum, item) => sum + item.price, 0);
  };

  const [order, setOrder] = useState();

  useEffect(() => {
    data &&
      setOrder({
        orderId: "034536",
        total: getTotal(data),
        ingredients: [...data],
      });
  }, [data]);

  const bun = useMemo(() => {
    if (order) return order.ingredients.find((item) => item.type === "bun");
  }, [order]);

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
        {bun && renderBun(bun, "top")}
        <li className={styles.ingredientsContainer + " custom-scroll pr-4"}>
          <ul className={styles.list}>
            {order &&
              order.ingredients.map((item) => {
                return renderIngredient(item);
              })}
          </ul>
        </li>
        {bun && renderBun(bun, "bottom")}
      </ul>
      <div className={styles.checkoutContainer + " pr-8"}>
        <div className={styles.totalContainer}>
          <p className="text text_type_digits-medium">{order && order.total}</p>
          <CurrencyIcon className={styles.priceIcon} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            modalHandler(order);
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
