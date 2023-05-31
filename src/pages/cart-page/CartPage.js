import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import ItemCard from "./content/ItemCard";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { cartSelectors, clearCart } from "./CartPageSlice";
import { bookItemsAction } from "./CartPageActions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { EmptyListPlaceholderBlock } from "../profile-page/content/items-management-tab/ItemsList";
import { redirect } from "../../utils/RedirectUtils";
import { paths } from "routePaths";
import { createErrorToast } from "../../models/ToastModel";

function CartPage() {
  const today = dayjs();

  const dispatch = useDispatch();
  const cart = useSelector(cartSelectors.selectAll);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today.add(2, "months"));

  const onClickBookItems = (data) => {
    const configuredData = data.map((i) => {
      return {
        item_id: i.item_id,
        quantity: i.quantity,
        datetime_from: startDate.format("YYYY-MM-DD"),
        datetime_to: endDate.format("YYYY-MM-DD"),
      };
    });
    dispatch(bookItemsAction({ items: configuredData } || null));
  };

  return (
    <MDBContainer className={"p-4"} fluid>
      <EmptyListPlaceholderBlock size={cart.length}>
        <MDBRow center>
          <MDBCol className={"d-flex flex-column gap-3"} md={"5"}>
            <MDBRow className={"sticky-top"}>
              <MDBCol>
                <MDBCard shadow={"0"}>
                  <MDBCardHeader className={"d-flex justify-content-between"}>
                    <MDBCardTitle className={"fs-2"}>Корзина</MDBCardTitle>
                    <MDBBtn
                      floating
                      outline
                      size={"lg"}
                      color={"danger"}
                      className={"float-end"}
                      onClick={() => {
                        dispatch(clearCart());
                        dispatch(redirect(paths.EQUIPMENT));
                      }}
                    >
                      <MDBIcon size={"lg"} far icon={"trash-alt"}></MDBIcon>
                    </MDBBtn>
                  </MDBCardHeader>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow className={"row-cols-1 d-grid gap-3"}>
              {cart.map((item) => {
                return (
                  <MDBCol key={item.item_id}>
                    <ItemCard item={item} />
                  </MDBCol>
                );
              })}
            </MDBRow>
          </MDBCol>
          <MDBCol md={"3"}>
            <div className={"d-grid gap-3 sticky-top"}>
              <MDBRow>
                <MDBCard className={"rounded-8"}>
                  <MDBCardHeader>
                    <MDBCardTitle className={"mb-0"}>
                      Период бронирования
                    </MDBCardTitle>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <MDBRow>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MDBCol>
                          <DatePicker
                            format={"DD/MM/YY"}
                            value={startDate}
                            onChange={(v) => setStartDate(v)}
                            disablePast
                          ></DatePicker>
                        </MDBCol>
                        <MDBCol>
                          <DatePicker
                            onError={(e) => {
                              if (e === "maxDate") {
                                createErrorToast(
                                  "Максимальный срок бронирования - 2 месяца"
                                );
                              }
                            }}
                            format={"DD/MM/YY"}
                            value={endDate}
                            onChange={(v) => setEndDate(v)}
                            maxDate={startDate.add(2, "months")}
                            disablePast
                          ></DatePicker>
                        </MDBCol>
                      </LocalizationProvider>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBRow>
              <MDBRow>
                <MDBCard className={"rounded-8"}>
                  <MDBCardHeader>
                    <MDBCardTitle className={"mb-0"}>Итого</MDBCardTitle>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <MDBRow className={"pb-3"}>
                      {cart.map((item) => (
                        <MDBCardText
                          className={"text-secondary"}
                          key={item.item_id}
                        >
                          {item.item_name}
                        </MDBCardText>
                      ))}
                    </MDBRow>
                    <MDBRow>
                      <MDBBtn
                        className={"rounded-8"}
                        color={"primary"}
                        size={"lg"}
                        onClick={() => onClickBookItems(cart)}
                      >
                        Забронировать
                      </MDBBtn>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBRow>
            </div>
          </MDBCol>
        </MDBRow>
      </EmptyListPlaceholderBlock>
    </MDBContainer>
  );
}

export default CartPage;
