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
import { unbookItemsAction } from "./ItemsManagementTabActions";
import { removeMyItemsByTypeById } from "./ItemsManagementTabSlice";

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
    dispatch(
      removeMyItemsByTypeById({
        type: "booked",
        data: [bookingData.item_id],
      })
    );
  };

  return (
    <MDBCard
      className={`border border-2 rounded-8 shadow-0 border-warning h-100 p-3 ${loadingClass}`}
    >
      <MDBRow>
        <MDBCol center size={"3"}>
          <MDBCardImage fluid src={image} alt={item.item_name} />
        </MDBCol>
        <MDBCol size={"7"} className={"ps-0"}>
          <MDBCardTitle className={"fs-6 text-truncate mb-1"}>
            {item.item_name}
          </MDBCardTitle>
          <MDBCardSubTitle className={"text-truncate"}>
            {category.category_name}
          </MDBCardSubTitle>
        </MDBCol>
      </MDBRow>
      <MDBBtn
        className={"position-absolute m-2 end-0 top-0"}
        onClick={() => onClickUnbookItem()}
        color={"danger"}
        floating
        size={"sm"}
        outline
      >
        <MDBIcon size={"lg"} far icon={"trash-alt"}></MDBIcon>
      </MDBBtn>
      <div className={"position-absolute m-2 end-0 bottom-0"}>
        <MDBBadge pill color={"dark"}>
          {bookingData.item_quantity} шт.
        </MDBBadge>
      </div>
    </MDBCard>
  );
}

export function MyRequestedItemCard(props) {
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
    dispatch(
      removeMyItemsByTypeById({
        type: "requested",
        data: [bookingData.item_id],
      })
    );
  };

  return (
    <MDBCard
      className={`border border-2 rounded-8 shadow-0 border-secondary p-3 ${loadingClass}`}
    >
      <MDBRow>
        <MDBCol center size={"3"}>
          <MDBCardImage fluid src={image} alt={item.item_name} />
        </MDBCol>
        <MDBCol size={"7"} className={"ps-0"}>
          <MDBCardTitle className={"fs-6 mb-1 text-truncate"}>
            {item.item_name}
          </MDBCardTitle>
          <MDBCardSubTitle className={"text-truncate"}>
            {category.category_name}
          </MDBCardSubTitle>
        </MDBCol>
      </MDBRow>
      <MDBBtn
        className={"position-absolute m-2 end-0 top-0"}
        onClick={() => onClickUnbookItem()}
        color={"danger"}
        size={"sm"}
        floating
        outline
      >
        <MDBIcon size={"lg"} far icon={"trash-alt"}></MDBIcon>
      </MDBBtn>
      <MDBBadge
        pill
        color={"dark"}
        className={"position-absolute m-2 end-0" + " bottom-0"}
      >
        {bookingData.item_quantity} шт.
      </MDBBadge>
    </MDBCard>
  );
}

export function MyTakenItemCard(props) {
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

  return (
    <MDBCard
      className={`border border-2 rounded-8 shadow-0 border-secondary h-100 p-3 ${loadingClass}`}
    >
      <MDBRow>
        <MDBCol center size={"3"}>
          <MDBCardImage fluid src={image} alt={item.item_name} />
        </MDBCol>
        <MDBCol size={"7"} className={"ps-0"}>
          <MDBCardTitle className={"fs-6 text-truncate mb-1"}>
            {item.item_name}
          </MDBCardTitle>
          <MDBCardSubTitle className={"text-truncate"}>
            {category.category_name}
          </MDBCardSubTitle>
        </MDBCol>
      </MDBRow>
      <div className={"position-absolute m-2 end-0 bottom-0"}>
        <MDBBadge pill color={"dark"}>
          {bookingData.item_quantity} шт.
        </MDBBadge>
      </div>
    </MDBCard>
  );
}
