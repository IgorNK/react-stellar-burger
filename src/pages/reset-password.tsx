import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "../services/hooks";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { resetPassword } from "../services/actions/auth";
import styles from "./form.module.css";

export const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    forgotPasswordSuccess,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailed,
  } = useSelector((store) => store.auth);
  const [form, setFormValue] = useState({ password: "", token: "" });

  const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(resetPassword(form));
    },
    [dispatch, form]
  );

  if (!forgotPasswordSuccess) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (resetPasswordRequest) {
    return <h1>Подождите...</h1>;
  }

  if (resetPasswordSuccess) {
    return <Navigate to="/login" replace />;
  }

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
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

      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Сохранить
      </Button>

      {resetPasswordFailed && <p>Неправильный код подтверждения</p>}

      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </form>
  );
};
