import { useDispatch } from "react-redux";
import {
  MDBBadge,
  MDBBtn,
  MDBBtnGroup,
  MDBCard,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import ChangeBalanceDialog from "./ChangeBalanceDialog";
//import { changeBalanceModal, setChangeBalanceModal } from "../TreasurerPageTab";

/**
 * Storage item card.
 *
 * @param props user data
 * @param props.user_name user name
 * @returns {JSX.Element}
 * @constructor
 */
function UserCard(props) {
  const dispatch = useDispatch();
  const user = props.user.user;
  const [cartQuantity, setCartQuantity] = useState(0);

  const [changeBalanceModal, setChangeBalanceModal] = useState(false);

  return (
    <div>
    <ChangeBalanceDialog isActive={changeBalanceModal} setIsActive={setChangeBalanceModal}
     currentUserName={user.user_name} currentUserID={user.user_id}/>
    <MDBCard className={"h-100 p-3"} >
      <MDBRow>
        <MDBCol size={"10"} className={"ps-0"}>
          <MDBCardTitle className={"text-truncate"}>
          
    <h5>
    {user.user_name + " "}
      <MDBBadge
        className={`bage`}
        pill
        color={"secondary"}
      >
        {user.user_money}
      </MDBBadge>
    </h5> 

          </MDBCardTitle>
          <MDBBtn
            color={"dark"}
            hidden={cartQuantity !== 0}
            onClick={() => setChangeBalanceModal(!changeBalanceModal)}
          >
            Изменить баланс
            <MDBIcon className={"ps-2"} fas size={"lg"} icon={"coins"} />
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBCard>
    </div>
  );
}

export default UserCard;
