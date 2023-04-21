import {
  MDBCard,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

import { importAllImages } from "utils/ImageUtils";
const images = importAllImages();

function ItemCard(props) {
  const item = props.item;
  console.log(item);
  const image = images[`arbor.png`];
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
