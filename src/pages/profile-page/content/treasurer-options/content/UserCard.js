import {
  MDBBadge,
  MDBBtn,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState } from "react";
import ChangeBalanceDialog from "./ChangeBalanceDialog";

/**
 * Storage item card.
 *
 * @param props user data
 * @param props.user_name user name
 * @returns {JSX.Element}
 * @constructor
 */
function UserCard(props) {
  const user = props.user.user;
  const [balance, setBalance] = useState(user.user_money);

  const [changeBalanceModal, setChangeBalanceModal] = useState(false);

  return (
    <div>
      <ChangeBalanceDialog setBalance={setBalance} isActive={changeBalanceModal} setIsActive={setChangeBalanceModal}
     currentUserName={user.user_name} currentUserLogin={user.user_login}/>
    
      <MDBCol size={"12"} className={"ps-0"}>   
        <h5>
          {user.user_name + " "}
          <MDBBadge
          pill
          color={"secondary"}
          >
            {balance}
          </MDBBadge>
        </h5> 
          <MDBBtn
            color={"dark"}
            onClick={() => setChangeBalanceModal(!changeBalanceModal)}
          >
            Изменить баланс
            <MDBIcon className={"ps-2"} fas size={"lg"} icon={"coins"} />
          </MDBBtn>
        </MDBCol>
    </div>
  );
}

export default UserCard;
