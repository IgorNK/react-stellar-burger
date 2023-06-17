import { useState, useEffect, useMemo, useCallback, useReducer } from "react";
import styles from "./app.module.css";
import { dataUrl } from "../../utils/data";
import Api from "../../utils/api.js";
import AppHeader from "../appheader/appheader";
import BurgerIngredients from "../burgeringredients/burgeringredients";
import BurgerConstructor from "../burgerconstructor/burgerconstructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredientdetails/ingredientdetails";
import OrderDetails from "../orderdetails/orderdetails";
import ErrorPopup from "../errorpopup/errorpopup";
import { CartContext } from "../../services/cartContext";

const initialCart = { total: 0, ingredients: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const newIngredients = [...state.ingredients, action.payload];
      const newTotal = getTotal(newIngredients);
      return { total: newTotal, ingredients: newIngredients };
    }
    case "remove": {
      const newIngredients = [...initialCart.ingredients];
      const ingredientIndex = newIngredients.indexOf(action.payload);
      if (ingredientIndex > -1) {
        newIngredients.splice(ingredientIndex, 1);
      }
      const newTotal = getTotal(newIngredients);
      return { total: newTotal, ingredients: newIngredients };
    }
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function getTotal(ingredients) {
  return ingredients.reduce((sum, item) => sum + item.price, 0);
}

function getIngredientIDs(ingredients) {
  return ingredients.map((item) => item._id);
}

function App() {
  const api = new Api({ baseUrl: dataUrl });
  const [data, setData] = useState([]);
  const [modalState, setModalState] = useState({
    visible: false,
    content: null,
  });
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const [cartState, cartDispatcher] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    const getData = async () => {
      console.log("get data");
      await api
        .getIngredients()
        .then((data) => {
          setData([...data.data]);
        })
        .catch((err) => {
          const errorMessage = `ERROR FETCHING DATA FROM SERVER: ${err} \n ${err.stack}`;
          setError(errorMessage);
          console.log(errorMessage);
        });
    };

    getData();
  }, []);

  useEffect(() => {
    order && handleOpenOrderDetails(order);
  }, [order]);

  useEffect(() => {
    error && handleOpenError(error);
  }, [error]);

  const handleOpenIngredientDetails = (ingredient) => {
    setModalState({
      visible: true,
      content: <IngredientDetails data={ingredient}></IngredientDetails>,
    });
  };

  const requestOrderSubmit = async (ingredientIDs) => {
    console.log("submit order");
    await api
      .submitOrder(ingredientIDs)
      .then((res) => {
        setOrder(res.order);
      })
      .catch((err) => {
        const errorMessage = `ERROR POSTING ORDER: ${err} \n ${err.message}`;
        setError(errorMessage);
      });
  };

  const handleOrderSubmit = async (cartState) => {
    const ingredientIDs = getIngredientIDs(cartState.ingredients);
    await requestOrderSubmit(ingredientIDs);
  };

  const handleOpenOrderDetails = (order) => {
    setModalState({
      visible: true,
      content: <OrderDetails number={order.number}></OrderDetails>,
    });
  };

  const handleOpenError = (errorMsg) => {
    setModalState({
      visible: true,
      content: <ErrorPopup>{errorMsg}</ErrorPopup>,
    });
  };

  const handleCloseModal = useCallback(() => {
    setModalState({
      ...modalState,
      visible: false,
    });
  }, [modalState]);

  const modal = useMemo(() => {
    return <Modal onClose={handleCloseModal}>{modalState.content}</Modal>;
  }, [modalState.content, handleCloseModal]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main + " pl-5 pr-5"}>
        <section className={styles.twoColumns}>
          <CartContext.Provider value={{ cartState, cartDispatcher }}>
            <div>
              <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
              </h1>
              <BurgerIngredients
                data={data}
                modalHandler={handleOpenIngredientDetails}
              />
            </div>
            <div>
              <BurgerConstructor modalHandler={handleOrderSubmit} />
            </div>
          </CartContext.Provider>
        </section>
      </main>
      {modalState.visible && modal}
    </div>
  );
}

export default App;
