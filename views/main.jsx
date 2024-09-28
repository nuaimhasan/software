import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/style.css";
import "react-loading-skeleton/dist/skeleton.css";
import Web from "../routes/web.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Web />
    </Provider>
  </React.StrictMode>
);
