import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";

function ProsCard(props) {
  return (
    <MDBCard shadow={"3"} style={{ maxWidth: "70%" }}>
      <MDBRow className="g-0">
        <MDBCol className={"p-3"} md="5">
          <MDBCardImage src={props.img} alt="..." fluid />
        </MDBCol>
        <MDBCol md="7">
          <MDBCardBody>
            <MDBCardTitle className={"text-xxl-start"}>
              {props.title}
            </MDBCardTitle>
            <MDBCardText style={{ maxWidth: "70%" }}>{props.text}</MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}

export default ProsCard;
