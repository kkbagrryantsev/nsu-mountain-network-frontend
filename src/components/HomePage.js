import {useDispatch} from "react-redux";
import {GrValidate} from "react-icons/gr";
import {activatePopUp} from "../slices/modalsSlice";
import mountain from "../resources/mountain.png"
import bannerText from "../resources/banner-text.png"
import shadow from "../resources/shadow.png"
import pros1 from "../resources/pros10.jpg"
import pros2 from "../resources/pros18.jpg"
import pros3 from "../resources/pros23.jpg"
import "./HomePage.css"

function ProsCard({title, description, image}) {
    return (<div className="prosCard__wrapper">
        <img src={image} alt="Error"/>
        <div className="prosText__wrapper">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </div>)
}

function HomePage() {
    const dispatch = useDispatch();
    return (<div>
        <div className="banner__wrapper">
            <img className="text" src={bannerText} alt="Error"/>
            <div className="mountain__wrapper">
                <img className="mountain" src={mountain} alt="Error"/>
                <img className="shadow" src={shadow} alt="Error"/>
            </div>
        </div>
        <div className="pros__wrapper">
            <div style={{marginTop: "20px", display: "flex", flexDirection:"row", alignItems:"center"}}>
                <h3>Наша команда продолжает свою деятельность по организации экспедиций и походов с 1980 года</h3>
                <GrValidate style={{marginTop: "50px"}} color="green" size={100}/>
            </div>
            <ProsCard
                title="Походы от I до IV уровня сложности"
                description="Мероприятия доступные людям любого уровня физической подготовки.
                Групповые экспедиции, как способ очистить свой разум и отдохнуть"
                image={pros1}
            />
            <ProsCard
                title="Доступное снаряжение"
                description="Нет необходимости покупать своё снаряжение.
                Можно забронировать на сайте и получить готовое на складе"
                image={pros3}
            />
            <ProsCard
                title="Регулярная подготовка"
                description="Мероприятия для всех членов секции по отработке навыков первой необходимости"
                image={pros2}
            />
            <button className="default" onClick={() => dispatch(activatePopUp('signUp'))}>Оставить заявку</button>
        </div>
    </div>)
}

export default HomePage