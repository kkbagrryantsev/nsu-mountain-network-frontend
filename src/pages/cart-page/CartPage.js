import { MDBBtn } from "mdb-react-ui-kit";
import ItemCard from "./content/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { bookItems } from "./CartPageActions";

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.storagePage.cart);
  return (
    <div className={"d-flex flex-column align-items-center w-100 m-3"}>
      {cart.map((item) => {
        return <ItemCard item={item} key={item.item_id} />;
      })}
      <MDBBtn size={"lg"} onClick={() => dispatch(bookItems())}>
        Забронировать
      </MDBBtn>
    </div>
  );
}

export default CartPage;
