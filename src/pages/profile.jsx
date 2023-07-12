import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser, logOut } from "../services/actions/auth";
import styles from "./profile.module.css";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const [form, setFormValue] = useState({ name: "", email: "", password: "" });
  const { accessToken, refreshToken } = useSelector((store) => store.auth);

  const onFormChange = (e) => {
    e.preventDefault();
    setFormValue({ ...form, [e.target.name]: e.target.value });
  };

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUser(form, accessToken));
    },
    [dispatch, form, accessToken]
  );

  const onLogoutClick = useCallback(
    (e) => {
      console.log("clicked on log out. Refreshtoken: ");
      console.log(refreshToken);
      e.preventDefault();
      dispatch(logOut({ token: refreshToken }));
    },
    [dispatch, refreshToken]
  );

  return (
    <>
      <div className={styles.profile}>
        <nav className={styles.navigation}>
          <a className="text text_type_main-medium mb-8">Профиль</a>
          <a className="text text_type_main-medium mb-8">История заказов</a>
          <a onClick={onLogoutClick} className="text text_type_main-medium">
            Выход
          </a>
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
            name="email"
            id="email"
          />

          <label htmlFor="password"></label>
          <PasswordInput
            placeholder="Пароль"
            value={form.password}
            size="default"
            extraClass="mb-6"
            onChange={onFormChange}
            name="password"
            id="password"
          />
        </form>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете
      </p>
      <p className="text text_type_main-default text_color_inactive">
        изменить свои персональные данные
      </p>
    </>
  );
};
