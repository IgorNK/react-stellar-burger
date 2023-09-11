import { useRef } from "react";
import { useDispatch } from "../../services/hooks";
import { useDrag, useDrop } from "react-dnd";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_FROM_CART, MOVE_CART_ITEM } from "../../services/actions/cart";
import { removeFromCartAction, moveCartItemAction } from "../../services/actions/cart";
import { TIngredient } from "../../services/types/data";

import styles from "./constructor-ingredient.module.css";

interface IDragItem {
  index: number,
}

const ConstructorIngredient: React.FC<{
  item: TIngredient, 
  pos?: "top" | "bottom", 
  index?: number, 
  cartID: string
}> = ({ item, pos, index, cartID }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const removeFromCart = ({ key }: { key: string }) => {
    dispatch(removeFromCartAction(key));
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "constructor",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: IDragItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverIndex = index;
      if (!hoverIndex) {
        return;
      }
      const dragIndex = item.index;      
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
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
    dispatch(moveCartItemAction(dragIndex, hoverIndex));
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
        text={formatName(item.name, pos)}
        isLocked={item.type === "bun" ? true : false}
        type={pos}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => removeFromCart({ key: cartID })}
      />
    </div>
  );

  return constructorIngredient;
};

const formatName = (name: string, pos: string | undefined): string => {
  let outName = name;
  if (!pos) return outName;
  if (pos === "top") {
    outName.concat(" (верх)");
  }
  if (pos === "низ") {
    outName.concat(" (низ)");
  }
  return outName;
}

export default ConstructorIngredient;
