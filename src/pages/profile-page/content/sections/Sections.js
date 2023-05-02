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
import requests from "assets/png/profile-page/empty-box.png"

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
        style={{ height: "125px", width: "190px"}}
        href={`?tab=${href}`}
      >
        <MDBCardImage
          className={"h-100 w-100"}
          style={{ objectFit: "cover" }}
          overlay
          position={"top"}
          src={image}
        ></MDBCardImage>
        <MDBCardOverlay style={{ backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
          <MDBCardTitle className={"text-white"}>{title}</MDBCardTitle>
        </MDBCardOverlay>
      </MDBRipple>
    </MDBCard>
  );
}

function Sections() {
  return (
    <MDBRow>
      <MDBCol md={"5"} lg={"4"}>
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
      <MDBCol>
        <MDBRow>
          <Section 
            md={"8"}
            title={"Заявки на бронирование"} 
            href={"requests"} 
            image={requests}
          />
        </MDBRow>
      </MDBCol>
    </MDBRow>
  );
}

export default Sections;

/*hidden={!(user.user_roles === "warehouseman")}


*/
