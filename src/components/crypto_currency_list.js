import React, { Component } from "react";
import { cryptoCurrencyCap } from "./../api";

import { CryptoCurrencyItem } from "components";

const USER_KEY = "51764d66-844e-4bd9-922f-a12308d6793a";

export default class CryptoCurrencyList extends Component {
  constructor(props) {
    super(props);

    this.state = { currencyList: [], userCurrencies: [] };

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

      if (index != -1) {
        userCurrencies[index].amount = amount;
      } else {
        userCurrencies.push({ name: currencyName, amount });
      }

      this.setState({ userCurrencies });
      localStorage.setItem("userCurrencies", JSON.stringify(userCurrencies));
    };
  }

  fetchCryptoCurrencies = async () => {
    const response = await cryptoCurrencyCap.get("listings/latest", {
      params: {
        CMC_PRO_API_KEY: USER_KEY,
        limit: 50
      }
    });
    this.setState({ currencyList: response.data.data });
  };

  renderContent() {
    const { currencyList, userCurrencies } = this.state;
    return currencyList.length > 0 ? (
      currencyList.map(currItem => {
        return (
          <CryptoCurrencyItem
            handleSubmit={this.handleSubmit}
            key={currItem.name}
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
    this.fetchCryptoCurrencies();
    setInterval(() => this.fetchCryptoCurrencies(), 60000);
  }

  render() {
    return <ul className="crypto-currency-list">{this.renderContent()}</ul>;
  }
}
