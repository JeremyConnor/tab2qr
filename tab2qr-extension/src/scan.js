import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import ScanQR from "./components/ScanQR/ScanQR";

ReactDOM.render(
  <React.StrictMode>
    <ScanQR />
  </React.StrictMode>,
  document.getElementById("root")
);
