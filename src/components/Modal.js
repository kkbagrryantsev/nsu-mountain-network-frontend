import "./Modal.css"
import {useDispatch, useSelector} from "react-redux";
import {disablePopUp} from "../slices/modalsSlice";

const Modal = ({name, children}) => {
    const dispatch = useDispatch();
    const active = useSelector((state) => state.modals[name])
    return (<div className={active ? "modal active" : "modal"}
                 onClick={() => dispatch(disablePopUp(name))}>
        <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>)
}

export default Modal