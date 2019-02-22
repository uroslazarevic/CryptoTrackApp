import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CryptoCurrencyItem extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: 0, defaultValue: 0 };
  }

  handleUsersCurrValue() {
    const { currItem, userCurrencies } = this.props;

    const crypto = userCurrencies.find(
      userCurr => userCurr.name === currItem.slug
    );
    if (crypto) {
      const userCurrencyValue =
        parseInt(crypto.amount, 10) * currItem.quote.USD.price;

      return {
        amount: crypto.amount,
        value: `$ ${userCurrencyValue.toLocaleString()}`
      };
    } else {
      return {
        amount: "",
        value: "$ 0"
      };
    }
  }

  handleInputValue = e => {
    this.setState({ inputValue: e.target.value });
  };

  disableBtn = () => {
    const { inputValue } = this.state;
    return inputValue <= 0 || inputValue === "" ? true : false;
  };

  submitHelper = inputValue => {
    return e => {
      e.preventDefault();
      this.setState({ error: null });

      if (/^([0-9]{1,9})$/.test(inputValue)) {
        console.log("da");
        this.props.handleSubmit(inputValue, e);
      } else {
        this.setState({ error: `error-${e.target.dataset.currencyName}` });
        console.log("ne");
      }
    };
  };

  componentWillMount() {
    const value = this.handleUsersCurrValue().amount
      ? this.handleUsersCurrValue().amount
      : 0;
    this.setState({ defaultValue: value });
  }

  render() {
    const { currItem } = this.props;
    const { inputValue, defaultValue } = this.state;
    const {
      id,
      name,
      symbol,
      slug,
      quote: {
        USD: { price, percent_change_24h }
      }
    } = currItem;

    const formatedPrice = price.toLocaleString();
    const formatedChange = percent_change_24h.toLocaleString();
    const styleChange = formatedChange > 0 ? "green" : "red";

    return (
      <li className="crypto-currency-item">
        <Link
          className="collection-restaurant-item"
          to={{
            pathname: `/crypto-currency/${slug}`,
            state: {
              id
            }
          }}
        >
          More
        </Link>
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

        <form
          data-currency-name={slug}
          onSubmit={this.submitHelper(inputValue)}
          className="block account"
        >
          <div className="title">Amount you own</div>
          <input
            autoComplete="off"
            onFocus={() => this.setState({ error: null })}
            onChange={this.handleInputValue}
            type="text"
            name={symbol}
            defaultValue={defaultValue}
          />
          <button
            ref={this.button}
            className={this.disableBtn() ? "disabled" : ""}
            disabled={this.disableBtn()}
          >
            Submit
          </button>
          {this.state.error == `error-${slug}` && (
            <p className="error">Must be a number</p>
          )}
        </form>

        <div className="block account-value">
          <div className="title">$ Value of your coin</div>
          <div className="value">{this.handleUsersCurrValue().value}</div>
        </div>
      </li>
    );
  }
}
