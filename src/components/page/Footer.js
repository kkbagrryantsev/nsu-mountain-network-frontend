import styles from "./styles/Footer.module.scss";
import logoGray from "../../assets/logo-gray.png";
import { IoLogoVk, IoLogoYoutube } from "react-icons/io5";
import { MDBBadge, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md={"4"} className={"p-3"}>
          <img src={logoGray} alt="Error" />
          <MDBRow>
            <MDBCol className={"me-2"} md={"1"}>
              <a href="https://vk.com/mountainnsu">
                <IoLogoVk color={"white"} size={"40"} />
              </a>
            </MDBCol>
            <MDBCol md={"1"}>
              <a href="https://www.youtube.com/c/MountainNSUclub">
                <IoLogoYoutube color={"white"} size={"40"} />
              </a>
            </MDBCol>
          </MDBRow>
          <p className={styles.copyright}>©NSU mountain network</p>
        </MDBCol>
        <MDBCol className={"p-3"} offsetMd={"4"} md={"4"}>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Footer;
