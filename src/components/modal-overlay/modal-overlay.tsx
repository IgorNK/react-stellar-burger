import { createPortal } from "react-dom";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ handleClick }: { handleClick: React.MouseEventHandler<HTMLElement> }): React.ReactPortal | null => {
  const modalRoot = document.getElementById("react-modals");
  if (modalRoot) {
    return createPortal(
    <div className={styles.overlay} onClick={handleClick}></div>,
    modalRoot
  )} else return null;
};

export default ModalOverlay;
