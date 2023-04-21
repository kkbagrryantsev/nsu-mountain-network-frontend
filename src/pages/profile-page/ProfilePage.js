import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRipple,
  MDBRow,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import UserDataChangeTab from "./content/UserDataChangeTab";
import ItemsManagementTab from "./content/items-management-tab/ItemsManagementTab";
import BookingRequestTab from "./content/booking-requests/BookingRequestTab";
import { fetchUserData } from "../home-page/HomePageActions";

function ProfileTab({ tabName, tabHref, haveToHide }) {
  return (
    <MDBRipple
      hidden = {haveToHide}
      rippleTag={"div"}
      rippleColor={"light"}
      className={"hover-overlay"}
    >
      <a href={`?tab=${tabHref}`}>
        <MDBCard background={"danger"} className={"p-5 text-white"}>
          <MDBCardTitle>{tabName}</MDBCardTitle>
        </MDBCard>
      </a>
    </MDBRipple>
  );
}

function ProfilePage() {
  const dispatch = useDispatch();
  window.onload = () => {
    dispatch(fetchUserData());
  };
  const user = useSelector((state) => state.profilePage.user);
  console.log(user);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const activeTab = params.get("tab");

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol className={"p-5"} sm={"5"} md={"4"} lg={"3"}>
          <MDBCard>
            <MDBContainer>
              <MDBRow className={"p-3"}>
                <MDBCol className={"d-flex justify-content-center"}>
                  <MDBIcon
                    fas
                    size={"8x"}
                    color={"info"}
                    icon="user-astronaut"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className={"d-flex justify-content-center"}>
                  <h5>{user.user_name}</h5>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className={"d-flex justify-content-center p-3"}>
                  <span className={"d-flex flex-wrap gap-2"}>
                    {user.user_roles.split(", ").map((r, index) => {
                      return (
                        <MDBBadge color={"dark"} key={index}>
                          <h7>{r.toUpperCase()}</h7>
                        </MDBBadge>
                      );
                    })}
                  </span>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className={"d-flex justify-content-center"}>
                  <h5>Ваш баланс: {user.user_money}</h5>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCard>
        </MDBCol>
        <MDBCol className={"p-5"} sm={"6"} lg={"9"}>
          <MDBCard className={"p-3"}>
            <MDBRow>
              <MDBCol md={"5"}>
                <a href={window.location.pathname}>
                  <MDBBtn
                    hidden={!activeTab}
                    size={"sm"}
                    className={"p-2"}
                    color={"tertiary"}
                  >
                    <MDBIcon
                      className={"me-2"}
                      size={"lg"}
                      fas
                      icon="arrow-left"
                    />
                    Назад
                  </MDBBtn>
                </a>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              {!!!activeTab && (
                <span className={"d-flex gap-3 flex-wrap"} hidden={!!activeTab}>
                  <ProfileTab tabName={"Личные данные"} tabHref={"credits"} haveToHide={false}/>
                  <ProfileTab tabName={"Заявки на бронирование"} tabHref={"requests"} haveToHide = {!(user.user_roles === "warehouseman")} />
                  <ProfileTab
                    tabName={"Забронированные предметы"}
                    tabHref={"items"}
                    haveToHide={false}
                  />
                </span>
              )}

              <MDBTabsContent>
                <MDBTabsPane show={activeTab === "credits"}>
                  <UserDataChangeTab />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "items"}>
                  <ItemsManagementTab />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "requests"}>
                  <BookingRequestTab />
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ProfilePage;

/*<BookingRequestTab />       */