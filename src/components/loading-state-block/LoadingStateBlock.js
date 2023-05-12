import LoadingState from "../../enums/LoadingState";
import { ClipLoader } from "react-spinners";
import styles from "./styles/LoadingStateBlock.module.scss";
import cancel from "assets/png/misc/cancel.png";
import { MDBBadge, MDBContainer } from "mdb-react-ui-kit";

function LoadingStateBlock({ loadingState, children }) {
  let block;

  if (loadingState === LoadingState.LOADED) {
    block = children;
  } else if (loadingState === LoadingState.LOADING) {
    block = (
      <div className={styles.root}>
        <ClipLoader loading={true} size={75} color={"#0d6efd"} />
      </div>
    );
  } else {
    block = (
      <MDBContainer
        className={"d-flex align-items-center justify-content-center h-100"}
      >
        <MDBBadge color={"transparent"}>
          <img src={cancel} alt={"Не удалось загрузить данные"}></img>
          <h3 className={"text-dark"}>Не удалось загрузить данные</h3>
        </MDBBadge>
      </MDBContainer>
    );
  }

  return <>{block}</>;
}

export default LoadingStateBlock;
