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
import { getItemCategory, importAllImages } from "../../../utils/ImageUtils";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeCartItemQuantity, removeFromCart } from "../CartPageSlice";
import { apiGetCategoryInfo } from "../../../api/models/ApiCalls";
import { createErrorToast } from "../../../models/ToastModel";

const images = importAllImages();

function ItemCard(props) {
  const dispatch = useDispatch();
  const item = props.item;
  const [category, setCategory] = useState("-");
  const onClickAddToCart = (i) => {
    dispatch(
      changeCartItemQuantity({
        ...i,
        quantity: i.quantity + 1,
      })
    );
  };
  const onClickDecreaseQuantity = (i) => {
    dispatch(
      changeCartItemQuantity({
        item_id: i.item_id,
        quantity: i.quantity - 1,
      })
    );
  };
  const onClickRemoveFromCart = (i) => {
    dispatch(removeFromCart(i.item_id));
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
    <MDBCard className={"rounded-8 p-3"}>
      <MDBRow>
        <MDBCol center size={"3"}>
          <MDBCardImage fluid src={image} alt={item.item_name} />
        </MDBCol>
        <MDBCol size={"7"} className={"ps-0"}>
          <MDBCardTitle className={"text-truncate"}>
            {item.item_name}
          </MDBCardTitle>
          <MDBCardText className={"text-truncate"}>
            {category.category_name}
          </MDBCardText>
          <MDBBtnGroup shadow={"0"} size={"sm"}>
            <MDBBtn
              className={"rounded-5 rounded-end border border-2 border-dark"}
              onClick={() => onClickDecreaseQuantity(item)}
              disabled={item.quantity === 1}
              color={"dark"}
              outline
            >
              <MDBIcon fas icon={"minus"} />
            </MDBBtn>
            <MDBBtn noRipple color={"dark"} outline>
              В корзине: {item.quantity}
            </MDBBtn>
            <MDBBtn
              className={"rounded-5 rounded-start"}
              onClick={() => onClickAddToCart(item)}
              color={"dark"}
              outline
            >
              <MDBIcon fas icon={"plus"} />
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
        <MDBBtn
          className={"position-absolute end-0 top-0 m-3"}
          onClick={() => onClickRemoveFromCart(item)}
          floating
          outline
          color={"tertiary"}
        >
          <MDBIcon size={"lg"} far icon={"trash-alt"} />
        </MDBBtn>
      </MDBRow>
    </MDBCard>
  );
}

export default ItemCard;
