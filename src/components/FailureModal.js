import {CiCircleRemove} from "react-icons/ci";

function FailureModal({text}) {
    return <div>
        <CiCircleRemove color="red" size={70}/>
        <h2>{text}</h2>
    </div>
}

export default FailureModal