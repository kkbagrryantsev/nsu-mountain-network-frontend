import {
  MDBCard,
  MDBCardImage,
  MDBCardOverlay,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
import items from "assets/png/profile-page/items.jpg";
import credits from "assets/png/profile-page/credits.jpg";
import ware from "assets/png/profile-page/ware.jpg";
import requests from "assets/png/profile-page/requests.jpg";
import { getUserRoles } from "api/Cookie";
import treasurer from "assets/png/profile-page/treasurer.jpg";

function Section({ title, href, image }) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const activeSection = params.get("tab");

  return (
    <MDBCard className={"rounded-8"}>
      <MDBRipple
        hidden={!!activeSection}
        rippleTag={"a"}
        rippleColor={"light"}
        className={"hover-zoom border rounded-5"}
        style={{ height: "125px" }}
        href={`?tab=${href}`}
      >
        <MDBCardImage
          className={"h-100 w-100"}
          style={{ objectFit: "cover" }}
          overlay
          position={"top"}
          src={image}
        ></MDBCardImage>
        <MDBCardOverlay style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
          <MDBCardTitle className={"text-white"}>{title}</MDBCardTitle>
        </MDBCardOverlay>
      </MDBRipple>
    </MDBCard>
  );
}

function rolesParser(roles, role) {
  return roles.indexOf(role) === -1;
}

function Sections() {
  const roles = getUserRoles().split(", ");

  return (
    <MDBContainer className={"p-0 d-grid gap-2"}>
      <MDBRow>
        <MDBCol className={"pe-0"} md={"5"} lg={"4"}>
          <Section
            md={"4"}
            title={"Личные данные"}
            href={"credits"}
            image={credits}
          />
        </MDBCol>
        <MDBCol end>
          <Section
            md={"8"}
            title={"Моё снаряжение"}
            href={"items"}
            image={items}
          />
        </MDBCol>
      </MDBRow>
      <div hidden={!~roles.indexOf("warehouseman")}>
        <MDBRow>
          <MDBCol md={"7"} lg={"7"}>
            <Section
              md={"4"}
              title={"Работа с заявками"}
              href={"requests"}
              image={requests}
            />
          </MDBCol>
          <MDBCol className={"ps-0"} end>
            <Section
              md={"8"}
              title={"Редактировать склад"}
              href={"ware"}
              image={ware}
            />
          </MDBCol>
        </MDBRow>
      </div>
      <MDBRow hidden={rolesParser(roles, "treasurer")}>
        <MDBCol>
          <Section
            md={"100%"}
            title={"Опции казначея"}
            href={"treasurer"}
            image={treasurer}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Sections;
