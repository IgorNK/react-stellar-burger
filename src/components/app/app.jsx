import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { MainPage, LoginPage, RegisterPage, ProfilePage, IngredientsPage, ForgotPasswordPage, ResetPasswordPage } from "../../pages";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import ErrorPopup from "../error-popup/error-popup";
import ProtectedRouteElement from "../protected-route/protected-route";
import { SHOW_INGREDIENT } from "../../services/actions/ingredients";
import { DISPLAY_ERROR_MESSAGE } from "../../services/actions";

function App() {
  const dispatch = useDispatch();

  const shownIngredient = useSelector(
    (store) => store.ingredients.shownIngredient
  );
  const order = useSelector((store) => store.order);
  const error = useSelector((store) => store.error);

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
    shownIngredient &&
      dispatch({
        type: SHOW_INGREDIENT,
        item: null,
      });
    error &&
      dispatch({
        type: DISPLAY_ERROR_MESSAGE,
        message: null,
      });
  }, [modalState, dispatch]);
/*
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
      {modalState.visible && (
        <Modal onClose={handleCloseModal}>{modalState.content}</Modal>
      )}
    </div>
  );
  */
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main + " pl-5 pr-5"}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<ProtectedRouteElement authRequired={false} element={<LoginPage />} />} />
        <Route path="/register" element={<ProtectedRouteElement authRequired={false} element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement authRequired={false} element={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement authRequired={false} element={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<ProtectedRouteElement authRequired={true} element={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement authRequired={true} element={<ProfilePage />} />} />
        <Route path="/profile/orders/:id" element={<ProtectedRouteElement authRequired={true} element={<ProfilePage />} />} />
        <Route path="/ingredients/:id" element={<IngredientsPage />} />
      </Routes>
      </BrowserRouter>
      </main>
      {modalState.visible && (
        <Modal onClose={handleCloseModal}>{modalState.content}</Modal>
      )}
    </div>
  )
}

export default App;
