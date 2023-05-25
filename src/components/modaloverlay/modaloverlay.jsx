import { createPortal } from "react-dom";
import styles from "./modaloverlay.module.css";

const ModalOverlay = ({ handleClick }) => {
  const modalRoot = document.getElementById("react-modals");
  return createPortal(
    <div className={styles.overlay} onClick={handleClick}></div>,
    modalRoot
  );
};

export default ModalOverlay;
