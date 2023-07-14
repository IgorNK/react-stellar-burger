import { useState, useEffect, useCallback } from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({ children }) => {
  const navigate = useNavigate();
  
  const [closeIconState, setCloseIconState] = useState("primary");

  const handleCloseButtonHover = () => {
    setCloseIconState("secondary");
  };

  const handleCloseButtonLeave = () => {
    setCloseIconState("primary");
  };

  const handleEscapeButton = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const onClose = () => {
    navigate(-1);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeButton);
    return () => {
      document.removeEventListener("keydown", handleEscapeButton);
    };
  }, [handleEscapeButton]);

  return (
    <div className={styles.modal}>
      <ModalOverlay handleClick={onClose} />
      <div onClick={(e) => e.stopPropagation()} className={styles.container}>
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
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Modal;
