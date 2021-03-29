import React from "react";
import { Typography } from "antd";
import "./Header.css";

const ImportButton = () => {
  return (
    <a href="/scan.html" target="blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        style={{ height: 24 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
    </a>
  );
};

function Header(props) {
  return (
    <div className="header">
      <Typography.Text className="app-title" style={{ color: "white" }}>
        Tab2QR
      </Typography.Text>
      <ImportButton />
    </div>
  );
}

export default Header;
