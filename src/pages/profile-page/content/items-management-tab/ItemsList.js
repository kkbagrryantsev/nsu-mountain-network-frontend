import { useDispatch, useSelector } from "react-redux";
import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { MyBookedItemCard } from "./ItemCard";
import empty from "assets/png/profile-page/empty-box.png";
import {
  myBookedItemsSelectors,
  myRequestedItemsSelectors,
  myTakenItemsSelectors,
} from "../../ProfilePageSlice";
import groupBy from "core-js/actual/array/group-by";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import "dayjs/locale/ru";
import { unbookItemsAction } from "../../ProfilePageActions";

dayjs.extend(calendar);

export function EmptyListPlaceholderBlock({ size, children }) {
  let block;
  if (size === 0) {
    block = (
      <MDBRow>
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

export function BookedItemsGroupByDate(props) {
  const dispatch = useDispatch();

  const date = dayjs(props.date);

  const onClickUnbookGroup = () => {
    dispatch(unbookItemsAction(props.items));
  };

  return (
    <MDBCard>
      <MDBCardHeader
        className={"p-3 d-flex align-items-center justify-content-between"}
      >
        <MDBCardTitle>
          Until{" "}
          {date.calendar(dayjs(), {
            sameElse: "DD.MM.YYYY",
          })}
        </MDBCardTitle>
        <MDBBtn
          onClick={() => onClickUnbookGroup()}
          color={"danger"}
          outline
          size={"sm"}
        >
          Отменить
        </MDBBtn>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBRow className={"row-cols-1 d-grid gap-3"}>
          {props.items.map((item) => (
            <MyBookedItemCard key={item.item_id} bookingData={item} />
          ))}
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export function MyRequestedItemsList() {
  const items = useSelector(myRequestedItemsSelectors.selectAll);

  return (
    <MDBContainer>
      <EmptyListPlaceholderBlock size={items.length}>
        {items.map((i) => (
          <MyBookedItemCard item={i} key={i.item_id} />
        ))}
      </EmptyListPlaceholderBlock>
    </MDBContainer>
  );
}

export function MyTakenItemsList() {
  const items = useSelector(myTakenItemsSelectors.selectAll);

  return (
    <MDBContainer>
      <EmptyListPlaceholderBlock size={items.length}>
        {items.map((i) => (
          <MyBookedItemCard item={i} key={i.item_id} />
        ))}
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
              <MDBCol className={"pt-2 pb-3"} key={key}>
                <BookedItemsGroupByDate date={Date.parse(key)} items={value} />
              </MDBCol>
            );
          })}
        </MDBRow>
      </EmptyListPlaceholderBlock>
    </MDBContainer>
  );
}
