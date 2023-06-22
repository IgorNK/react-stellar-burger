import { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import { useSelector } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../appheader/appheader";
import BurgerIngredients from "../burgeringredients/burgeringredients";
import BurgerConstructor from "../burgerconstructor/burgerconstructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredientdetails/ingredientdetails";
import OrderDetails from "../orderdetails/orderdetails";
import ErrorPopup from "../errorpopup/errorpopup";

function App() {
  const { shownIngredient, order, error } = useSelector((store) => ({
    shownIngredient: store.ingredients.shownIngredient,
    order: store.order,
    error: store.error,
  }));

  const [modalState, setModalState] = useState({
    visible: false,
    content: null,
  });

  useEffect(() => {
    !order.orderFailed &&
      !order.orderRequest &&
      order.number &&
      handleOpenOrderDetails(order.number);
  }, [order]);

  useEffect(() => {
    error && handleOpenError(error);
  }, [error]);

  useEffect(() => {
    shownIngredient && handleOpenIngredientDetails(shownIngredient);
  }, [shownIngredient]);

  const handleOpenIngredientDetails = (ingredient) => {
    setModalState({
      visible: true,
      content: <IngredientDetails data={ingredient}></IngredientDetails>,
    });
  };

  const handleOpenOrderDetails = (number) => {
    setModalState({
      visible: true,
      content: <OrderDetails number={number}></OrderDetails>,
    });
  };

  const handleOpenError = (errorMsg) => {
    setModalState({
      visible: true,
      content: <ErrorPopup>{errorMsg}</ErrorPopup>,
    });
  };

  const handleCloseModal = useCallback(() => {
    setModalState({
      ...modalState,
      visible: false,
    });
  }, [modalState]);

  const modal = useMemo(() => {
    return <Modal onClose={handleCloseModal}>{modalState.content}</Modal>;
  }, [modalState.content, handleCloseModal]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main + " pl-5 pr-5"}>
        <section className={styles.twoColumns}>
          <div>
            <h1 className="text text_type_main-large mt-10 mb-5">
              Соберите бургер
            </h1>
            <BurgerIngredients />
          </div>
          <div>
            <BurgerConstructor />
          </div>
        </section>
      </main>
      {modalState.visible && modal}
    </div>
  );
}

export default App;
