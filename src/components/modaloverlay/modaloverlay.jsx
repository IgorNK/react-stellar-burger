import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import styles from "./modaloverlay.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const ModalOverlay = ({ children, onClose }) => {
  const [closeIconState, setCloseIconState] = useState("primary");

  const handleCloseButtonHover = () => {
    setCloseIconState("secondary");
  };

  const handleCloseButtonLeave = () => {
    setCloseIconState("primary");
  };

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          onMouseOver={handleCloseButtonHover}
          onMouseLeave={handleCloseButtonLeave}
        >
          <CloseIcon type={closeIconState} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default ModalOverlay;
