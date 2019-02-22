import React, { Component } from "react";
import { Link } from "react-router-dom";
import { cryptoCurrencyCap } from "../api";

import { Header, Loader } from "./index";
const USER_KEY = "51764d66-844e-4bd9-922f-a12308d6793a";

export default class CryptoCurrencyDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { details: "", loader: true, id: "", refreshInterval: "" };
  }

  fetchCryptoCurrency = async id => {
    const response = await cryptoCurrencyCap.get("info", {
      params: {
        CMC_PRO_API_KEY: USER_KEY,
        id
      }
    });
    this.setState({ details: response.data.data });
  };

  componentWillMount() {
    const { id } = this.props.location.state;
    this.fetchCryptoCurrency(id).then(() =>
      this.setState({ loader: false, id })
    );
    const refreshInterval = setInterval(
      () => this.fetchCryptoCurrencies(),
      60000
    );
    this.setState({ refreshInterval });
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshInterval);
  }

  renderDetails() {
    const {
      category,
      date_added,
      logo,
      name,
      tags,
      symbol,
      urls: { reddit, source_code, website, message_board }
    } = this.state.details[this.state.id];

    console.log(this.state.details[1]);

    return (
      <div className="crypto-currency-details">
        <h3>
          <Link className="back" to="/">
            Back
          </Link>
          Category: {category} - {tags[0]}
        </h3>
        <div className="basic-info">
          <img src={logo} alt="logo" />
          <div className="name">{name}</div>
          <small className="symbol">({symbol})</small>
        </div>
        <div className="additional-info">
          <div className="info">
            <span className="bold">Added on:</span>
            <br />
            {date_added}
          </div>
          <div className="info">
            <span>Reddit:</span>
            <br />
            {reddit[0]}
          </div>
          <div className="info">
            <span>Source code:</span>
            <br />
            {source_code[0]}
          </div>
          <div className="info">
            <span>Website:</span>
            <br />
            {website[0]}
          </div>
          <div className="info">
            <span>Message board:</span>
            <br />
            {message_board[0]}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.loader) {
      return <Loader />;
    }
    return (
      <div className="container">
        <Header />
        {this.renderDetails()}
      </div>
    );
  }
}
