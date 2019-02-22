import React from "react";
import { Link } from "react-router-dom";
import logo from "./../img/logo.png";

export default () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <Link to="/">
        <div className="project-name">CryptoTrack App</div>
      </Link>
    </header>
  );
};
