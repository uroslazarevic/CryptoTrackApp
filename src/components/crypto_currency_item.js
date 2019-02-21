import React from "react";

export default ({ currItem }) => {
  // const { name, symbol, quoute: { USD: { price, percent_change_24h } } } = currItem;
  return (
    <li className="crypto-currency-item">
      {currItem.name}
      {/* <div className="block">
        <div className="title">{name}</div>
        <div className="value">value</div>
      </div>

      <div className="block name">
        <div className="title">{name}</div>
        <div className="value">value</div>
      </div>

      <div className="block shortname">
        <div className="title">{name}</div>
        <div className="value">value</div>
      </div>

      <div className="block value">
        <div className="title">{name}</div>
        <div className="value">value</div>
      </div>

      <div className="block change">
        <div className="title">{name}</div>
        <div className="value">value</div>
      </div>

      <form className="block account">
        <div className="title">{name}</div>
        <div className="value">value</div>
      </form>

      <div className="block account-value">
        <div className="title">{name}</div>
        <div className="value">value</div>
      </div> */}
    </li>
  );
};
