import { useDispatch, useSelector } from "react-redux";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import {
  MyBookedItemCard,
  MyRequestedItemCard,
  MyTakenItemCard,
} from "./ItemCard";
import empty from "assets/png/profile-page/empty-box.png";
import groupBy from "core-js/actual/array/group-by";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ru";
import {
  myBookedItemsSelectors,
  myRequestedItemsSelectors,
  myTakenItemsSelectors,
  removeMyItemsByTypeById,
} from "./ItemsManagementTabSlice";
import { unbookItemsAction } from "./ItemsManagementTabActions";

dayjs.extend(updateLocale);
dayjs.locale("ru");
dayjs.updateLocale("ru", {
  calendar: {
    lastDay: "[Вчера]",
    sameDay: "[Сегодня]",
    nextDay: "[Завтра]",
    lastWeek: "[В] dddd D MMMM",
    nextWeek: "[В] dddd D MMMM",
    sameElse: "L",
  },
});
dayjs.extend(calendar);

export function EmptyListPlaceholderBlock({ size, children }) {
  let block;
  if (size === 0) {
    block = (
      <MDBRow center className={"d-flex align-items-center h-100"}>
        <MDBBadge color={"transparent"}>
          <img src={empty} alt={"Пусто"} />
          <h4 className={"text-secondary"}>Пусто</h4>
        </MDBBadge>
      </MDBRow>
    );
  } else {
    block = children;
  }
  return <>{block}</>;
}

export function TakenItemsGroupByDate(props) {
  const date = dayjs(props.date);
  const today = dayjs();

  return (
    <MDBCard className={"rounded-8"}>
      <div className={"bg-image rounded-8"}>
        <MDBCardHeader
          className={"d-flex align-items-center justify-content-between p-3"}
        >
          <MDBCardTitle className={"fs-5 mb-0"}>
            Истекает {date.calendar(dayjs()).toLocaleLowerCase()}
            <div hidden={!date.isBefore(today)}>
              <MDBBadge color={"warning"}>Просрочена</MDBBadge>
            </div>
          </MDBCardTitle>
        </MDBCardHeader>
        <MDBCardBody className={"p-2"}>
          <MDBAccordion style={{ height: "auto" }} borderless>
            <MDBAccordionItem
              btnClassName={"btn-sm"}
              bodyClassName={"p-3"}
              headerTitle={
                <>
                  <MDBIcon size={"xl"} className={"me-2"} fas icon={"boxes"} />
                  <h6 className={"mb-1"}>Предметы</h6>
                </>
              }
              collapseId={1}
            >
              <MDBRow className={"row-cols-1 d-grid gap-2"}>
                {props.items.map((item) => (
                  <MyTakenItemCard key={item.item_id} bookingData={item} />
                ))}
              </MDBRow>
            </MDBAccordionItem>
          </MDBAccordion>
        </MDBCardBody>
        <div
          hidden={!date.isBefore(today)}
          className={"mask rounded-8"}
          style={{ backgroundColor: "rgba(0,0,0,0.07)" }}
        ></div>
      </div>
    </MDBCard>
  );
}

export function RequestedItemsGroupByDate(props) {
  const dispatch = useDispatch();

  const date = dayjs(props.date);
  const today = dayjs();

  const onClickUnbookGroup = () => {
    dispatch(unbookItemsAction(props.items));
    dispatch(
      removeMyItemsByTypeById({
        type: "requested",
        data: props.items.map((i) => i.item_id),
      })
    );
  };

  return (
    <MDBCard className={"rounded-8"}>
      <div className={"bg-image rounded-8"}>
        <MDBCardHeader
          className={"d-flex align-items-center justify-content-between p-3"}
        >
          <MDBCardTitle className={"mb-0"}>
            Истекает {date.calendar(dayjs()).toLocaleLowerCase()}
            <div hidden={!date.isBefore(today)}>
              <MDBBadge color={"warning"}>Просрочена</MDBBadge>
            </div>
          </MDBCardTitle>
          <MDBBtn
            className={"rounded-5 text-truncate"}
            onClick={() => onClickUnbookGroup()}
            color={"danger"}
            outline
            size={"sm"}
            style={{ zIndex: 1 }}
          >
            Отменить
          </MDBBtn>
        </MDBCardHeader>
        <MDBCardBody className={"p-2"}>
          <MDBAccordion style={{ height: "auto" }} borderless>
            <MDBAccordionItem
              btnClassName={"btn-sm"}
              bodyClassName={"p-3"}
              headerTitle={
                <>
                  <MDBIcon size={"xl"} className={"me-2"} fas icon={"boxes"} />
                  <h6 className={"mb-1"}>Предметы</h6>
                </>
              }
              collapseId={1}
            >
              <MDBRow className={"row-cols-1 d-grid gap-2"}>
                {props.items.map((item) => (
                  <MyRequestedItemCard key={item.item_id} bookingData={item} />
                ))}
              </MDBRow>
            </MDBAccordionItem>
          </MDBAccordion>
        </MDBCardBody>
        <div
          hidden={!date.isBefore(today)}
          className={"mask rounded-8"}
          style={{ backgroundColor: "rgba(0,0,0,0.07)" }}
        ></div>
      </div>
    </MDBCard>
  );
}

