import { MDBBadge, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";

function BookedItems() {
  const items = useSelector((state) => state.profilePage.user.items);
  //const items = useSelector((state) => state.profilePage.user.item_in_use);  //models/item_in_use/type
  //const items = apiGetRequests("booked");
  const filteredItems = items.filter((i) => i.is_confirm === 0);
  //const filteredItems = items;

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
