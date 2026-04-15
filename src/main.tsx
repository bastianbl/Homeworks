import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProveedorAuth } from "./contexto/authContexto";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProveedorAuth>
      <App />
    </ProveedorAuth>
  </React.StrictMode>
);