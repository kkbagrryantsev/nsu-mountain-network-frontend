import { useDispatch, useSelector } from "react-redux";
import {
  bookedRequestsSelectors,
  requestedRequestsSelectors,
  takenRequestsSelectors,
} from "./RequestsManagementTabSlice";
import groupBy from "core-js/actual/array/group-by";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBRipple,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { EmptyListPlaceholderBlock } from "../items-management-tab/ItemsList";
import { useEffect, useState } from "react";
import { apiGetUserData } from "api/models/ApiCalls";
import cat from "assets/png/profile-page/grinning-cat.png";
import dayjs from "dayjs";
import {
  approveBookRequestsAction,
  fulfillBookRequestAction,
  rejectBookRequestsAction,
  returnBookedItemsAction,
} from "./RequestsManagementTabActions";
import { BookedItemCard, RequestedItemCard, TakenItemCard } from "./ItemCard";

export function RequestedItemsList() {
  const requests = useSelector(requestedRequestsSelectors.selectAll);

  const requestGroups = Object.entries(
    groupBy(requests, (request) => {
      return (
        request.user_id.toString() +
        request.use_datetime.toString() +
        request.until_datetime.toString()
      );
    })
  );

  return (
    <MDBContainer className={"px-2"}>
      <EmptyListPlaceholderBlock size={requests.length}>
        <MDBRow className={"row-cols-1 row-cols-xxl-2"}>
          {requestGroups.map(([key, value]) => {
            return (
              <MDBCol className={"p-2"} key={key}>
                <RequestedItemsGroup data={value} />
              </MDBCol>
            );
          })}
        </MDBRow>
      </EmptyListPlaceholderBlock>
    </MDBContainer>
  );
}

export function BookedItemsList() {
  const requests = useSelector(bookedRequestsSelectors.selectAll);

  const requestGroups = Object.entries(
    groupBy(requests, (request) => {
      return (
        request.user_id.toString() +
        request.use_datetime.toString() +
        request.until_datetime.toString()
      );
    })
  );

  return (
    <MDBContainer className={"px-2"}>
      <EmptyListPlaceholderBlock size={requests.length}>
        <MDBRow className={"row-cols-1"}>
          {requestGroups.map(([key, value]) => {
            return (
              <MDBCol className={"p-2"} key={key}>
                <BookedItemsGroup data={value} />
              </MDBCol>
            );
          })}
        </MDBRow>
      </EmptyListPlaceholderBlock>
    </MDBContainer>
  );
}

export function TakenItemsList() {
  const requests = useSelector(takenRequestsSelectors.selectAll);

  const requestGroups = Object.entries(
    groupBy(requests, (request) => {
      return (
        request.user_id.toString() +
        request.use_datetime.toString() +
        request.until_datetime.toString()
      );
    })
  );

  return (
    <MDBContainer className={"px-2"}>
      <EmptyListPlaceholderBlock size={requests.length}>
        <MDBRow className={"row-cols-1"}>
          {requestGroups.map(([key, value]) => {
            return (
              <MDBCol className={"p-2"} key={key}>
                <TakenItemsGroup data={value} />
              </MDBCol>
            );
          })}
        </MDBRow>
      </EmptyListPlaceholderBlock>
    </MDBContainer>
  );
}

