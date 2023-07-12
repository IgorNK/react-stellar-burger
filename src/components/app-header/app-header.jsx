import { Link } from "react-router-dom";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavButton from "../nav-button/nav-button";
import styles from "./app-header.module.css";

const AppHeader = (props) => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link to="/"><NavButton>Конструктор</NavButton></Link>
        <Link to="/profile/orders"><NavButton>Лента заказов</NavButton></Link>
      </nav>
      <Logo />
      <nav className={styles.profileButton}>
        <Link to="/profile"><NavButton>Личный кабинет</NavButton></Link>
      </nav>
    </header>
  );
};

export default AppHeader;
