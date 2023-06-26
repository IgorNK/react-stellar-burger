import styles from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientDetails = (props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading + " text text_type_main-large"}>
        Детали ингредиента
      </h2>
      <img
        className={styles.image}
        src={props.data.image_large}
        alt={props.data.name}
      />
      <p className="text text_type_main-medium mt-4">{props.data.name}</p>
      <ul className={styles.table}>
        <li className={styles.cell}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.data.calories}
          </p>
        </li>
        <li className={styles.cell}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.data.proteins}
          </p>
        </li>
        <li className={styles.cell}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.data.fat}
          </p>
        </li>
        <li className={styles.cell}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.data.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = ingredientPropType;

export default IngredientDetails;
