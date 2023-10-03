import { useState } from "react";
import "./App.css";

const CurrencyConverter = () => {
  const [result, setResult] = useState("");
  const handleConvert = (event) => {
    event.preventDefault();

    const selectedCurrency = event.currentTarget.elements.currency.value;
    const amountValue = parseFloat(event.currentTarget.elements.amount.value);

    if (isNaN(amountValue) || amountValue <= 0) {
      setResult("Wprowadź poprawną dodatnią kwotę.");
      return;
    }

    fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${selectedCurrency}/?format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        const exchangeRate = data?.rates?.[0]?.mid;

        if (exchangeRate) {
          const convertedAmount = (amountValue * exchangeRate).toFixed(2);
          setResult(
            `${amountValue} ${selectedCurrency} = ${convertedAmount} PLN`
          );
        } else {
          setResult("Wystąpił błąd podczas pobierania danych.");
        }
      })
      .catch(() => {
        setResult("Wystąpił błąd podczas pobierania danych.");
      });
  };

  return (
    <div className="container">
      <h1 className="header">Przelicznik Walut</h1>
      <form className="form" onSubmit={handleConvert}>
        <label className="label" htmlFor="currency">
          Wybierz walutę:
        </label>
        <select className="table" id="currency" name="currency">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CHF">CHF</option>
        </select>
        <br />
        <label className="label" htmlFor="amount">
          Kwota:
        </label>
        <input className="table" id="amount" type="number" name="amount" />
        <button className="btn" id="convertBtn" type="submit">
          Przelicz
        </button>
        <p className="result">{result}</p>
      </form>
    </div>
  );
};

export default CurrencyConverter;
