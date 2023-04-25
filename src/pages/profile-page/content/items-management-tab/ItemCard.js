import {
  MDBCard,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

import { importAllImages } from "utils/ImageUtils";
import { useEffect } from "react";
import { apiGetItemData } from "../../../../api/ApiCalls";
const images = importAllImages();

function ItemCard(props) {
  const item = props.item;
  console.log(item);
  const image = images[`arbor.png`];
  useEffect(() => {
    apiGetItemData(item.item_id).then((r) => {
      item = { ...item, ...r };
    });
  });
  // const itemData = dispatch(getItemData({ item_id: item.item_id } || null));
  return (
    <MDBRow className={"mb-3"}>
      <MDBCard>
        <MDBContainer fluid>
          <MDBRow className={"p-3"}>
            <MDBCol size={"2"}>
              <MDBCardImage src={image}></MDBCardImage>
            </MDBCol>
            <MDBCol size={"4"}>
              <MDBCardTitle>Item</MDBCardTitle>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBCard>
    </MDBRow>
  );
}

export default ItemCard;
