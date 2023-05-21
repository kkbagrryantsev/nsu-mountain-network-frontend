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
import { changeCartItemQuantity } from "../../../../cart-page/CartPageSlice"; 

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
  // Supports local quantity updates, but dispatches all cart changes to store.
  const [cartQuantity, setCartQuantity] = useState(0);
  const onClickAddToCart = (i) => {
    dispatch(
      changeCartItemQuantity({
        ...i,
        quantity: cartQuantity + 1,
      })
    );
    setCartQuantity(cartQuantity + 1);
  };

  return (
    <MDBCard className={"h-100 p-3"} >
      <MDBRow>
        <MDBCol size={"100"} className={"ps-0"}>
          <MDBCardTitle className={"text-truncate"}>
          
    <h5 className={"mb-0 align-items-center gap-1"}>
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
            onClick={() => onClickAddToCart(user)}
          >
            Изменить баланс
            <MDBIcon className={"ps-2"} fas size={"lg"} icon={"coins"} />
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}

export default UserCard;
