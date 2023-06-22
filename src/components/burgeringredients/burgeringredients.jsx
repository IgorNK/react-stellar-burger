import PropTypes from "prop-types";
import { useMemo, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import styles from "./burgeringredients.module.css";
import { getIngredients } from "../../services/actions/ingredients";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../services/actions/cart";
import {
  SWITCH_TAB,
  SHOW_INGREDIENT,
} from "../../services/actions/ingredients";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredients, currentTab, ingredientsRequest } = useSelector(
    (store) => store.ingredients
  );

  const addToCart = useCallback(
    (item) => {
      dispatch({
        type: ADD_TO_CART,
        ingredient: item,
      });
    },
    [dispatch]
  );

  const showIngredient = useCallback(
    (item) => {
      dispatch({
        type: SHOW_INGREDIENT,
        item: item,
      });
    },
    [dispatch]
  );

  const renderIngredient = useCallback(
    (item) => {
      return (
        <Ingredient
          key={item._id}
          image={item.image}
          price={item.price}
          name={item.name}
          clickHandler={() => {
            showIngredient(item);
            addToCart(item);
          }}
        />
      );
    },
    [addToCart, showIngredient]
  );

  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );

  const fillings = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const fillingsRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const handleScroll = useCallback(() => {
    const scrollTop = scrollContainerRef.current.scrollTop;
    const offsets = [
      { name: "buns", offset: Math.abs(bunsRef.current.offsetTop - scrollTop) },
      {
        name: "sauces",
        offset: Math.abs(saucesRef.current.offsetTop - scrollTop),
      },
      {
        name: "fillings",
        offset: Math.abs(fillingsRef.current.offsetTop - scrollTop),
      },
    ];

    const tab = offsets.reduce((acc, val) => {
      return acc.offset < val.offset ? acc : val;
    });

    if (currentTab !== tab.name) {
      // console.log(`currentTab: ${currentTab}, tabname: ${tab.name}`);
      dispatch({ type: SWITCH_TAB, tab: tab.name });
    }
  }, [currentTab, dispatch]);

  const ingredientsContainer = useMemo(() => {
    return !ingredientsRequest ? (
      <div
        className={styles.ingredients + " custom-scroll"}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <h2 className="text text_type_main-medium" ref={bunsRef}>
          Булки
        </h2>
        <div className={styles.container + " pt-6 pl-4"}>
          {buns.map((item) => {
            return renderIngredient(item);
          })}
        </div>
        <h2 className="text text_type_main-medium" ref={saucesRef}>
          Соусы
        </h2>
        <div className={styles.container + " pt-6 pl-4"}>
          {sauces.map((item) => {
            return renderIngredient(item);
          })}
        </div>
        <h2 className="text text_type_main-medium" ref={fillingsRef}>
          Начинки
        </h2>
        <div className={styles.container + " pt-6 pl-4"}>
          {fillings.map((item) => {
            return renderIngredient(item);
          })}
        </div>
      </div>
    ) : (
      <p className="text text_type_main-medium">Загрузка...</p>
    );
  }, [
    buns,
    sauces,
    fillings,
    renderIngredient,
    ingredientsRequest,
    handleScroll,
  ]);

  return (
    <div>
      <div className={styles.tabs + " pt-5 pb-10"}>
        <Tab value="buns" active={currentTab === "buns"}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === "sauces"}>
          Соусы
        </Tab>
        <Tab value="fillings" active={currentTab === "fillings"}>
          Начинки
        </Tab>
      </div>
      {ingredientsContainer}
    </div>
  );
};

export default BurgerIngredients;
