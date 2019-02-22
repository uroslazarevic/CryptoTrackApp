import React, { Component } from "react";
import { cryptoCurrencyCap } from "../api";
import { Header, CryptoCurrencyList, Pagination, Loader } from "./index";

const USER_KEY = "51764d66-844e-4bd9-922f-a12308d6793a";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencyList: [],
      start: 1,
      limit: 10,
      pageCount: 5,
      loader: true,
      refreshInterval: ""
    };
  }

  onPageChange = ({ selected }) => {
    const page = selected;
    console.log(this.state.limit);
    this.setState({ start: (page + 1) * this.state.limit }, () => {
      this.fetchCryptoCurrencies();
    });
  };

  fetchCryptoCurrencies = async () => {
    const response = await cryptoCurrencyCap.get("listings/latest", {
      params: {
        CMC_PRO_API_KEY: USER_KEY,
        limit: this.state.limit,
        start: this.state.start
      }
    });
    this.setState({ currencyList: response.data.data });
  };

  componentWillMount() {
    this.fetchCryptoCurrencies().then(() => this.setState({ loader: false }));
    const refreshInterval = setInterval(
      () => this.fetchCryptoCurrencies(),
      60000
    );
    this.setState({ refreshInterval });
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshInterval);
  }

  render() {
    if (this.state.loader) {
      return <Loader />;
    }
    return (
      <div className="crypto-track-app">
        <div className="container">
          <Header />
          <CryptoCurrencyList currencyList={this.state.currencyList} />
          <Pagination
            onPageChange={this.onPageChange}
            pageCount={this.state.pageCount}
          />
        </div>
      </div>
    );
  }
}
