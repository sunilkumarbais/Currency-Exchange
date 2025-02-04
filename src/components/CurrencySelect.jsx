const currencyCodes = [
  "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "INR", "NZD",
  "SEK", "KRW", "SGD", "NOK", "MXN", "HKD", "BRL", "ZAR", "RUB", "TRY",
  "IDR", "THB", "MYR", "PHP", "CZK", "PLN", "DKK", "HUF", "AED", "SAR",
  "ARS", "CLP", "EGP", "PKR", "COP", "IQD", "VND", "BDT", "NGN"
];

const CurrencySelect = ({selectedCurrency, handleCurrency}) => {

  const currencyCode = selectedCurrency.substring(0,2);

  return (
    <div className="currency-select">
      <img src={`https://flagsapi.com/${currencyCode}/flat/64.png`} alt="flag" />
      <select className="currency-dropdown" value={selectedCurrency} onChange={handleCurrency}>
        {currencyCodes.map((currency,index) => <option key={index} value={currency}>{currency}</option> )}
      </select>
    </div>
  );
};

export default CurrencySelect;
