import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_FROM_CART, SET_DRAGGING } from "../../services/actions/cart";

import styles from "./constructoringredient.module.css";

const ConstructorIngredient = (props) => {
  const { item, pos, cartID } = props;
  const dispatch = useDispatch();

  const removeFromCart = ({ key }) => {
    dispatch({
      type: REMOVE_FROM_CART,
      key: key,
    });
  };

  const [{ isDrag }, ref] = useDrag({
    type: "constructor",
    item: { draggedID: cartID },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    dispatch({
      type: SET_DRAGGING,
      value: isDrag,
    });
  }, [isDrag, dispatch]);

  const constructorIngredient = (
    <div
      key={cartID + pos}
      ref={ref}
      className={`${styles.draggable} pl-8 ${
        item.type === "bun" ? "pr-8" : ""
      }`}
    >
      {item.type !== "bun" && (
        <div className={styles.dragHandle}>
          <DragIcon />
        </div>
      )}
      <ConstructorElement
        text={item.name}
        isLocked={item.type === "bun" ? true : false}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => removeFromCart({ key: cartID })}
      />
    </div>
  );

  return constructorIngredient;
};

export default ConstructorIngredient;
