import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { logOut } from "../services/actions/auth";
import styles from "./profile.module.css";
import { WS_CONNECTION_START } from "../services/actions/socket";
import { wsMyOrdersUrl } from "../utils/data";
import { getCookie } from "../utils/cookies";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("profile");
  const user = useSelector((store) => store.auth.user);
  const { wsConnected } = useSelector((store) => store.feed);

  useEffect(() => {
    if (user && location.pathname.includes("orders")) {
      if (!wsConnected) {
        dispatch({
          type: WS_CONNECTION_START,
          payload: {
            wsUrl: `${wsMyOrdersUrl}?token=${getCookie("token").slice(7)}`,
            storage: "user",
          },
        });
      } else {
      }
    }
  }, [wsConnected, user, location]);

  useEffect(() => {
    switch (true) {
      case location.pathname.includes("orders"): {
        setActiveLink("orders");
        break;
      }
      case location.pathname.includes("profile"): {
        setActiveLink("profile");
        break;
      }
      default: {
        setActiveLink("");
      }
    }
  }, [location]);

  const onLogoutClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logOut());
    },
    [dispatch]
  );

  return (
    <div className={styles.profile}>
      <div className={styles.dashboard}>
        <nav className={styles.navigation}>
          <Link to="/profile" className={styles.link}>
            <p
              className={
                activeLink !== "profile"
                  ? "text text_type_main-medium text_color_inactive"
                  : "text text_type_main-medium"
              }
            >
              Профиль
            </p>
          </Link>
          <Link to="/profile/orders" className={styles.link}>
            <p
              className={
                activeLink !== "orders"
                  ? "text text_type_main-medium text_color_inactive"
                  : "text text_type_main-medium"
              }
            >
              История заказов
            </p>
          </Link>
          <Link onClick={onLogoutClick} className={styles.link}>
            <p className={"text text_type_main-medium text_color_inactive"}>
              Выход
            </p>
          </Link>
        </nav>
        <p className="text text_type_main-default text_color_inactive">
          {activeLink === "profile"
            ? "В этом разделе вы можете изменить свои персональные данные"
            : "В этом разделе вы можете просмотреть свою историю заказов"}
        </p>
      </div>

      <Outlet />
    </div>
  );
};
