import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import NotificationContainer from "./components/notification/base/NotificationContainer";
import "react-toastify/dist/ReactToastify.css";
import ModalManager from "./components/modals/ModalManager";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ModalManager />
      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;
