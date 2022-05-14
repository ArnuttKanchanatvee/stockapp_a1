import { useState, useEffect } from "react";
const API_KEY = "d5c8d1b31e007be468b929cb49029618";

async function getStocksymbol(search) {
  // here will test whether the fetching (catch/grab) works
  const url = `https://financialmodelingprep.com/api/v4/institutional-ownership/portfolio-holdings?cik=0001067983&date=2021-09-30&page=0&apikey=${API_KEY}`; //looking for API to see the pattern for query;

  try {
    // assign the result as variable - result
    let result = await fetch(url);
    // change the result as json
    let data = await result.json();
    // only return the articles inside of the data
    let symbols = data.symbol;
    return symbols;
  } catch (error) {
    console.log(error);
  }
}
async function getName() {
  // here will test whether the fetching (catch/grab) works
  const url = `https://financialmodelingprep.com/api/v4/institutional-ownership/portfolio-holdings?cik=0001067983&date=2021-09-30&page=0&apikey=${API_KEY}`;

  try {
    // assign the result as variable - result
    let result = await fetch(url);
    // change the result as json
    let data = await result.json();
    let securityNames = data.securityName;
    return securityNames;
  } catch (error) {
    console.log(error);
  }
}
async function getIndustryTitle() {
  // here will test whether the fetching (catch/grab) works
  const url = `https://financialmodelingprep.com/api/v4/institutional-ownership/portfolio-holdings?cik=0001067983&date=2021-09-30&page=0&apikey=${API_KEY}`;

  try {
    // assign the result as variable - result
    let result = await fetch(url);
    // change the result as json
    let data = await result.json();
    // only return the articles inside of the data
    let industryTitles = data.industryTitle;
    console.log(industryTitles);
    return industryTitles;
  } catch (error) {
    console.log(error);
  }
}

export function useStockInfo(search) {
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState([]);
  const [securityNames, setName] = useState([]);
  const [industryTitles, setIndustryTitle] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setSymbol(await getStocksymbol(search));
      setName(await getName());
      setIndustryTitle(await getIndustryTitle());
      setLoading(false);
    })();
  }, [search]);

  return {
    loading,
    symbol,
    securityNames,
    industryTitles,
    error,
  };
}
