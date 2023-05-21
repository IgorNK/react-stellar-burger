import { useState, useEffect, useMemo } from "react";
import styles from "./app.module.css";
import { dataUrl } from "../../utils/data";
import Api from "../../utils/api.js";
import AppHeader from "../appheader/appheader";
import BurgerIngredients from "../burgeringredients/burgeringredients";
import BurgerConstructor from "../burgerconstructor/burgerconstructor";
import ModalOverlay from "../modaloverlay/modaloverlay";
import IngredientDetails from "../ingredientdetails/ingredientdetails";
import OrderDetails from "../orderdetails/orderdetails";

function App() {
  const [data, setData] = useState([]);
  const [modalState, setModalState] = useState({
    visible: false,
    content: null,
  });

  useEffect(() => {
    console.log("use effect App is fired");
    const api = new Api({ baseUrl: dataUrl });
    const getData = async () => {
      await api
        .getIngredients()
        .then((data) => {
          setData([...data.data]);
        })
        .catch((err) => {
          console.log(
            `ERROR FETCHING DATA FROM SERVER: ${err} \n ${err.stack}`
          );
        });
    };

    getData();
  }, []);

  const handleOpenIngredientDetails = (ingredient) => {
    setModalState({
      visible: true,
      content: <IngredientDetails></IngredientDetails>,
    });
  };

  const handleOpenOrderDetails = (order) => {
    setModalState({
      visible: true,
      content: <OrderDetails></OrderDetails>,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      ...modalState,
      visible: false,
    });
  };

  const modal = useMemo(() => {
    if (modalState.visible)
      return <ModalOverlay>{modalState.content}</ModalOverlay>;
  }, [modalState]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main + " pl-5 pr-5"}>
        <section className={styles.twoColumns}>
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
            <BurgerConstructor
              data={data}
              modalHandler={handleOpenOrderDetails}
            />
          </div>
        </section>
      </main>
      {modal}
    </div>
  );
}

export default App;
