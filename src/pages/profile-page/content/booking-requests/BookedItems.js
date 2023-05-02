import { MDBBadge, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import { getItemsInUseHistoryAction } from "pages/profile-page/ProfilePageActions";


function BookedItems() {
  const dispatch = useDispatch();
  window.onload = () => {
    dispatch(getItemsInUseHistoryAction("booked"));
  };
  
  const items = useSelector((state) => state.requestsPage.items_in_use);  //models/item_in_use/type
  console.log(items.value);
  //const filteredItems = items.value.filter((i) => i.is_confirm === 0);
  const filteredItems = items.value;

  return (
    <MDBContainer>
      {filteredItems.length === 0 && (
        <MDBRow>
          <MDBBadge color={"transparent"}>
            <MDBIcon color={"danger"} fas size={"8x"} icon={"snowman"} />
            <h3 className={"text-secondary"}>
              У вас нет входящих заявок
            </h3>
          </MDBBadge>
        </MDBRow>
      )}
      {filteredItems.map((i) => (
        <ItemCard item={i} key={i.item_id} />
      ))}
    </MDBContainer>
  );
}

export default BookedItems;
