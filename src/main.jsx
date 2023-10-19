import { } from "react";
import ReactDOM from "react-dom/client";
import "./statics/css/main.css";
import { LoginPage } from "./pages/LoginPage";
import { AppPage } from "./pages/AppPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  </BrowserRouter>
);