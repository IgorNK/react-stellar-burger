import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import styles from "./constructordroparea.module.css";
import { SET_CART_POSITION } from "../../services/actions/cart";

const ConstructorDropArea = (props) => {
  const { index } = props;
  const dispatch = useDispatch();
  const { isDragging } = useSelector((store) => store.cart);

  const [{ isHover }, dropRef] = useDrop({
    accept: "constructor",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: SET_CART_POSITION,
        ...item,
        index: index,
      });
    },
  });

  return (
    <div
      ref={dropRef}
      className={`${styles.dropArea} ${
        isDragging ? styles.visible : styles.hidden
      } ${isHover && styles.highlight}`}
    ></div>
  );
};

export default ConstructorDropArea;
