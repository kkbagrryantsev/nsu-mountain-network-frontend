import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

const Default = (props) => {
  return (
    <>
      <TopBar {...props} />
      <Outlet />
    </>
  );
};

export default Default;
