import mountain from "../resources/bg_mountain.png"
import "./HomePage.css"

function HomePage() {
    return (
        <div className="mountain__wrapper">
            <h1 style={{fontFamily: 'Helvetica', fontWeight: 1000}}>ХОДИТЕ В ГОРЫ</h1>
            <img className="mountain" src={mountain} alt="Error"/>
        </div>)
}

export default HomePage