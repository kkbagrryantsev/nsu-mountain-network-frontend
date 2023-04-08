import { MDBBadge, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";

function LendItems() {
  const items = useSelector((state) => state.profilePage.user.items);
  const filteredItems = items.filter((i) => i.is_confirm === 2);
  return (
    <MDBContainer>
      {filteredItems.length === 0 && (
        <MDBRow>
          <MDBBadge color={"transparent"}>
            <MDBIcon color={"danger"} fas size={"8x"} icon={"snowman"} />
            <h3 className={"text-secondary"}>У вас нет выданного снаряжения</h3>
          </MDBBadge>
        </MDBRow>
      )}
      {filteredItems.map((i) => (
        <ItemCard item={i} key={i.item_id} />
      ))}
    </MDBContainer>
  );
}

export default LendItems;
