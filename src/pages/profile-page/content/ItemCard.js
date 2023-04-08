import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBContainer,
} from "mdb-react-ui-kit";
import { getItemCategory, importAllImages } from "../../../utils/ImageUtils";
import { useState } from "react";
import RoleDependentBlock from "../../../components/role-dependent-block/RoleDependentBlock";
import { useDispatch } from "react-redux";
import { returnItem } from "../ProfilePageActions";

const images = importAllImages();

function ItemCard(props) {
  const dispatch = useDispatch();
  const item = props.item;
  const category_name = getItemCategory(item.category_id);
  const image = images[`${category_name}.png`];
  const [quantity] = useState(item.item_quantity);

  return (
    <MDBCard
      style={{
        minWidth: "250px",
        maxHeight: "fit-content",
        padding: "20px",
      }}
    >
      <MDBContainer>
        <MDBCardImage
          style={{ aspectRatio: "1/1", maxWidth: "60px" }}
          src={image}
          alt="..."
          position="top"
        />
        <MDBBadge pill className="position-absolute translate-middle">
          {quantity}
        </MDBBadge>
        <MDBBadge pill color={item.is_confirm === 1 ? "success" : "warning"}>
          {item.is_confirm === 1 ? "Выдано" : "Ожидает"}
        </MDBBadge>
      </MDBContainer>
      <MDBCardBody>
        <MDBCardTitle>{item.item_id}</MDBCardTitle>
        <MDBCardText>{item.item_id}</MDBCardText>
        <MDBCardText>
          <small className="text-muted">{props.item.until_datetime}</small>
        </MDBCardText>
        <RoleDependentBlock role={"warehouseman"}>
          <MDBBtn
            onClick={() => {
              dispatch(
                returnItem({ use_id: item.item_id, quantity: quantity } || null)
              );
            }}
            color={"danger"}
            outline
          >
            Вернуть
          </MDBBtn>
        </RoleDependentBlock>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ItemCard;
