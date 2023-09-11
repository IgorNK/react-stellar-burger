import { useState, useCallback } from "react";
import { useDispatch, useForm } from "../services/hooks";
import { ILoginForm } from "../services/types/data";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { logIn } from "../services/actions/auth";
import { Link } from "react-router-dom";
import styles from "./form.module.css";

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });
  // const [form, setFormValue] = useState({ email: "", password: "" });

  // const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setFormValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  // };

  const onFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(logIn(values));
    },
    [dispatch, values]
  );

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>

      <label htmlFor="email"></label>
      <Input
        type="email"
        placeholder="E-mail"
        value={(values as ILoginForm).email}
        size="default"
        extraClass="mb-6"
        onChange={handleChange}
        name="email"
        id="email"
      />

      <label htmlFor="password"></label>
      <PasswordInput
        placeholder="Пароль"
        value={(values as ILoginForm).password}
        size="default"
        extraClass="mb-6"
        onChange={handleChange}
        name="password"
        id="password"
      />

      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Войти
      </Button>

      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы - новый пользователь?{" "}
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
};
