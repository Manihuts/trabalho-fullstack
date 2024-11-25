import React from "react";
import { AuthProvider } from "./context/authContext";
import ReactDOM from "react-dom/client";
import App from "./App";

// React App Bootstrap config:

import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);

