import { getAccessToken } from "../../api/Cookie";
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
} from "mdb-react-ui-kit";
import logo from "../../assets/logo.png";
import { paths } from "../../routePaths";
import { useState } from "react";
import LoginModal from "../../pages/home-page/components/LoginModal";
import RegisterModal from "../../pages/home-page/components/RegisterModal";
import { showModal } from "../modals/ModalProviderSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function TopBar() {
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const cartLength = useSelector((state) => state.storagePage.cart.length);
  const isLogged = !!getAccessToken();

  const onOpenModalClicked = () => {
    dispatch(showModal({ modalType: "TestModal", modalProps: { a: 42 } }));
  };

  return (
    <>
      <LoginModal isActive={loginModal} setIsActive={setLoginModal} />
      <RegisterModal isActive={registerModal} setIsActive={setRegisterModal} />
      <MDBNavbar expand={"sm"} light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href={window.location.origin}>
            <img src={logo} height="35px" alt="" />
          </MDBNavbarBrand>
          <MDBCollapse navbar>
            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink href={window.location.origin}>
                  Главная
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  hidden={!getAccessToken()}
                  href={`${window.location.origin}/${paths.EQUIPMENT}`}
                >
                  Снаряжение
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink hidden={!getAccessToken()} href="#">
                  Походы
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <div className={"d-flex flex-fill gap-2"}>
              {isLogged ? (
                <>
                  <MDBBtn className={"p-2 overflow-visible"} color={"tertiary"}>
                    <NavLink>
                      <MDBIcon fas size={"xl"} icon={"shopping-cart"}></MDBIcon>
                      <MDBBadge
                        pill
                        color={"warning"}
                        className="position-absolute translate-middle-x"
                      >
                        {cartLength}
                      </MDBBadge>
                    </NavLink>
                  </MDBBtn>
                  <MDBDropdown>
                    <MDBDropdownToggle outline>
                      <MDBIcon far size={"xl"} icon={"user"} />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link>Настройки</MDBDropdownItem>
                      <MDBDropdownItem divider />
                      <MDBDropdownItem link>
                        <h7 className={"text-danger"}>Выйти</h7>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </>
              ) : (
                <>
                  <MDBBtn
                    rounded
                    onClick={() => setRegisterModal(!registerModal)}
                  >
                    Зарегистрироваться
                  </MDBBtn>
                  <MDBBtn
                    rounded
                    onClick={() => setLoginModal(!loginModal)}
                    outline
                  >
                    Войти
                  </MDBBtn>
                </>
              )}
            </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default TopBar;
