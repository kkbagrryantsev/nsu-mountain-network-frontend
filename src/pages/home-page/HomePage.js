import { GrValidate } from "react-icons/gr";
import ProsCard from "./components/ProsCard";
import styles from "./styles/HomePage.module.scss";
import slogan from "../../assets/slogan.png";
import mountain from "../../assets/mountain.png";
import pros_1 from "../../assets/png/main-page/pros_1.jpg";
import pros_2 from "../../assets/png/main-page/pros_2.jpg";
import pros_3 from "../../assets/png/main-page/pros_3.jpg";
import { Slider } from "../../components/FotoSlider/Slider";

function HomePage() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.banner}>
          <img src={slogan} alt="..." />
        </div>
        <div className={styles.mount}>
          <img src={mountain} alt="..." />
        </div>
      </header>
      <main className={styles.outlet}>
        <div
          className={"d-flex flex-row align-items-center"}
          style={{ width: "75%", textAlign: "center" }}
        >
          <h3>
            Наша команда продолжает свою деятельность по организации экспедиций
            и походов с 1980 года
          </h3>
          <GrValidate size={200} />
        </div>

        <Slider />

        <ProsCard
          img={pros_1}
          title="Походы от I до VI уровня сложности"
          text="Мероприятия доступные людям любого уровня физической подготовки.
              Групповые экспедиции, как способ очистить свой разум и отдохнуть"
        />
        <ProsCard
          img={pros_2}
          title="Доступное снаряжение"
          text="Нет необходимости покупать своё снаряжение. Можно забронировать на
              сайте и получить готовое на складе"
        />
        <ProsCard
          img={pros_3}
          title="Регулярная подготовка"
          text="Мероприятия для всех членов секции по отработке навыков первой
              необходимости"
        />
      </main>
    </div>
  );
}

export default HomePage;
