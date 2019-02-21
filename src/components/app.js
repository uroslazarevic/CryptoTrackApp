import React from "react";
import { Header, CryptoCurrencyList } from "./index";

const App = () => {
  return (
    <div className="crypto-track-app">
      <div className="container">
        <Header />
        <CryptoCurrencyList />
      </div>
    </div>
  );
};

export default App;
