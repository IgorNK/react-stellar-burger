import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modaloverlay.module.css";

const ModalOverlay = ({ children, handleClick }) => {
  const modalRoot = document.getElementById("react-modals");
  return createPortal(
    <div className={styles.overlay} onClick={handleClick}>
      {children}
    </div>,
    modalRoot
  );
};

export default ModalOverlay;
