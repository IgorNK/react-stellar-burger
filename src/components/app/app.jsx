import { useState, useEffect } from "react";
import styles from "./app.module.css";
import { dataUrl } from "../../utils/data";
import Api from "../../utils/api.js";
import AppHeader from "../appheader/appheader";
import BurgerIngredients from "../burgeringredients/burgeringredients";
import BurgerConstructor from "../burgerconstructor/burgerconstructor";

function App() {
  const [data, setData] = useState([]);

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

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main + " pl-5 pr-5"}>
        <section className={styles.twoColumns}>
          <div>
            <h1 className="text text_type_main-large mt-10 mb-5">
              Соберите бургер
            </h1>
            <BurgerIngredients data={data} />
          </div>
          <div>
            <BurgerConstructor data={data} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
