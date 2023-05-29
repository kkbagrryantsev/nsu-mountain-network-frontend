import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import UserDataChangeTab from "./content/UserDataChangeTab";
import ItemsManagementTab from "./content/items-management-tab/ItemsManagementTab";
import { getMyProfileAction } from "./ProfilePageActions";
import Sections from "./content/sections/Sections";
import profilePic from "assets/png/profile-page/grinning-cat.png";
import LoadingStateBlock from "../../components/loading-state-block/LoadingStateBlock";
import TreasurerPageTab from "./content/treasurer-options/TreasurerPageTab"

function ProfilePage() {
  const dispatch = useDispatch();
  window.onload = () => {
    dispatch(getMyProfileAction());
  };
  const loading = useSelector((state) => state.profilePage.user.loading);
  const user = useSelector((state) => state.profilePage.user.value);
  const search = window.location.search;
  const params = new URLSearchParams(search);

  return (
    <LoadingStateBlock loadingState={loading}>
      <MDBContainer fluid>
        <MDBRow center>
          <MDBCol className={"ps-5 pt-5"} sm={"4"} md={"4"} lg={"3"}>
            <MDBCard>
              <MDBContainer>
                <MDBRow className={"p-3"}>
                  <MDBCol className={"d-flex justify-content-center"}>
                    <img src={profilePic} alt={"profilePic"} />
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
                      {user.user_roles?.split(", ").map((r, index) => {
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

          <MDBCol className={"pt-5 pe-5 pb-5"} md={"6"}>
            <MDBCard className={"p-3"}>
              <MDBRow>
                <MDBCol md={"5"}>
                  <a href={window.location.pathname}>
                    <MDBBtn
                      hidden={!params.has("tab")}
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

              <Sections />

              <MDBRow>
                <MDBTabsContent>
                  <MDBTabsPane show={params.get("tab") === "credits"}>
                    <UserDataChangeTab />
                  </MDBTabsPane>
                  <MDBTabsPane show={params.get("tab") === "items"}>
                    <ItemsManagementTab />
                  </MDBTabsPane>
                  <MDBTabsPane show={params.get("tab") === "treasurer"}>
                     <TreasurerPageTab />
                  </MDBTabsPane>
                </MDBTabsContent>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </LoadingStateBlock>
  );
}

export default ProfilePage;
