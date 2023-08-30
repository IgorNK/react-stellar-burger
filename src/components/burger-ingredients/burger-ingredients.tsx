import { useMemo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import styles from "./burger-ingredients.module.css";
import { TIngredient } from "../ingredient/ingredient";
import {
  SWITCH_TAB,
  SHOW_INGREDIENT,
} from "../../services/actions/ingredients";

const BurgerIngredients: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { ingredients, currentTab, ingredientsRequest } = useSelector(
    (store) => store.ingredients
  );

  const renderIngredient: (item: TIngredient) => React.ReactElement = (item) => {
    return (
      <Link
        className={styles.link}
        key={item._id}
        to={`/ingredients/${item._id}`}
        state={{ background: location }}
      >
        <Ingredient item={item} />
      </Link>
    );
  };

  const buns = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === "bun"),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === "sauce"),
    [ingredients]
  );

  const fillings = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === "main"),
    [ingredients]
  );

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const fillingsRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = scrollContainerRef?.current?.scrollTop;
    const margin = -300;
    const offsets = [
      {
        name: "buns",
        offset: Math.abs(
          Math.abs(bunsRef?.current?.offsetTop - scrollTop) + margin
        ),
      },
      {
        name: "sauces",
        offset: Math.abs(
          Math.abs(saucesRef?.current?.offsetTop - scrollTop) + margin
        ),
      },
      {
        name: "fillings",
        offset: Math.abs(
          Math.abs(fillingsRef?.current?.offsetTop - scrollTop) + margin
        ),
      },
    ];

    const tab = offsets.reduce((acc, val) => {
      return acc.offset < val.offset ? acc : val;
    });

    if (currentTab !== tab.name) {
      dispatch({ type: SWITCH_TAB, tab: tab.name });
    }
  };

  const scrollTo = (ref: React.MutableRefObject<HTMLElement>) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={styles.tabs + " pt-5 pb-10"}>
        <Tab
          value="buns"
          onClick={() => scrollTo(bunsRef)}
          active={currentTab === "buns"}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          onClick={() => scrollTo(saucesRef)}
          active={currentTab === "sauces"}
        >
          Соусы
        </Tab>
        <Tab
          value="fillings"
          onClick={() => scrollTo(fillingsRef)}
          active={currentTab === "fillings"}
        >
          Начинки
        </Tab>
      </div>
      {!ingredientsRequest ? (
        <div
          className={styles.ingredients + " custom-scroll"}
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          <h2 className="text text_type_main-medium" ref={bunsRef}>
            Булки
          </h2>
          <div className={styles.container + " pt-6 pl-4"}>
            {buns.map((item: TIngredient) => {
              return renderIngredient(item);
            })}
          </div>
          <h2 className="text text_type_main-medium" ref={saucesRef}>
            Соусы
          </h2>
          <div className={styles.container + " pt-6 pl-4"}>
            {sauces.map((item: TIngredient) => {
              return renderIngredient(item);
            })}
          </div>
          <h2 className="text text_type_main-medium" ref={fillingsRef}>
            Начинки
          </h2>
          <div className={styles.container + " pt-6 pl-4"}>
            {fillings.map((item: TIngredient) => {
              return renderIngredient(item);
            })}
          </div>
        </div>
      ) : (
        <p className="text text_type_main-medium">Загрузка...</p>
      )}
    </div>
  );
};

export default BurgerIngredients;