function BookedItemsGroup(props) {
  const dispatch = useDispatch();
  let data = props.data;
  const user_id = data[0].user_id;
  const [username, setUsername] = useState(user_id.toString());

  useEffect(() => {
    apiGetUserData(user_id).then((r) => {
      if (r.status === 200) {
        setUsername(r.data.user.user_name);
      }
    });
  }, []);

  const onClickGiveGroup = () => {
    dispatch(fulfillBookRequestAction(data.map((i) => i.use_id)));
  };

  const from_date = dayjs(data[0].use_datetime);
  const to_date = dayjs(data[0].until_datetime);

  return (
    <>
      <MDBCard className={"rounded-8"}>
        <MDBCardBody className={"d-flex flex-column gap-2 p-3"}>
          <div className={"d-flex align-items-center gap-2 position-relative"}>
            <img style={{ height: "75px" }} src={cat} alt={"profile-pic"} />
            <div>
              <h5 className={"mb-1"}>{username}</h5>
              <p className={"m-0"}>
                Создана:{" "}
                <MDBBadge color={"info"}>
                  {from_date.format("DD MMMM YYYY")}
                </MDBBadge>
              </p>
              <p className={"m-0"}>
                Истекает:{" "}
                <MDBBadge color={"info"}>
                  {to_date.format("DD MMMM YYYY")}
                </MDBBadge>
              </p>
            </div>

            <div>
              <MDBBtn
                className={
                  "border border-0 bg-success bg-opacity-10 position-absolute top-0 end-0 rounded-5 text-truncate"
                }
                onClick={() => onClickGiveGroup()}
                color={"success"}
                outline
                style={{ zIndex: 1 }}
              >
                Выдать все
                <MDBIcon
                  className={"ms-2"}
                  size={"lg"}
                  fas
                  icon={"hand-holding-heart"}
                ></MDBIcon>
              </MDBBtn>
            </div>
          </div>
          <MDBRow>
            <MDBAccordion
              className={"p-3 pb-0"}
              style={{ height: "auto" }}
              borderless
            >
              <MDBAccordionItem
                btnClassName={"btn-sm"}
                bodyClassName={"p-3"}
                headerTitle={
                  <>
                    <MDBIcon
                      size={"xl"}
                      className={"me-2"}
                      fas
                      icon={"boxes"}
                    />
                    <h6 className={"mb-1"}>Предметы</h6>
                  </>
                }
                collapseId={1}
              >
                <MDBRow className={"row-cols-1 row-cols-xxl-2 d-grid gap-2"}>
                  {data.map((item) => (
                    <BookedItemCard key={item.use_id} data={item} />
                  ))}
                </MDBRow>
              </MDBAccordionItem>
            </MDBAccordion>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}

function TakenItemsGroup(props) {
  const dispatch = useDispatch();
  let data = props.data;
  const user_id = data[0].user_id;
  const [username, setUsername] = useState(user_id.toString());

  useEffect(() => {
    apiGetUserData(user_id).then((r) => {
      if (r.status === 200) {
        setUsername(r.data.user.user_name);
      }
    });
  }, []);

  const onClickReturnGroup = () => {
    dispatch(returnBookedItemsAction(data));
  };

  const from_date = dayjs(data[0].use_datetime);
  const to_date = dayjs(data[0].until_datetime);

  return (
    <>
      <MDBCard className={"rounded-8"}>
        <MDBCardBody className={"d-flex flex-column gap-2 pt-3 pb-3"}>
          <div className={"d-flex align-items-center gap-2 position-relative"}>
            <img style={{ height: "75px" }} src={cat} alt={"profile-pic"} />
            <div>
              <h5 className={"mb-1"}>{username}</h5>
              <p className={"m-0"}>
                Создана:{" "}
                <MDBBadge color={"info"}>
                  {from_date.format("DD MMMM YYYY")}
                </MDBBadge>
              </p>
              <p className={"m-0"}>
                Истекает:{" "}
                <MDBBadge color={"info"}>
                  {to_date.format("DD MMMM YYYY")}
                </MDBBadge>
              </p>
            </div>

            <div>
              <MDBBtn
                className={
                  "border border-0 bg-warning bg-opacity-10 position-absolute top-0 end-0 rounded-5 text-truncate"
                }
                onClick={() => onClickReturnGroup()}
                color={"warning"}
                outline
                style={{ zIndex: 1 }}
              >
                Вернуть все
                <MDBIcon
                  className={"ms-2"}
                  size={"lg"}
                  fas
                  icon={"box"}
                ></MDBIcon>
              </MDBBtn>
            </div>
          </div>
          <MDBRow>
            <MDBAccordion
              className={"p-0"}
              style={{ height: "auto" }}
              borderless
            >
              <MDBAccordionItem
                btnClassName={"btn-sm"}
                bodyClassName={"p-3"}
                headerTitle={
                  <>
                    <MDBIcon
                      size={"xl"}
                      className={"me-2"}
                      fas
                      icon={"boxes"}
                    />
                    <h6 className={"mb-1"}>Предметы</h6>
                  </>
                }
                collapseId={1}
              >
                <MDBRow className={"row-cols-1 d-grid gap-2"}>
                  {data.map((item) => (
                    <TakenItemCard key={item.use_id} data={item} />
                  ))}
                </MDBRow>
              </MDBAccordionItem>
            </MDBAccordion>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}

function RequestedItemsGroup(props) {
  let data = props.data;
  const user_id = data[0].user_id;
  const [username, setUsername] = useState(user_id.toString());

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    apiGetUserData(user_id).then((r) => {
      if (r.status === 200) {
        setUsername(r.data.user.user_name);
      }
    });
  }, []);

  const from_date = dayjs(data[0].use_datetime);
  const to_date = dayjs(data[0].until_datetime);

  return (
    <>
      <RequestModal show={isActive} setShow={setIsActive} data={data} />
      <MDBCard className={"rounded-8"}>
        <MDBRipple
          className={"hover-overlay rounded-8"}
          style={{ cursor: "pointer" }}
          rippleTag={"div"}
          onClick={() => setIsActive(true)}
        >
          <MDBCardBody>
            <MDBRow>
              <MDBCol md={"3"}>
                <img style={{ width: "70px" }} src={cat} alt={"profile-pic"} />
              </MDBCol>
              <MDBCol md={"9"}>
                <h5>{username}</h5>
                <p className={"m-0"}>
                  Создана:{" "}
                  <MDBBadge color={"info"}>
                    {from_date.format("DD MMMM YYYY")}
                  </MDBBadge>
                </p>
                <p className={"m-0"}>
                  Истекает:{" "}
                  <MDBBadge color={"info"}>
                    {to_date.format("DD MMMM YYYY")}
                  </MDBBadge>
                </p>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
          <div
            className="mask"
            style={{ backgroundColor: "rgba(251, 251, 251, 0.3)" }}
          ></div>
        </MDBRipple>
      </MDBCard>
    </>
  );
}

