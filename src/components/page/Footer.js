import styles from "./styles/Footer.module.scss";
import logoGray from "assets/logo-gray.png";
import { IoLogoVk, IoLogoYoutube } from "react-icons/io5";
import { MDBBadge, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md={"4"} className={"p-3"}>
          <div className={"d-flex gap-2 align-items-center"}>
            <img src={logoGray} alt="Error" />
            <h1>|</h1>
            <a href="https://vk.com/mountainnsu">
              <IoLogoVk color={"lightGray"} size={"40"} />
            </a>
            <a href="https://www.youtube.com/c/MountainNSUclub">
              <IoLogoYoutube color={"lightGray"} size={"40"} />
            </a>
          </div>
          <p className={styles.copyright}>©NSU mountain network</p>
        </MDBCol>
        <MDBCol className={"p-3"} offsetMd={"4"} md={"4"}>
          <a
            className={"float-end"}
            href="https://www.flaticon.com/"
            title="Freepik Flaticons"
          >
            <MDBBadge className={"text-dark"} color={"secondary"}>
              Icons created by Freepik - Flaticon
            </MDBBadge>
          </a>
          <a href={""} className={"float-end me-2"}>
            <MDBBadge className={"text-dark"} color={"secondary"}>
              Illustrations by{" "}
              <a
                className={"text-black"}
                href="https://icons8.com/illustrations/author/zD2oqC8lLBBA"
              >
                Icons 8
              </a>{" "}
              from{" "}
              <a
                className={"text-black"}
                href="https://icons8.com/illustrations"
              >
                Ouch!
              </a>
            </MDBBadge>
          </a>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Footer;
