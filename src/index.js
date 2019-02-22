import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import { Home, CryptoCurrencyDetails } from "components";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/crypto-currency/:name"
          component={CryptoCurrencyDetails}
        />
      </Switch>
    </div>
  </BrowserRouter>,
  document.querySelector("#root")
);