export function RequestModal(props) {
  const dispatch = useDispatch();
  const data = props.data;
  const [username, setUsername] = useState(data[0].user_id.toString());

  useEffect(() => {
    apiGetUserData(data[0].user_id).then((r) => {
      if (r.status === 200) {
        setUsername(r.data.user.user_name);
      }
    });
  }, []);

  const onApproved = () => {
    const ids = data.map((r) => r.use_id);
    dispatch(approveBookRequestsAction({ ids: ids, description: "Y" }));
    props.setShow(false);
  };

  const onRejected = () => {
    const ids = data.map((r) => r.use_id);
    dispatch(rejectBookRequestsAction({ ids: ids, description: "Y" }));
    props.setShow(false);
  };

  const from_date = dayjs(data[0].use_datetime);
  const to_date = dayjs(data[0].until_datetime);

  return (
    <MDBModal
      className={"modal"}
      show={props.show}
      setShow={props.setShow}
      tabIndex="-1"
    >
      <MDBModalDialog size={"lg"}>
        <MDBModalContent className={"rounded-8"}>
          <MDBModalHeader>
            <div className={"d-flex gap-3"}>
              <img style={{ height: "80px" }} src={cat} alt={"profile-pic"} />
              <div>
                <h5 className={"m-0"}>{username}</h5>
                <p className={"m-0"}>
                  Создана:{" "}
                  <MDBBadge color={"info"}>
                    {from_date.format("DD MMMM YYYY")}
                  </MDBBadge>
                </p>
                <p className={"m-0"}>
                  Истекает:{" "}
                  <MDBBadge color={"info"}>
                    {to_date.format("DD MMMM YYYY")}
                  </MDBBadge>
                </p>
              </div>
            </div>
            <div className={"d-flex flex-column gap-2"}>
              <MDBBtn onClick={() => onApproved()} outline color={"success"}>
                Подтвердить
                <MDBIcon
                  className={"ms-2"}
                  size={"xl"}
                  fas
                  icon={"check"}
                ></MDBIcon>
              </MDBBtn>
              <MDBBtn onClick={() => onRejected()} outline color={"danger"}>
                Отклонить
                <MDBIcon
                  className={"ms-2"}
                  size={"xl"}
                  fas
                  icon={"times"}
                ></MDBIcon>
              </MDBBtn>
            </div>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol className={"d-grid gap-2"} sm={"12"} md={"8"}>
                {data.map((item) => (
                  <RequestedItemCard data={item} key={item.item_id} />
                ))}
              </MDBCol>
              <MDBCol>
                <div className={"d-flex flex-column gap-2"}>
                  <MDBTextArea
                    style={{ resize: "none" }}
                    rows={4}
                    cols={2}
                  ></MDBTextArea>
                  <MDBBtn
                    className={"rounded-5"}
                    outline
                    size={"sm"}
                    color={"secondary"}
                  >
                    <MDBIcon
                      className={"me-2"}
                      fas
                      size={"lg"}
                      icon={"message"}
                    />
                    Оставить сообщение
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
