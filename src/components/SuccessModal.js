import {CiCircleCheck} from "react-icons/ci";

function SuccessModal({text}) {
    return <div>
        <CiCircleCheck color="green" size={70}/>
        <h2>{text}</h2>
    </div>
}

export default SuccessModal