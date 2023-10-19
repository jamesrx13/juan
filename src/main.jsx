import React from "react";
import ReactDOM from "react-dom/client";
import "./statics/css/main.css";

import { LoginPage } from "./pages/LoginPage";
import { AppPage } from "./pages/AppPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AUTH_EVENT } from "./statics/core/config";
import { isAuth } from "./statics/core/utils";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {window.addEventListener(AUTH_EVENT, () => {
      if (isAuth()) {
        ReactDOM.createRoot(document.getElementById("root")).render(
          <>
            <AppPage />
            <ToastContainer />
          </>
        );
      } else {
        ReactDOM.createRoot(document.getElementById("root")).render(
          <>
            <LoginPage />
            <ToastContainer />
          </>
        );
      }
    })}
  </React.StrictMode>
);

window.dispatchEvent(new Event(AUTH_EVENT));
