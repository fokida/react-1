import React, { useState } from "react";
import "./App.css";

const CurrencyConverter = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    const amountValue = parseFloat(amount);

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
      .catch((error) => {
        setResult("Wystąpił błąd podczas pobierania danych.");
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1 className="header">Przelicznik Walut</h1>
      <div className="form">
        <label className="label" htmlFor="currency">
          Wybierz walutę:{" "}
        </label>
        <select
          className="table"
          id="currency"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CHF">CHF</option>
        </select>
        <br />

        <label className="label" htmlFor="amount">
          Kwota:{" "}
        </label>
        <input
          className="table"
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="btn" id="convertBtn" onClick={handleConvert}>
          Przelicz
        </button>

        <p className="result" id="result">
          {result}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
