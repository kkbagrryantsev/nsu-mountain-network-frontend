import {
  MDBCard,
  MDBCardImage,
  MDBCardOverlay,
  MDBCardTitle,
  MDBCol,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
import items from "assets/png/profile-page/items.jpg";
import credits from "assets/png/profile-page/credits.jpg";
import treasurer from "assets/png/profile-page/treasurer.jpg";

function Section({ title, href, image }) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const activeSection = params.get("tab");

  return (
    <MDBCard>
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

function RolesParser(roles, role) {
  if(roles.indexOf(role) == -1) {
    return true;
  }
  return false;
}

function Sections(roles) {
  return (
    <div className="d-grid gap-3">
    <MDBRow>
      <MDBCol end>
        <Section
          md={"50%"}
          title={"Личные данные"}
          href={"credits"}
          image={credits}
        />
      </MDBCol>
      <MDBCol end>
        <Section
          md={"50%"}
          title={"Моё снаряжение"}
          href={"items"}
          image={items}
        />
      </MDBCol>
    </MDBRow>
    <MDBRow hidden={RolesParser(roles.roles, "treasurer") }>
      <MDBCol>
        <Section
          md={"100%"}
          title={"Опции казначея"}
          href={"treasurer"}
          image={treasurer}
        />
      </MDBCol>
    </MDBRow>
    </div>
  );
}

export default Sections;
