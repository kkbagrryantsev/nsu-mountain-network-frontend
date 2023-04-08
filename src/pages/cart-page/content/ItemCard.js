import {
  MDBBtn,
  MDBBtnGroup,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCheckbox,
  MDBCol,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import { getItemCategory, importAllImages } from "../../../utils/ImageUtils";
import { addToCart, removeFromCart } from "../../storage-page/StoragePageSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const images = importAllImages();

function ItemCard(props) {
  const dispatch = useDispatch();
  const item = props.item;
  const category_name = getItemCategory(item.category_id);
  const image = images[`${category_name}.png`];
  const [quantity, setQuantity] = useState(item.item_quantity_current);
  const onClickAddToCart = (i) => {
    dispatch(addToCart(i));
    setQuantity(quantity + 1);
  };
  const onClickRemoveFromCart = (i) => {
    dispatch(removeFromCart(i));
    setQuantity(quantity - 1);
  };
  return (
    <MDBCard className={"p-3 m-3 w-75"}>
      <MDBRow className="g-0">
        <MDBCol className={"d-flex justify-content-center"} md="4">
          <MDBCardImage src={image} alt="..." fluid />
        </MDBCol>
        <MDBCol md="5">
          <MDBCardBody>
            <MDBCardTitle>{item.item_name}</MDBCardTitle>
            <MDBCardText>{item.category_id}</MDBCardText>
          </MDBCardBody>
        </MDBCol>
        <MDBCol
          className={
            "d-flex flex-column justify-content-between align-items-end"
          }
          md={"3"}
        >
          <MDBCheckbox disabled defaultChecked></MDBCheckbox>
          <MDBBtnGroup shadow={"0"}>
            {quantity === 1 ? (
              <MDBBtn
                onClick={() => onClickRemoveFromCart(item)}
                outline
                floating
              >
                <MDBIcon far icon={"trash-alt"} />
              </MDBBtn>
            ) : (
              <MDBBtn
                onClick={() => onClickRemoveFromCart(item)}
                outline
                floating
              >
                <MDBIcon fas icon={"minus"} />
              </MDBBtn>
            )}
            <MDBBtn disabled outline>
              <h6>{quantity}</h6>
            </MDBBtn>
            <MDBBtn onClick={() => onClickAddToCart(item)} outline floating>
              <MDBIcon fas icon={"plus"} />
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}

export default ItemCard;
