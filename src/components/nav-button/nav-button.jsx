import styles from "./nav-button.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const NavButton = (props) => {
  const getIconClass = (active) => {
    return active ? "primary" : "secondary";
  };

  const getTextClass = (active) => {
    return active
      ? "text text_type_main-default"
      : "text text_type_main-default text_color_inactive";
  };

  const renderIcon = (value) => {
    switch (value) {
      case "burger":
        return <BurgerIcon type={getIconClass(props.active)} />;
      case "orders":
        return <ListIcon type={getIconClass(props.active)} />;
      case "profile":
        return <ProfileIcon type={getIconClass(props.active)} />;
      default:
        return;
    }
  };

  return (
    <button
      type="button"
      className={styles.navbutton + " pl-5 pr-5 pb-4 pt-4"}
      onClick={props.onClick}
    >
      {renderIcon(props.value)}
      <p className={getTextClass(props.active)}>{props.children}</p>
    </button>
  );
};

export default NavButton;
