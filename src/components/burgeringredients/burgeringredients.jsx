import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import styles from "./burgeringredients.module.css";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("buns");

  const renderIngredient = (item, type) => {
    return item.type === type ? (
      <Ingredient
        key={item._id}
        image={item.image}
        price={item.price}
        name={item.name}
      />
    ) : null;
  };

  return (
    <div>
      <div className={styles.tabs + " pt-5 pb-10"}>
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="fillings"
          active={current === "fillings"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients + " custom-scroll"}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <div className={styles.container + " pt-6 pl-4"}>
          {props.data.map((item) => {
            return renderIngredient(item, "bun");
          })}
        </div>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <div className={styles.container + " pt-6 pl-4"}>
          {props.data.map((item) => {
            return renderIngredient(item, "sauce");
          })}
        </div>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <div className={styles.container + " pt-6 pl-4"}>
          {props.data.map((item) => {
            return renderIngredient(item, "main");
          })}
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
