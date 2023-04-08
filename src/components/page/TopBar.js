import {
  deleteAccessToken,
  deleteRefreshToken,
  deleteUserRoles,
  getAccessToken,
} from "../../api/Cookie";
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
import LoginModal from "pages/home-page/components/LoginModal";
import RegisterModal from "pages/home-page/components/RegisterModal";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { redirect } from "utils/BrowserUtils";

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
  const isLogged = !!getAccessToken();

  const logoutUser = () => {
    deleteAccessToken();
    deleteRefreshToken();
    deleteUserRoles();
    redirect("");
  };

  return (
    <>
      {isLogged && (
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
            <MDBDropdownItem link onClick={() => logoutUser()}>
              <h7 className={"text-danger"}>Выйти</h7>
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

  return (
    <header>
      <LoginModal isActive={loginModal} setIsActive={setLoginModal} />
      <RegisterModal isActive={registerModal} setIsActive={setRegisterModal} />
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
