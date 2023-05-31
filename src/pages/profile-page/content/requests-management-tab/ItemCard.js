import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  apiGetCategoryImage,
  apiGetCategoryInfo,
  apiGetItemData,
} from "api/models/ApiCalls";
import { createErrorToast } from "models/ToastModel";
import {
  fulfillBookRequestAction,
  patchBookRequestAction,
  returnBookedItemsAction,
} from "./RequestsManagementTabActions";
import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardSubTitle,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import { updateRequest } from "./RequestsManagementTabSlice";

export function RequestedItemCard(props) {
  const dispatch = useDispatch();
  const data = props.data;

  const [loading, setLoading] = useState("placeholder");
  const [item, setItem] = useState({});
  const [imageLoading, setImageLoading] = useState("placeholder");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState({});

  useEffect(() => {
    apiGetItemData(data.item_id)
      .then((response) => {
        if (response.status === 200) {
          setItem(response.data.item);
          setLoading("");
          // Fetch category image
          apiGetCategoryImage(response.data.item.category_id).then(
            (response) => {
              if (response.status === 200) {
                setImageLoading("");
                const imageUrl = URL.createObjectURL(response.data);
                setImage(imageUrl);
              }
            }
          );
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

  return (
    <MDBCard className={`${loading} rounded-8`}>
      <MDBCardBody className={"p-3"}>
        <MDBRow>
          <MDBCol className={"ps-0"} sm={"4"} md={"2"}>
            <MDBCardImage
              style={{ width: "80px" }}
              className={`${imageLoading}`}
              src={image}
            />
          </MDBCol>
          <MDBCol>
            <h5 className={"mb-1"}>{item.item_name}</h5>
            {category.category_name}
          </MDBCol>
        </MDBRow>
        <MDBBtn
          className={"position-absolute m-2 end-0 top-0"}
          color={"danger"}
          floating
          size={"sm"}
          outline
          onClick={() => {
            const payload = {
              items: [{ id: data.use_id, quantity: data.item_quantity }],
              description: "Y",
            };
            dispatch(patchBookRequestAction(payload));
            dispatch(
              updateRequest({
                type: "requested",
                data: {
                  id: data.use_id,
                  changes: { item_quantity: 0 },
                },
              })
            );
          }}
        >
          <MDBIcon size={"lg"} far icon={"trash-alt"}></MDBIcon>
        </MDBBtn>
        <div
          className={
            "d-flex flex-row align-items-center gap-1 position-absolute rounded-5 bottom-0 end-0 m-2"
          }
        >
          <MDBBtn
            disabled={data.item_quantity <= 1}
            color={"tertiary"}
            size={"sm"}
            floating
            outline
            onClick={() => {
              const payload = {
                items: [{ id: data.use_id, quantity: 1 }],
                description: "Y",
              };
              dispatch(patchBookRequestAction(payload));
              dispatch(
                updateRequest({
                  type: "requested",
                  data: {
                    id: data.use_id,
                    changes: { item_quantity: data.item_quantity - 1 },
                  },
                })
              );
            }}
          >
            <MDBIcon fas size={"xl"} icon={"minus"}></MDBIcon>
          </MDBBtn>
          <h5 className={"mb-1"}>
            <MDBBadge color={"dark"}>{data.item_quantity} шт.</MDBBadge>
          </h5>
          <MDBBtn
            disabled
            color={"tertiary"}
            size={"sm"}
            floating
            outline
            onClick={() => {
              const payload = {
                items: [{ id: data.use_id, quantity: -1 }],
                description: "Y",
              };
              dispatch(patchBookRequestAction(payload));
            }}
          >
            <MDBIcon fas size={"xl"} icon={"plus"}></MDBIcon>
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export function BookedItemCard(props) {
  const dispatch = useDispatch();

  const data = props.data;

  const [loading, setLoading] = useState("placeholder");
  const [item, setItem] = useState({});
  const [category, setCategory] = useState({});
  const [image, setImage] = useState();
  const [imageLoading, setImageLoading] = useState("placeholder");

  useEffect(() => {
    apiGetItemData(data.item_id)
      .then((response) => {
        if (response.status === 200) {
          setItem(response.data.item);
          setLoading("");
          // Fetch category image
          apiGetCategoryImage(response.data.item.category_id).then(
            (response) => {
              if (response.status === 200) {
                setImageLoading("");
                const imageUrl = URL.createObjectURL(response.data);
                setImage(imageUrl);
              }
            }
          );
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

  const onClickGiveItem = () => {
    dispatch(fulfillBookRequestAction([data.use_id]));
  };

  return (
    <MDBCard className={`rounded-8 p-3 ${loading}`}>
      <div className={"d-flex flex-row"}>
        <MDBCardImage
          className={`${imageLoading}`}
          style={{ width: "80px" }}
          src={image}
          alt={item.item_name}
        />
        <div className={"d-flex flex-column"}>
          <h6 className={"text-truncate mb-0"}>{item.item_name}</h6>
          {category.category_name}
          <MDBBtn
            className={
              "border border-0 bg-success bg-opacity-10 mt-1 rounded-5 text-truncate"
            }
            onClick={() => onClickGiveItem()}
            color={"success"}
            outline
            size={"sm"}
            style={{ zIndex: 1, width: "120px" }}
          >
            Выдать
            <MDBIcon
              className={"ms-2"}
              size={"lg"}
              fas
              icon={"hand-holding-heart"}
            ></MDBIcon>
          </MDBBtn>
        </div>
      </div>

      <div className={"position-absolute m-2 end-0 bottom-0"}>
        <h5 className={"mb-0"}>
          <MDBBadge pill color={"dark"}>
            {data.item_quantity} шт.
          </MDBBadge>
        </h5>
      </div>
    </MDBCard>
  );
}

export function TakenItemCard(props) {
  const dispatch = useDispatch();

  const data = props.data;

  const [loading, setLoading] = useState("placeholder");
  const [item, setItem] = useState({});
  const [category, setCategory] = useState({});
  const [image, setImage] = useState();
  const [imageLoading, setImageLoading] = useState("placeholder");
  const [quantity, setQuantity] = useState(data.item_quantity);

  useEffect(() => {
    apiGetItemData(data.item_id)
      .then((response) => {
        if (response.status === 200) {
          setItem(response.data.item);
          setLoading("");
          // Fetch category image
          apiGetCategoryImage(response.data.item.category_id).then(
            (response) => {
              if (response.status === 200) {
                setImageLoading("");
                const imageUrl = URL.createObjectURL(response.data);
                setImage(imageUrl);
              }
            }
          );
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

  const onClickReturnItem = () => {
    dispatch(
      returnBookedItemsAction([
        { use_id: data.use_id, item_quantity: quantity },
      ])
    );
  };

  return (
    <MDBCard className={`rounded-8 p-3 ${loading}`}>
      <MDBRow>
        <MDBCol center md={"2"} lg={"2"}>
          <MDBCardImage
            className={`${imageLoading}`}
            style={{ width: "80px" }}
            src={image}
            alt={item.item_name}
          />
        </MDBCol>
        <MDBCol className={"ps-4 ps-md-0 ps-xl-4"}>
          <MDBCardTitle className={"fs-6 text-truncate mb-1"}>
            {item.item_name}
          </MDBCardTitle>
          <MDBCardSubTitle className={"text-truncate"}>
            {category.category_name}
          </MDBCardSubTitle>
          <MDBBtn
            className={"rounded-5 text-truncate"}
            onClick={() => onClickReturnItem()}
            color={"warning"}
            outline
            size={"sm"}
            style={{ zIndex: 1 }}
          >
            Вернуть
            <MDBIcon className={"ms-2"} size={"lg"} fas icon={"box"}></MDBIcon>
          </MDBBtn>
        </MDBCol>
      </MDBRow>

      <div
        className={
          "d-flex gap-1 align-items-center position-absolute m-2 end-0 bottom-0"
        }
      >
        <MDBBtn
          disabled={quantity <= 0}
          color={"tertiary"}
          size={"sm"}
          floating
          outline
          onClick={() => setQuantity(quantity - 1)}
        >
          <MDBIcon fas size={"xl"} icon={"minus"}></MDBIcon>
        </MDBBtn>
        <h5 className={"mb-1"}>
          <MDBBadge color={"dark"}>{quantity} шт.</MDBBadge>
        </h5>
        <MDBBtn
          disabled={data.item_quantity <= quantity}
          color={"tertiary"}
          size={"sm"}
          floating
          outline
          onClick={() => setQuantity(quantity + 1)}
        >
          <MDBIcon fas size={"xl"} icon={"plus"}></MDBIcon>
        </MDBBtn>
      </div>
    </MDBCard>
  );
}
