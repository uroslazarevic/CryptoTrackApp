import React, { Component } from "react";

export default class CryptoCurrencyItem extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: 0 };
  }

  handleUsersCurrValue() {
    const { currItem, userCurrencies } = this.props;
    let usersCurrAmount;
    userCurrencies.forEach(userCurr => {
      if (userCurr.name === currItem.slug) {
        usersCurrAmount = userCurr.amount;
      }
    });
    const userCurrencyValue = usersCurrAmount * currItem.quote.USD.price;

    return {
      amount: usersCurrAmount,
      value: `$ ${userCurrencyValue.toLocaleString()}`
    };
  }

  handleInputValue = e => {
    this.setState({ inputValue: e.target.value });
  };

  disableInput = () => {
    return this.state.inputValue < 0 ? true : false;
  };

  componentWillMount() {
    this.setState({ inputValue: this.handleUsersCurrValue().amount });
  }

  render() {
    const { currItem, handleSubmit } = this.props;
    const { inputValue } = this.state;
    const {
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
          onSubmit={handleSubmit(inputValue)}
          className="block account"
        >
          <div className="title">Amount you own</div>
          <input
            onChange={this.handleInputValue}
            value={inputValue}
            type="number"
            name={symbol}
          />
          <button
            className={this.disableInput() ? "disabled" : ""}
            disabled={this.disableInput()}
          >
            Submit
          </button>
        </form>

        <div className="block account-value">
          <div className="title">$ Value of your coin</div>
          <div className="value">
            {this.handleUsersCurrValue().value
              ? this.handleUsersCurrValue().value
              : "$ 0"}
          </div>
        </div>
      </li>
    );
  }
}
