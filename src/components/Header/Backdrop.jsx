import React from "react";
import "./Backdrop.css";

const Backdrop = ({ sideMenu, setSideMenu }) => {
  return (
    <div
      className={`backdrop d-block ${
        sideMenu ? "bactive" : ""
      }`}
      onClick={() => setSideMenu(!sideMenu)}
    ></div>
  );
};

export default Backdrop;
