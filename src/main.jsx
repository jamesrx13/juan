import React from "react";
import ReactDOM from "react-dom/client";
import "./statics/css/main.css";
import { LoginPage } from "./pages/LoginPage";
import { AppPage } from "./pages/AppPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppPage />
  </React.StrictMode>
);
