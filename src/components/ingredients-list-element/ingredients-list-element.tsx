import styles from "./ingredients-list-element.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIcon from "../order-icon/order-icon";
import { TIngredient } from "../../services/types";

const IngredientsListElement: React.FC<{
  ingredient: TIngredient, 
  amount: number
}> = ({ ingredient, amount }) => {
  return (
    <li className={styles.listElement}>
      <OrderIcon image={ingredient?.image} />
      <p className="text text_type_main-default">{ingredient?.name}</p>
      <div className={styles.orderPrice}>
        <p className="text text_type_digits-default mr-2">{`${amount} x ${ingredient?.price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  );
};

export default IngredientsListElement;
