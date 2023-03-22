import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { getItemCategory } from "../../../utils/ImageUtils";
import styles from "../styles/StoragePage.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../StoragePageSlice";

/**
 * Storage item card.
 *
 * @param props item data
 * @param props.item_name item name
 * @param props.category.category_name item category name
 * @param props.category.category_id item category id
 * @returns {JSX.Element}
 * @constructor
 */
function ItemCard(props) {
  const dispatch = useDispatch();
  const item = props.item;
  const quantity = item.item_quantity_current;
  // Supports local quantity updates, but dispatches all cart changes to store.
  const [cartQuantity, setCartQuantity] = useState(0);
  const onClickAddToCart = (i) => {
    dispatch(addToCart(i));
    setCartQuantity(cartQuantity + 1);
  };
  const onClickRemoveFromCart = (i) => {
    dispatch(removeFromCart(i));
    setCartQuantity(cartQuantity - 1);
  };
  const image = getItemCategory(item.category.category_id);

  return (
    <MDBCard className={styles.itemCard}>
      <div>
        <MDBCardImage src={image} alt="..." position="top" />
        <MDBBadge pill className="position-absolute translate-middle">
          {quantity}
        </MDBBadge>
      </div>
      <MDBCardBody>
        <MDBCardTitle className={"text-truncate"}>
          {item.item_name}
        </MDBCardTitle>
        <MDBCardText className={"text-truncate"}>
          {item.category.category_name}
        </MDBCardText>
      </MDBCardBody>
      <MDBCardFooter className={"d-flex"}>
        {cartQuantity === 0 ? (
          <MDBBtn
            className={"flex-grow-1"}
            onClick={() => onClickAddToCart(item)}
            outline
          >
            <MDBIcon fas size={"2xl"} icon={"cart-plus"} />
          </MDBBtn>
        ) : (
          <div className={"d-flex flex-row flex-grow-1 w-100"}>
            <MDBBtn
              outline
              floating
              onClick={() => onClickRemoveFromCart(item)}
            >
              <MDBIcon fas icon={"minus"} />
            </MDBBtn>
            <div className={"flex-grow-1 text-center"}>
              <h4>{cartQuantity}</h4>
            </div>
            <MDBBtn
              outline
              floating
              onClick={() => onClickAddToCart(item)}
              disabled={quantity === cartQuantity}
            >
              <MDBIcon fas icon={"plus"} />
            </MDBBtn>
          </div>
        )}
      </MDBCardFooter>
    </MDBCard>
  );
}

export default ItemCard;
