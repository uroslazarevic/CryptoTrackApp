import axios from "axios";

export const cryptoCurrencyCap = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/"
});
