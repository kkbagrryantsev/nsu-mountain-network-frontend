import LoadingState from "../../enums/LoadingState";
import { HashLoader } from "react-spinners";
import styles from "./styles/LoadingStateBlock.module.scss";
import { BiWindowClose } from "react-icons/bi";

function LoadingStateBlock({ loadingState, children }) {
  let block = null;

  if (loadingState.loading === LoadingState.LOADED) {
    block = children;
  } else if (loadingState.loading === LoadingState.LOADING) {
    block = (
      <div className={styles.root}>
        <HashLoader loading={true} size={75} color={"black"} />
      </div>
    );
  } else if (loadingState.loading === LoadingState.ERROR) {
    block = (
      <div className={styles.root}>
        <BiWindowClose size={75} color={"red"} />
        <p>Не удалось загрузить данные</p>
      </div>
    );
  }

  return <>{block}</>;
}

export default LoadingStateBlock;
