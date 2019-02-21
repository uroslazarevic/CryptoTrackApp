import React from "react";
import logo from "./../img/logo.png";

export default () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" />
      <div className="project-name">CryptoTrack App</div>
    </header>
  );
};
