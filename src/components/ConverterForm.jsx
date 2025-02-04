import { useState } from "react";
import CurrencySelect from "./CurrencySelect";

export const ConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState("");

  const exchangeCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("Something went wrong!");
      const data = await response.json();
      const rate = (data.conversion_rate * amount).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getExchangeRate();
  };

  return (
    <form className="converter-form" onSubmit={handleFormSubmit}>
      <div className="form-group-1">
        <label htmlFor="amount" className="form-lable">Enter Amount</label>
        <input
          type="number"
          className="form-input"
          value={amount}
          id="amount"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="form-group-2">
        <div className="form-section">
          <label htmlFor="from" className="form-label">From</label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
        </div>

        <div className="swipe-icon" onClick={exchangeCurrency}>
          <span className="material-symbols-outlined">currency_exchange</span>
        </div>

        <div className="form-section">
          <label htmlFor="to" className="form-label">To</label>
          <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={(e) => setToCurrency(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">
          Get Exchange Rate
        </button>
        <p className="exchange-rate">{result === '' ? '100 INR = 1 USD (approximately)' : result}</p>
      </div>
    </form>
  );
};
