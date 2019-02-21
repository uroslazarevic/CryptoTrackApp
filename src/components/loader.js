import React from "react";
import pageLoader from "./../img/page-loader.gif";

export default () => {
  return (
    <div className="page-loader-bg">
      <img src={pageLoader} alt="places loader" />
    </div>
  );
};
