import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal: React.FC<{
  children: React.ReactElement | React.ReactElement[];
  onClose: () => void;
}> = ({ children, onClose }) => {
  const navigate = useNavigate();

  enum TIconTypes {
    primary,
    secondary,
  }

  const [closeIconState, setCloseIconState] = useState<TIconTypes>(
    TIconTypes.primary
  );

  const handleCloseButtonHover = () => {
    setCloseIconState(TIconTypes.secondary);
  };

  const handleCloseButtonLeave = () => {
    setCloseIconState(TIconTypes.primary);
  };

  const handleEscapeButton = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

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
          {closeIconState === TIconTypes.primary ? (
            <CloseIcon type="primary" />
          ) : (
            <CloseIcon type="secondary" />
          )}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
