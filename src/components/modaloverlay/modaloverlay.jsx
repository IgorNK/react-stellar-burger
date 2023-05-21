import { createPortal } from "react-dom";
import styles from "./modaloverlay.module.css";

const modalRoot = document.getElementById("react-modals");

const ModalOverlay = ({ children, onClose }) => {
  // const { children, header, onClose } = this.props;

  return createPortal(
    <div className={styles.overlay}>{children}</div>,
    modalRoot
  );
};

export default ModalOverlay;
