// react library
import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
// css component
import "../App.css";

function Quote() {
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const navigate = useNavigate();

  const onNavigatePageClick = (e) => {
    e.preventDefault();

    // Navigate symbol to chart pages
    navigate(`/chart/${selectedSymbol}`, { state: { selectedSymbol } });
  };
  // regex function for prevent user put integer
  const regex = /[A-Za-z]/;
  function validate(e) {
    const chars = e.target.value.split("");
    const char = chars.pop();
    if (!regex.test(char)) {
      setSelectedSymbol((e.target.value = chars.join("")));
    }
  }

  return (
    <main>
      <title>Quote</title>
      <div className="container">
        <h1>Stock Search</h1>
        <div className="inlineList">
          <ul>
            <li>
              <input
                aria-labelledby="search-button"
                name="search"
                type="search"
                placeholder="Stock Symbol"
                value={selectedSymbol}
                maxLength="10"
                onChange={(e) => {
                  if (e) {
                    validate(e);
                    setSelectedSymbol(e.target.value.toUpperCase());
                  }
                  if (e.target.value == "") {
                    setSelectedSymbol("");
                  }
                }}
              />
            </li>
            <li>
              <button className="botton1" onClick={onNavigatePageClick}>
                Create {selectedSymbol} Chart
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
export default Quote;
