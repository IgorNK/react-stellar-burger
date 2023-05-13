import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../appheader/appheader";
import BurgerIngredients from "../burgeringredients/burgeringredients";
import BurgerConstructor from "../burgerconstructor/burgerconstructor";

function App() {
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
            <BurgerConstructor />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
