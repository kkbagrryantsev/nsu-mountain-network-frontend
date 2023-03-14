import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.scss";
import { store } from "./store/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));

function renderApp() {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
renderApp();
