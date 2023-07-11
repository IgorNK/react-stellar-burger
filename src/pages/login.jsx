import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

export const LoginPage = () => {

  const onFormChange = (e) => {
    e.preventDefault();
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
    <form className={styles.loginForm}>
      <h1 className="text text_type_main-medium mb-2">Вход</h1>
      
      <label htmlFor="email"></label>
      <Input type="email" placeholder="E-mail" value={""} size="default" extraClass="mb-2" onChange={onFormChange} name="email" id="email" />
      
      <label htmlFor="password"></label>
      <PasswordInput placeholder="Пароль" value={""} size="default" extraClass="mb-2" onChange={onFormChange} name="password" id="password" />
  
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-8" onClick={onFormSubmit}>Войти</Button>
  
      <p className="text text_type_main-default text_color_inactive mb-2">
      Вы -  новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
      Забыли пароль? <Link to='restore-password' className={styles.link}>Восстановить пароль</Link>
      </p>
    </form>
  )
}