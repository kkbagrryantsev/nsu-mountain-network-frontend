import { MDBBadge, MDBBtn, MDBCol, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import ChangeBalanceDialog from "./ChangeBalanceDialog";
import cat from "assets/png/profile-page/grinning-cat.png";

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
    <>
      <ChangeBalanceDialog
        setBalance={setBalance}
        isActive={changeBalanceModal}
        setIsActive={setChangeBalanceModal}
        currentUserName={user.user_name}
        currentUserLogin={user.user_login}
      />

      <MDBRow>
        <MDBCol size={"4"} md={"3"} xxl={"2"}>
          <img className={"w-100"} src={cat} alt={"profile-pic"} />
        </MDBCol>
        <MDBCol className={"pt-2"}>
          <h5>
            {user.user_name + " "}
            <MDBBadge pill color={"secondary"}>
              {balance} ₽
            </MDBBadge>
          </h5>
          <MDBBtn
            size={"sm"}
            className={"rounded-8"}
            color={"dark"}
            onClick={() => setChangeBalanceModal(!changeBalanceModal)}
          >
            Изменить баланс
            <MDBIcon className={"ps-2"} fas size={"lg"} icon={"coins"} />
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default UserCard;
