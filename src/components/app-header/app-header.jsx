import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import NavButton from "../nav-button/nav-button";
import styles from "./app-header.module.css";

const AppHeader = (props) => {
  const [activeButton, setActiveButton] = useState("burger");
  const location = useLocation();

  useEffect(() => {
    switch (true) {
      case location.pathname.includes("orders"): {
        setActiveButton("orders");
        break;
      }
      case location.pathname.includes("profile"): {
        setActiveButton("profile");
        break;
      }
      default: {
        setActiveButton("burger");
      }
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link className={styles.link} to="/">
          <NavButton active={activeButton === "burger"} value="burger">
            Конструктор
          </NavButton>
        </Link>
        <Link className={styles.link} to="/profile/orders">
          <NavButton active={activeButton === "orders"} value="orders">
            Лента заказов
          </NavButton>
        </Link>
      </nav>
      <Logo />
      <nav className={styles.profileButton}>
        <Link className={styles.link} to="/profile">
          <NavButton active={activeButton === "profile"} value="profile">
            Личный кабинет
          </NavButton>
        </Link>
      </nav>
    </header>
  );
};

export default AppHeader;
