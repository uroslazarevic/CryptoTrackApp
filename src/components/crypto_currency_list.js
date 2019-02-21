import React, { Component } from "react";

import { CryptoCurrencyItem } from "components";

export default class CryptoCurrencyList extends Component {
  constructor(props) {
    super(props);

    this.state = { userCurrencies: [] };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUserCurrencies() {
    let userCurrencies;
    if (localStorage.getItem("userCurrencies") === null) {
      userCurrencies = [];
    } else {
      userCurrencies = JSON.parse(localStorage.getItem("userCurrencies"));
    }
    return userCurrencies;
  }

  handleSubmit(amount) {
    return e => {
      e.preventDefault();
      const currencyName = e.target.dataset.currencyName;
      const userCurrencies = this.getUserCurrencies();
      const index = userCurrencies.findIndex(
        currency => currency.name == currencyName
      );
      // console.log(/^([0-9]{1,9})$/.test(amount));

      if (index != -1) {
        userCurrencies[index].amount = amount;
      } else {
        userCurrencies.push({ name: currencyName, amount });
      }

      this.setState({ userCurrencies });
      localStorage.setItem("userCurrencies", JSON.stringify(userCurrencies));
    };
  }

  renderContent() {
    const { currencyList } = this.props;
    const { userCurrencies } = this.state;

    return currencyList.length > 0 ? (
      currencyList.map(currItem => {
        return (
          <CryptoCurrencyItem
            key={currItem.name}
            handleSubmit={this.handleSubmit}
            currItem={currItem}
            userCurrencies={userCurrencies}
          />
        );
      })
    ) : (
      <div>List</div>
    );
  }

  componentWillMount() {
    const userCurrencies = this.getUserCurrencies();
    this.setState({ userCurrencies });
  }

  render() {
    return <ul className="crypto-currency-list">{this.renderContent()}</ul>;
  }
}
