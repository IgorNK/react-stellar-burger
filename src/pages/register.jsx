import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./register.module.css";

export const RegisterPage = () => {

  const onFormChange = (e) => {
    e.preventDefault();
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
    <form className={styles.registerForm}>
      <h1 className="text text_type_main-medium mb-2">Регистрация</h1>

      <label htmlFor="name"></label>
      <Input type="text" placeholder="Имя" value={""} size="default" extraClass="mb-2" onChange={onFormChange} name="name" id="name" />
      
      <label htmlFor="email"></label>
      <Input type="email" placeholder="E-mail" value={""} size="default" extraClass="mb-2" onChange={onFormChange} name="email" id="email" />
      
      <label htmlFor="password"></label>
      <PasswordInput placeholder="Пароль" value={""} size="default" extraClass="mb-2" onChange={onFormChange} name="password" id="password" />
  
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-8" onClick={onFormSubmit}>Зарегистрироваться</Button>
  
      <p className="text text_type_main-default text_color_inactive mb-2">
      Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </form>
  )
}