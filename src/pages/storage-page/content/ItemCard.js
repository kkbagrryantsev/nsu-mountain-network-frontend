import { useDispatch } from "react-redux";
import {
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
import { getItemCategory, importAllImages } from "../../../utils/ImageUtils";
import { apiGetCategoryInfo } from "../../../api/models/ApiCalls";
import { createErrorToast } from "../../../models/ToastModel";
import {
  changeCartItemQuantity,
  removeFromCart,
} from "../../cart-page/CartPageSlice";

const images = importAllImages();

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
  // Supports local quantity updates, but dispatches all cart changes to store.
  const [cartQuantity, setCartQuantity] = useState(0);
  const [category, setCategory] = useState("-");
  const onClickAddToCart = (i) => {
    dispatch(
      changeCartItemQuantity({
        ...i,
        quantity: cartQuantity + 1,
      })
    );
    setCartQuantity(cartQuantity + 1);
  };
  const onClickRemoveFromCart = (i) => {
    if (cartQuantity === 1) {
      dispatch(removeFromCart(i.item_id));
    } else {
      dispatch(
        changeCartItemQuantity({
          item_id: i.item_id,
          quantity: cartQuantity - 1,
        })
      );
    }
    setCartQuantity(cartQuantity - 1);
  };

  useEffect(() => {
    apiGetCategoryInfo(item.category_id)
      .then((r) => {
        setCategory(r.data);
      })
      .catch(() => {
        createErrorToast("Ошибка сервера");
      });
  }, []);

  const category_name = getItemCategory(item.category_id);
  const image = images[`${category_name}.png`];

  return (
    <MDBCard className={"rounded-6 h-100 p-3"}>
      <MDBRow className={"row-cols-2"}>
        <MDBCol center md={"4"}>
          <MDBCardImage fluid src={image} alt={item.item_name} />
        </MDBCol>
        <MDBCol md={"8"} className={"ps-0"}>
          <MDBCardTitle className={"mb-0 text-truncate"}>
            {item.item_name}
          </MDBCardTitle>
          <MDBCardText className={"text-truncate"}>
            {category.category_name}
          </MDBCardText>
          <MDBBtn
            className={"rounded-5"}
            color={"dark"}
            hidden={cartQuantity !== 0}
            onClick={() => onClickAddToCart(item)}
          >
            В корзину
            <MDBIcon className={"ps-2"} fas size={"lg"} icon={"cart-plus"} />
          </MDBBtn>
          <MDBBtnGroup className={"rounded-5"} shadow={"0"} size={"sm"}>
            <MDBBtn
              className={"rounded-5 rounded-end"}
              onClick={() => onClickRemoveFromCart(item)}
              hidden={cartQuantity === 0}
              color={"dark"}
              outline
            >
              <MDBIcon fas icon={"minus"} />
            </MDBBtn>
            <MDBBtn hidden={cartQuantity === 0} noRipple color={"dark"} outline>
              В корзине: {cartQuantity}
            </MDBBtn>
            <MDBBtn
              className={"rounded-5 rounded-start"}
              hidden={cartQuantity === 0}
              onClick={() => onClickAddToCart(item)}
              color={"dark"}
              outline
            >
              <MDBIcon fas icon={"plus"} />
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}

export default ItemCard;
