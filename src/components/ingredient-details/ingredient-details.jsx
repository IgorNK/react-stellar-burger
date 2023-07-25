import styles from "./ingredient-details.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const { id } = useParams();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    setIngredient(ingredients.find((item) => item._id === id));
  }, [ingredients, id]);

  if (!ingredient) {
    return <h1>Ингредиент не найден!</h1>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading + " text text_type_main-large"}>
        Детали ингредиента
      </h2>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
      <ul className={styles.table}>
        <li className={styles.cell}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>
        <li className={styles.cell}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>
        <li className={styles.cell}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>
        <li className={styles.cell}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
