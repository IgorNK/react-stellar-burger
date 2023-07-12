import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { forgotPassword } from "../services/actions/auth";
import styles from "./form.module.css";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [form, setFormValue] = useState({ email: "" });
  const { forgotPasswordRequest, forgotPasswordSuccess } = useSelector(
    (store) => store.auth
  );

  const onFormChange = (e) => {
    e.preventDefault();
    setFormValue({ ...form, [e.target.name]: e.target.value });
  };

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(forgotPassword(form));
    },
    [dispatch, form]
  );

  if (forgotPasswordSuccess) {
    return <Navigate to="/reset-password" />;
  }

  if (forgotPasswordRequest) {
    return <h1>Подождите...</h1>;
  }

  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>

      <label htmlFor="email"></label>
      <Input
        type="email"
        placeholder="Укажите e-mail"
        value={form.email}
        size="default"
        extraClass="mb-6"
        onChange={onFormChange}
        name="email"
        id="email"
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mb-20"
        onClick={onFormSubmit}
      >
        Восстановить
      </Button>

      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </form>
  );
};
