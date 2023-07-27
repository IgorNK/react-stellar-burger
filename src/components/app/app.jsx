import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ForgotPasswordPage,
  ResetPasswordPage,
  FeedPage,
} from "../../pages";
import ProfileEditForm from "../profile-edit-form/profile-edit-form";
import OrdersList from "../orders-list/orders-list";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import OrderInfo from "../order-info/order-info";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { getIngredients } from "../../services/actions/ingredients";
import { getUser } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookies";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const { userOrders } = useSelector((store) => store.feed);

  useEffect(() => {
    !ingredients.length && dispatch(getIngredients());
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = getCookie("token");
    if ((refreshToken || accessToken) && !user) dispatch(getUser());
  }, [dispatch, user]);

  const location = useLocation();

  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <main className={styles.main + " pl-5 pr-5"}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement
                authRequired={false}
                element={<LoginPage />}
              />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElement
                authRequired={false}
                element={<RegisterPage />}
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement
                authRequired={false}
                element={<ForgotPasswordPage />}
              />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement
                authRequired={false}
                element={<ResetPasswordPage />}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                authRequired={true}
                element={<ProfilePage />}
              />
            }
          >
            <Route path="/profile" element={<ProfileEditForm />} />
            <Route
              path="orders"
              element={<OrdersList orders={userOrders} showStatus={true} />}
            />
          </Route>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/feed/:id" element={<OrderInfo />} />
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRouteElement
                authRequired={true}
                element={<OrderInfo />}
              />
            }
          />
        </Routes>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={<Modal children={<IngredientDetails />} />}
            />
            <Route
              path="/profile/order-accepted/:id"
              element={
                <ProtectedRouteElement
                  authRequired={true}
                  element={<Modal children={<OrderDetails />} />}
                />
              }
            />
            <Route
              path="/feed/:id"
              element={<Modal children={<OrderInfo />} />}
            />
            <Route
              path="/profile/orders/:id"
              element={
                <ProtectedRouteElement
                  authRequired={true}
                  element={<Modal children={<OrderInfo />} />}
                />
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
