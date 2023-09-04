import { useRef } from "react";
import { useDispatch } from "../../services/hooks";
import { useDrag, useDrop } from "react-dnd";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_FROM_CART, MOVE_CART_ITEM } from "../../services/actions/cart";
import { TIngredient } from "../../services/types";

import styles from "./constructor-ingredient.module.css";

const ConstructorIngredient: React.FC<{
  item: TIngredient, 
  pos: string, 
  index: number, 
  cartID: string
}> = ({ item, pos, index, cartID }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const removeFromCart = ({ key }: { key: string }) => {
    dispatch({
      type: REMOVE_FROM_CART,
      key: key,
    });
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "constructor",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDrag }, drag] = useDrag({
    type: "constructor",
    item: { index: index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: MOVE_CART_ITEM,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };

  const opacity = isDrag ? 0 : 1;

  drag(drop(ref));

  const constructorIngredient = (
    <div
      key={cartID + pos}
      ref={item.type !== "bun" ? ref : null}
      className={`${styles.draggable} pl-8 ${
        item.type === "bun" ? "pr-8" : ""
      }`}
      style={{ opacity: opacity }}
      data-handler-id={handlerId}
    >
      {item.type !== "bun" && (
        <div className={styles.dragHandle}>
          <DragIcon type="primary" />
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
