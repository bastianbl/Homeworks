import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { TareasProvider } from "./context/tareasContext";
import "./styles/app.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TareasProvider>
          <App />
        </TareasProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);