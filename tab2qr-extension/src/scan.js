import React from "react";
import ReactDOM from "react-dom";
import ScanQR from "./components/ScanQR";
import "antd/dist/antd.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ScanQR />
  </React.StrictMode>,
  document.getElementById("root")
);