export function BookedItemsGroupByDate(props) {
  const dispatch = useDispatch();

  let date = dayjs(props.date);
  const today = dayjs();

  const onClickUnbookGroup = () => {
    dispatch(unbookItemsAction(props.items));
    dispatch(
      removeMyItemsByTypeById({
        type: "booked",
        data: props.items.map((i) => i.item_id),
      })
    );
  };

  return (
    <MDBCard className={"rounded-8"}>
      <div className={"bg-image rounded-8"}>
        <MDBCardHeader
          className={"d-flex align-items-center justify-content-between p-3"}
        >
          <MDBCardTitle className={"fs-5 mb-0"}>
            Истекает {date.calendar(dayjs()).toLocaleLowerCase()}
            <div hidden={!date.isBefore(today)}>
              <MDBBadge color={"warning"}>Просрочена</MDBBadge>
            </div>
          </MDBCardTitle>
          <MDBBtn
            className={"rounded-5 text-truncate"}
            onClick={() => onClickUnbookGroup()}
            color={"danger"}
            outline
            size={"sm"}
            style={{ zIndex: 1 }}
          >
            Отменить
          </MDBBtn>
        </MDBCardHeader>
        <MDBCardBody className={"p-2"}>
          <MDBAccordion style={{ height: "auto" }} borderless>
            <MDBAccordionItem
              btnClassName={"btn-sm"}
              bodyClassName={"p-3"}
              headerTitle={
                <>
                  <MDBIcon size={"xl"} className={"me-2"} fas icon={"boxes"} />
                  <h6 className={"mb-1"}>Предметы</h6>
                </>
              }
              collapseId={1}
            >
              <MDBRow className={"row-cols-1 d-grid gap-2"}>
                {props.items.map((item) => (
                  <MyBookedItemCard key={item.item_id} bookingData={item} />
                ))}
              </MDBRow>
            </MDBAccordionItem>
          </MDBAccordion>
        </MDBCardBody>
        <div
          hidden={!date.isBefore(today)}
          className={"mask rounded-8"}
          style={{ backgroundColor: "rgba(0,0,0,0.07)" }}
        ></div>
      </div>
    </MDBCard>
  );
}

export function MyRequestedItemsList() {
  const items = useSelector(myRequestedItemsSelectors.selectAll);

  const dateTimeGroups = Object.entries(
    groupBy(items, (item) => {
      return item.until_datetime;
    })
  ).sort(function (a, b) {
    return Date.parse(a[0]) >= Date.parse(b[0]) ? 1 : -1;
  });

  return (
    <MDBContainer className={"pb-2"}>
      <EmptyListPlaceholderBlock size={items.length}>
        <MDBRow className={"row-cols-1 row-cols-xxl-2"}>
          {dateTimeGroups.map(([key, value]) => {
            return (
              <MDBCol className={"pt-2 pb-3"} key={key}>
                <RequestedItemsGroupByDate
                  date={Date.parse(key)}
                  items={value}
                />
              </MDBCol>
            );
          })}
        </MDBRow>
      </EmptyListPlaceholderBlock>
    </MDBContainer>
  );
}

export function MyTakenItemsList() {
  const items = useSelector(myTakenItemsSelectors.selectAll);

  const dateTimeGroups = Object.entries(
    groupBy(items, (item) => {
      return item.until_datetime;
    })
  ).sort(function (a, b) {
    return Date.parse(a[0]) >= Date.parse(b[0]) ? 1 : -1;
  });

  return (
    <MDBContainer className={"pb-2"}>
      <EmptyListPlaceholderBlock size={items.length}>
        <MDBRow className={"row-cols-1 row-cols-xxl-2"}>
          {dateTimeGroups.map(([key, value]) => {
            return (
              <MDBCol className={"pt-2 pb-3"} key={key}>
                <TakenItemsGroupByDate date={Date.parse(key)} items={value} />
              </MDBCol>
            );
          })}
        </MDBRow>
      </EmptyListPlaceholderBlock>
    </MDBContainer>
  );
}

export function MyBookedItemsList() {
  const items = useSelector(myBookedItemsSelectors.selectAll);

  const dateTimeGroups = Object.entries(
    groupBy(items, (item) => {
      return item.until_datetime;
    })
  ).sort(function (a, b) {
    return Date.parse(a[0]) >= Date.parse(b[0]) ? 1 : -1;
  });

  return (
    <MDBContainer className={"pb-2"}>
      <EmptyListPlaceholderBlock size={items.length}>
        <MDBRow className={"row-cols-1 row-cols-xxl-2"}>
          {dateTimeGroups.map(([key, value]) => {
            return (
              <MDBCol className={"pt-0 pb-3"} key={key}>
                <BookedItemsGroupByDate date={Date.parse(key)} items={value} />
              </MDBCol>
            );
          })}
        </MDBRow>
      </EmptyListPlaceholderBlock>
    </MDBContainer>
  );
}
