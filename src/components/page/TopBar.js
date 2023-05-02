import { deleteAccessToken, deleteUserRoles, getAccessToken } from "api/Cookie";
import {
  MDBBadge,
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import logo from "assets/logo.png";
import { paths } from "routePaths";
import { useState } from "react";
import SignInDialog from "../../pages/home-page/components/sign-in/SignInDialog";
import SignUpDialog from "../../pages/home-page/components/sign-up/SignUpDialog";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { redirect } from "../../utils/RedirectUtils";
import { getMyProfileAction } from "pages/profile-page/ProfilePageActions";
import items from "assets/png/profile-page/items.jpg";
import money from "assets/png/main-page/money2.svg";
import "./styles/HelveticText.css";

function Cart({ className }) {
  const isLogged = !!getAccessToken();
  const cartLength = useSelector((state) => state.storagePage.cart.length);
  return (
    <MDBBtn
      hidden={!isLogged || cartLength === 0}
      className={`${className} overflow-visible me-3`}
      color="tertiary"
    >
      <NavLink to={`${window.location.origin}/${paths.CART}`}>
        <MDBIcon fas size={"xl"} icon={"shopping-cart"}></MDBIcon>
        <MDBBadge
          pill
          color={"danger"}
          className="position-absolute translate-middle-x"
        >
          {cartLength}
        </MDBBadge>
      </NavLink>
    </MDBBtn>
  );
}

function ProfileDropdownMenu() {
  const dispatch = useDispatch();
  const isLogged = !!getAccessToken();

  const logoutUser = () => {
    deleteAccessToken();
    deleteUserRoles();
    //localStorage.clear();
    dispatch(redirect(paths.INDEX));
  };

  return (
    <>
      {isLogged 
      && (
        <MDBDropdown className={"d-none d-sm-block"}>
          <MDBDropdownToggle outline>
            <MDBIcon far size={"xl"} icon={"user"} />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem
              link
              href={`${window.location.origin}/${paths.PROFILE}`}
            >
              Профиль
            </MDBDropdownItem>
            <MDBDropdownItem link>Настройки</MDBDropdownItem>
            <MDBDropdownItem divider />
            <MDBDropdownItem
              className={"text-danger"}
              link
              onClick={() => logoutUser()}
              //onClick={() => deleteAccessToken()}
            >
              <span className={"text-danger"} >Выйти</span>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      )}
    </>
  );
}

function TopBar() {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const isLogged = !!getAccessToken();
  const [showBasic, setShowBasic] = useState(false);

  const dispatch = useDispatch();
  window.onload = () => {
    dispatch(getMyProfileAction());
  };
  const user = useSelector((state) => state.profilePage.user);

  return (
    <header>
      <SignInDialog isActive={loginModal} setIsActive={setLoginModal} />
      <SignUpDialog isActive={registerModal} setIsActive={setRegisterModal} />
      <MDBNavbar expand={"sm"} light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href={window.location.origin}>
            <img src={logo} height="35px" alt="" />
          </MDBNavbarBrand>
          <Cart className={"d-sm-none"} />
          <MDBNavbarToggler
            aria-expanded="false"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink href={window.location.origin}>
                  Главная
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  hidden={!isLogged}
                  href={`${window.location.origin}/${paths.EQUIPMENT}`}
                >
                  Снаряжение
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  hidden={!isLogged}
                  href={`${window.location.origin}/${paths.EXPEDITIONS}`}
                >
                  Походы
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem className={"d-sm-none"}>
                <MDBNavbarLink
                  hidden={isLogged}
                  onClick={() => setRegisterModal(!registerModal)}
                >
                  Зарегистрироваться
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className={"d-sm-none"}>
                <MDBNavbarLink
                  hidden={isLogged}
                  onClick={() => setLoginModal(!loginModal)}
                >
                  <MDBIcon className={"me-2"} fas icon={"sign-in-alt"} />
                  Войти
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <div class="d-inline-flex position-relative" hidden={!(isLogged)} style={{marginRight: "1%"}}>            
            <img class="rounded-5 shadow-4" src={items} alt="Avatar" style={{width: "98px", height: "35px"}}></img>
            <div class="rounded-5 mask text-light d-flex justify-content-center flex-column text-center" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
                  </div>
                  <div class="mask text-light d-flex flex-column text-center" style={{justifyContent: "space-between"}}>
                    <h5 className="helvetic-text" style={{position: "absolute", marginLeft: "10%", marginTop: "5%", }}>{"50" + user.user_money}</h5> 
                  </div> 
                  
            </div>
            <img class="icon" src={money} alt="Money" style={{width: "48px", height: "48px", position: "absolute", marginLeft: "84.6%", marginBottom: "0.5%"}}></img>

            <span className={"d-none d-sm-flex flex-row"}>
              <Cart />
              <ProfileDropdownMenu />
              <MDBBtn
                className={"me-2"}
                rounded
                hidden={isLogged}
                onClick={() => setRegisterModal(!registerModal)}
              >
                Зарегистрироваться
              </MDBBtn>
              <MDBBtn
                rounded
                hidden={isLogged}
                onClick={() => setLoginModal(!loginModal)}
                outline
              >
                Войти
              </MDBBtn>
            </span>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}

export default TopBar;
