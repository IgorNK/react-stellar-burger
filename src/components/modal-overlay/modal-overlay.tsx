import { createPortal } from "react-dom";
import styles from "./modal-overlay.module.css";

const ModalOverlay: React.FC<{handleClick: React.MouseEventHandler<HTMLElement>}> = ({ handleClick }) => {
  const modalRoot = document.getElementById("react-modals");
  if (modalRoot) return createPortal(
    <div className={styles.overlay} onClick={handleClick}></div>,
    modalRoot
  );
};

export default ModalOverlay;
