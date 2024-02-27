import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

const environment = process.env.REACT_APP_ENV;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
