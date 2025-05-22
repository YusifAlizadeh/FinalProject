// CurrencyContext.js
import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

const exchangeRates = {
  USD: 1,
  AZN: 1.7,
  EUR: 0.93,
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");

  const convert = (priceInUSD) => (priceInUSD * exchangeRates[currency]).toFixed(2);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
