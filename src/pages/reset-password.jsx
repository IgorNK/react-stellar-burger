import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/actions/auth";
import styles from "./form.module.css";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const [form, setFormValue] = useState({ password: "", token: "" });

  const onFormChange = (e) => {
    e.preventDefault();
    setFormValue({ ...form, [e.target.name]: e.target.value });
  };

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPassword(form));
    },
    [dispatch, form]
  );

  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>

      <label htmlFor="password"></label>
      <PasswordInput
        placeholder="Введите новый пароль"
        value={form.password}
        size="default"
        extraClass="mb-6"
        onChange={onFormChange}
        name="password"
        id="password"
      />

      <label htmlFor="token"></label>
      <Input
        type="text"
        placeholder="Введите код из письма"
        value={form.token}
        size="default"
        extraClass="mb-6"
        onChange={onFormChange}
        name="token"
        id="token"
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mb-20"
        onClick={onFormSubmit}
      >
        Сохранить
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
