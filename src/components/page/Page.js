import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import TopBar from "./TopBar";
import styles from "./styles/Page.module.scss";

function Page() {
  return (
    <div className={styles.root}>
      <TopBar />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Page;
