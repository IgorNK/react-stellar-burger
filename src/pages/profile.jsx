import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser, logOut } from "../services/actions/auth";
import styles from "./profile.module.css";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const [form, setFormValue] = useState({ name: "", email: "", password: "" });
  const [nameEditActive, setNameEditActive] = useState(false);
  const [emailEditActive, setEmailEditActive] = useState(false);
  const [passwordEditActive, setPasswordEditActive] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("profile");

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

  useEffect(() => {
    setFormValue({
      name: user.name,
      email: user.email,
      password: "******",
    });
  }, [user]);

  const onFormChange = (e) => {
    e.preventDefault();
    setFormValue({ ...form, [e.target.name]: e.target.value });
  };

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUser(form));
    },
    [dispatch, form]
  );

  const onLogoutClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logOut());
    },
    [dispatch]
  );

  return (
    <>
      <div className={styles.profile}>
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

        <form onSubmit={onFormSubmit}>
          <label htmlFor="name"></label>
          <Input
            type="text"
            placeholder="Имя"
            value={form.name}
            size="default"
            extraClass="mb-6"
            onChange={onFormChange}
            disabled={!nameEditActive}
            icon="EditIcon"
            onIconClick={() => setNameEditActive(true)}
            name="name"
            id="name"
          />

          <label htmlFor="email"></label>
          <Input
            type="email"
            placeholder="Логин"
            value={form.email}
            size="default"
            extraClass="mb-6"
            onChange={onFormChange}
            disabled={!emailEditActive}
            icon="EditIcon"
            onIconClick={() => setEmailEditActive(true)}
            name="email"
            id="email"
          />

          <label htmlFor="password"></label>
          <Input
            placeholder="Пароль"
            value={form.password}
            size="default"
            extraClass="mb-6"
            onChange={onFormChange}
            disabled={!passwordEditActive}
            icon="EditIcon"
            onIconClick={() => {
              setPasswordEditActive(true);
              setFormValue({ ...form, password: "" });
            }}
            name="password"
            id="password"
          />

          <input type="submit" style={{ display: "none" }} />
        </form>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить&nbsp;свои персональные данные
        </p>
      </div>
    </>
  );
};
