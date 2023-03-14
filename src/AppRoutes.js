import { Route, Routes } from "react-router-dom";
import { paths } from "./routePaths";
import HomePage from "./pages/home-page/HomePage";
import NotFound from "./components/NotFound";
import Page from "./components/page/Page";

function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.INDEX} element={<Page />}>
        <Route index element={<HomePage />} />
        <Route path={paths.ANY} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
