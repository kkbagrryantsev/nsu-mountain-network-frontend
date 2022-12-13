import {Outlet} from "react-router-dom";
import TopBar from "../components/TopBar";
import Footer from "./Footer";
import "./Default.css"

// noinspection JSUnusedLocalSymbols
const Default = (props) => {
    return (<>
        <TopBar />
        <div className="container"><Outlet /></div>
        <Footer/>
    </>);
};

export default Default;
