import PropTypes from "prop-types";
import { useState, useMemo, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./burgeringredients.module.css";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("buns");

  useEffect(() => {
    console.log("use effect BurgerIngredients is fired");
  }, []);

  const renderIngredient = (item) => {
    return (
      <Ingredient
        key={item._id}
        image={item.image}
        price={item.price}
        name={item.name}
      />
    );
  };

  const buns = useMemo(
    () => props.data.filter((item) => item.type === "bun"),
    [props.data]
  );

  const sauces = useMemo(
    () => props.data.filter((item) => item.type === "sauce"),
    [props.data]
  );

  const fillings = useMemo(
    () => props.data.filter((item) => item.type === "main"),
    [props.data]
  );

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
          {buns.map((item) => {
            return renderIngredient(item);
          })}
        </div>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <div className={styles.container + " pt-6 pl-4"}>
          {sauces.map((item) => {
            return renderIngredient(item);
          })}
        </div>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <div className={styles.container + " pt-6 pl-4"}>
          {fillings.map((item) => {
            return renderIngredient(item);
          })}
        </div>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;
