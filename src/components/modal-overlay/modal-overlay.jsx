import { createPortal } from "react-dom";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ handleClick }) => {
  const modalRoot = document.getElementById("react-modals");
  return createPortal(
    <div className={styles.overlay} onClick={handleClick}></div>,
    modalRoot
  );
};

ModalOverlay.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
