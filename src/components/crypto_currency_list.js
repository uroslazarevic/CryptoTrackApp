import React, { Component } from "react";
import { cryptoCurrencyCap } from "./../api";

import { CryptoCurrencyItem } from "components";

const USER_KEY = "51764d66-844e-4bd9-922f-a12308d6793a";

export default class CryptoCurrencyList extends Component {
  constructor(props) {
    super(props);

    this.state = { currencyList: [] };
  }

  fetchCryptoCurrencies = async () => {
    const response = await cryptoCurrencyCap.get("listings/latest", {
      params: {
        CMC_PRO_API_KEY: USER_KEY,
        limit: 50
      }
    });
    this.setState({ currencyList: response.data.data }, () =>
      console.log(this.state.currencyList)
    );
  };

  renderContent() {
    const { currencyList } = this.state;
    return currencyList.length > 0 ? (
      currencyList.map(currItem => {
        return <CryptoCurrencyItem key={currItem.name} currItem={currItem} />;
      })
    ) : (
      <div>List</div>
    );
  }

  componentWillMount() {
    this.fetchCryptoCurrencies();
  }

  render() {
    return <ul className="crypto-currency-list">{this.renderContent()}</ul>;
  }
}
