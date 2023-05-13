import { useState } from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavButton from "../navbutton/navbutton";
import styles from "./appheader.module.css";

const AppHeader = (props) => {
  const [current, setCurrent] = useState("burger");
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <NavButton
          value="burger"
          active={current === "burger"}
          onClick={() => setCurrent("burger")}
        >
          Конструктор
        </NavButton>
        <NavButton
          value="orders"
          active={current === "orders"}
          onClick={() => setCurrent("orders")}
        >
          Лента заказов
        </NavButton>
      </nav>
      <Logo />
      <nav className={styles.profileButton}>
        <NavButton
          value="profile"
          active={current === "profile"}
          onClick={() => setCurrent("profile")}
        >
          Личный кабинет
        </NavButton>
      </nav>
    </header>
  );
};

export default AppHeader;
