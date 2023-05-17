import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardImage,
  MDBCardSubTitle,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import { getItemCategory, importAllImages } from "utils/ImageUtils";
import { useEffect, useState } from "react";
import { apiGetCategoryInfo, apiGetItemData } from "api/models/ApiCalls";
import { createErrorToast } from "models/ToastModel";
import LoadingState from "enums/LoadingState";
import { useDispatch } from "react-redux";
import { unbookItemsAction } from "../../ProfilePageActions";

const images = importAllImages();

export function MyBookedItemCard(props) {
  const dispatch = useDispatch();

  const bookingData = props.bookingData;

  const [loading, setLoading] = useState(LoadingState.LOADING);
  const [item, setItem] = useState({});
  const [category, setCategory] = useState({});

  useEffect(() => {
    apiGetItemData(bookingData.item_id)
      .then((response) => {
        if (response.status === 200) {
          setItem(response.data.item);
          setLoading(LoadingState.LOADED);
          // Fetch category data
          apiGetCategoryInfo(response.data.item.category_id).then(
            (response) => {
              setCategory(response.data);
            }
          );
        }
      })
      .catch(() => {
        createErrorToast("Ошибка сервера");
      });
  }, []);

  const category_name = getItemCategory(item.category_id);
  const image = images[`${category_name}.png`];

  let loadingClass = "";
  if (loading === LoadingState.LOADING) {
    loadingClass = "placeholder";
  }

  const onClickUnbookItem = () => {
    dispatch(unbookItemsAction([bookingData]));
  };

  return (
    <MDBCard
      className={`border border-2 border-warning h-100 p-3 ${loadingClass}`}
    >
      <MDBRow>
        <MDBCol center size={"3"}>
          <MDBCardImage fluid src={image} alt={item.item_name} />
        </MDBCol>
        <MDBCol size={"7"} className={"ps-0"}>
          <MDBCardTitle className={"text-truncate"}>
            {item.item_name}
          </MDBCardTitle>
          <MDBCardSubTitle className={"text-truncate"}>
            {category.category_name}
          </MDBCardSubTitle>
          <MDBBadge color={"warning"}>Ожидает получения</MDBBadge>
        </MDBCol>
      </MDBRow>
      <MDBBtn
        className={"position-absolute m-2 end-0 top-0"}
        onClick={() => onClickUnbookItem()}
        color={"danger"}
        floating
        outline
      >
        <MDBIcon size={"lg"} far icon={"trash-alt"}></MDBIcon>
      </MDBBtn>
      <MDBBadge
        color={"dark"}
        className={"position-absolute m-2 end-0" + " bottom-0"}
      >
        {bookingData.item_quantity} шт.
      </MDBBadge>
    </MDBCard>
  );
}
