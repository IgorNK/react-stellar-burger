import styles from "./nav-button.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const NavButton: React.FC<{
  active: boolean,
  value: string,
  children: string | React.ReactElement | React.ReactElement[],
}> = ({active, value, children}) => {
  const getIconClass = (active: boolean) => {
    return active ? "primary" : "secondary";
  };

  const getTextClass: (active: boolean) => string = (active) => {
    return active
      ? "text text_type_main-default"
      : "text text_type_main-default text_color_inactive";
  };

  const renderIcon: (value: string) => React.ReactElement | null = (value) => {
    switch (value) {
      case "burger":
        return <BurgerIcon type={getIconClass(active)} />;
      case "orders":
        return <ListIcon type={getIconClass(active)} />;
      case "profile":
        return <ProfileIcon type={getIconClass(active)} />;
      default:
        return null;
    }
  };

  return (
    <button type="button" className={styles.navButton + " pl-5 pr-5 pb-4 pt-4"}>
      {renderIcon(props.value)}
      <p className={getTextClass(props.active)}>{props.children}</p>
    </button>
  );
};

export default NavButton;
