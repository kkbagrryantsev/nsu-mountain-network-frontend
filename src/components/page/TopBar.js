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
import { useEffect, useState } from "react";
import SignInDialog from "../../pages/home-page/components/sign-in/SignInDialog";
import SignUpDialog from "../../pages/home-page/components/sign-up/SignUpDialog";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { redirect } from "../../utils/RedirectUtils";
import { getMyProfileAction } from "pages/profile-page/ProfilePageActions";
import coins from "assets/png/misc/money.png";
import { cartSelectors, clearCart } from "../../pages/cart-page/CartPageSlice";
import LoadingState from "../../enums/LoadingState";
import balanceBageImage from "assets/png/misc/balance.jpg";

function BalanceBadge() {
  const isLogged = !!getAccessToken();

  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogged) {
      dispatch(getMyProfileAction());
    }
  }, []);
  const user = useSelector((state) => state.profilePage.user);

  let loadingClass = "";
  if (user.loading === LoadingState.LOADING) {
    loadingClass = "placeholder";
  }

  return (
    <h5 hidden={!isLogged} className={"mb-0"}>
      <MDBBadge
        className={`d-flex align-items-center gap-1 ${loadingClass}`}
        pill
        color={"secondary"}
        style={{backgroundImage: `url(${balanceBageImage})`, backgroundBlendMode: "exclusion"}}
      >
        {user.value.user_money}
        <img src={coins} alt="Баланс"></img>
      </MDBBadge>
    </h5>
  );
}

function Cart({ className }) {
  const isLogged = !!getAccessToken();
  const cartLength = useSelector(cartSelectors.selectTotal);
  return (
    <MDBBtn
      hidden={!isLogged || cartLength === 0}
      className={`${className} overflow-visible me-2`}
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
    dispatch(clearCart());
    dispatch(redirect(paths.INDEX));
  };

  return (
    <>
      {isLogged && (
        <MDBDropdown className={"d-none d-sm-block"}>
          <MDBDropdownToggle outline>
            <MDBIcon far size={"xl"} icon={"user"} />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link href={`${paths.PROFILE}`}>
              Профиль
            </MDBDropdownItem>
            <MDBDropdownItem divider />
            <MDBDropdownItem link href={`${paths.PROFILE}?tab=credits`}>
              Мои данные
            </MDBDropdownItem>
            <MDBDropdownItem link href={`${paths.PROFILE}?tab=items`}>
              Моё снаряжение
            </MDBDropdownItem>
            <MDBDropdownItem divider />
            <MDBDropdownItem
              className={"text-danger"}
              link
              onClick={() => logoutUser()}
            >
              <span className={"text-danger"}>Выйти</span>
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

            <span className={`d-none d-sm-flex flex-row gap-2`}>
              <BalanceBadge />
              <Cart />
              <ProfileDropdownMenu />
              <MDBBtn
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
