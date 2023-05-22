import { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./app.module.css";
import { dataUrl } from "../../utils/data";
import Api from "../../utils/api.js";
import AppHeader from "../appheader/appheader";
import BurgerIngredients from "../burgeringredients/burgeringredients";
import BurgerConstructor from "../burgerconstructor/burgerconstructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredientdetails/ingredientdetails";
import OrderDetails from "../orderdetails/orderdetails";

function App() {
  const [data, setData] = useState([]);
  const [modalState, setModalState] = useState({
    visible: false,
    content: null,
  });

  useEffect(() => {
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
      content: <IngredientDetails data={ingredient}></IngredientDetails>,
    });
  };

  const handleOpenOrderDetails = (order) => {
    setModalState({
      visible: true,
      content: <OrderDetails data={order}></OrderDetails>,
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
      {modalState.visible && modal}
    </div>
  );
}

export default App;
