import { useState, useCallback } from "react";
import { useDispatch } from "../../services/hooks";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { register } from "../services/actions/auth";
import styles from "./form.module.css";

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setFormValue] = useState({ email: "", password: "", name: "" });

  const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(register(form));
    },
    [dispatch, form]
  );

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>

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
        placeholder="E-mail"
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

      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Зарегистрироваться
      </Button>

      <p className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </form>
  );
};
