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
import { getMyProfileAction } from "./ProfilePageActions";

function ProfileTab({ tabName, hidden, tabHref }) {
  return (
    <MDBRipple
      rippleTag={"a"}
      rippleColor={"light"}
      className={"hover-overlay"}
      href={`?tab=${tabHref}`}
      hidden={hidden}
    >
      <MDBCard background={"danger"} className={`h-100 p-5 text-white`}>
        <MDBCardTitle>{tabName}</MDBCardTitle>
      </MDBCard>
    </MDBRipple>
  );
}

function ProfilePage() {
  const dispatch = useDispatch();
  window.onload = () => {
    dispatch(getMyProfileAction());
  };
  const user = useSelector((state) => state.profilePage.user);
  console.log(user);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const activeTab = params.get("tab");

  return (
    <MDBContainer fluid>
      <MDBRow center>
        <MDBCol className={"ps-5 pt-5"} sm={"4"} md={"4"} lg={"3"}>
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
                          <label>{r.toUpperCase()}</label>
                        </MDBBadge>
                      );
                    })}
                  </span>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCard>
        </MDBCol>

        <MDBCol className={"pt-5 pe-5 pb-5"} sm={"6"} md={"6"} lg={"5"}>
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
              <MDBCol>
                <ProfileTab
                  hidden={!!activeTab}
                  tabName={"Личные данные"}
                  tabHref={"credits"}
                />
              </MDBCol>
              <MDBCol>
                <MDBRow>
                  <ProfileTab
                    hidden={!!activeTab}
                    tabName={"Забронированные предметы"}
                    tabHref={"items"}
                  />
                </MDBRow>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBTabsContent>
                <MDBTabsPane show={activeTab === "credits"}>
                  <UserDataChangeTab />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "items"}>
                  <ItemsManagementTab />
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
