import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import styles from "./main.module.css";

export const MainPage: React.FC = () => {
  return (
    <section className={styles.twoColumns}>
      <div>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <BurgerIngredients />
      </div>
      <div>
        <BurgerConstructor />
      </div>
    </section>
  );
};
