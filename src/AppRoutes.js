import { Route, Routes } from "react-router-dom";
import { paths } from "./routePaths";
import NotFound from "./components/NotFound";
import Page from "./components/page/Page";
import HomePage from "./pages/home-page/HomePage";
import StoragePage from "pages/storage-page/StoragePage";
import CartPage from "pages/cart-page/CartPage";
import ProfilePage from "./pages/profile-page/ProfilePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.INDEX} element={<Page />}>
        <Route index element={<HomePage />} />
        <Route path={paths.EQUIPMENT} element={<StoragePage />} />
        <Route path={paths.CART} element={<CartPage />} />
        <Route path={paths.PROFILE} element={<ProfilePage />} />
        <Route path={paths.ANY} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
