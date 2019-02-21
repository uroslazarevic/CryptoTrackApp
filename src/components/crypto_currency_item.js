import React, { Component } from "react";

export default class CryptoCurrencyItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      name,
      symbol,
      quote: {
        USD: { price, percent_change_24h }
      }
    } = this.props.currItem;

    const formatedPrice = price.toLocaleString();
    const formatedChange = percent_change_24h.toLocaleString();
    const styleChange = formatedChange > 0 ? "green" : "red";

    return (
      <li className="crypto-currency-item">
        <div className="block name">
          <div className="title">Name</div>
          <div className="value">{name}</div>
        </div>

        <div className="block shortname">
          <div className="title">Short name</div>
          <div className="value">{symbol}</div>
        </div>

        <div className="block value">
          <div className="title">$ Value</div>
          <div className="value">$ {formatedPrice}</div>
        </div>

        <div className="block change">
          <div className="title">last 24h</div>
          <div className="value" style={{ color: styleChange }}>
            {formatedChange} %
          </div>
        </div>

        <form className="block account">
          <div className="title">Amount you own</div>
          <input type="number" name={symbol} />
          <button>Submit</button>
        </form>

        <div className="block account-value">
          <div className="title">$ Value of your coin</div>
          <div className="value">{`$ 0.00`}</div>
        </div>
      </li>
    );
  }
}
