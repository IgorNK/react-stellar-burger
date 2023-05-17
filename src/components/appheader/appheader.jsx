import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavButton from "../navbutton/navbutton";
import styles from "./appheader.module.css";

const AppHeader = (props) => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <NavButton>Конструктор</NavButton>
        <NavButton>Лента заказов</NavButton>
      </nav>
      <Logo />
      <nav className={styles.profileButton}>
        <NavButton>Личный кабинет</NavButton>
      </nav>
    </header>
  );
};

export default AppHeader;
