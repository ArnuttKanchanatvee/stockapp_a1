import "../App.css";
import pic from "../img/Nasdaq-100.png";
function Home() {
  return (
    <main>
      <title>Stock Application</title>
      <div className="landing_body">
        <h1>Stock Price Website</h1>
        <p>
          Welcome to the Stock Market Portal. You may click on stocks to view
          all the available companies or Quote to get the latest price
          information by stock symbol. The website using information from the
          Financial Modeling Prep and Alpha Vantage API
        </p>
      </div>
      <div className="landing_feature">
        <div id="landing_column">
          <h2> Stock Information</h2>
          <p>
            The NASDAQ-100 was launched on January 31, 1985 by the Nasdaq.[2] It
            created two indices: the NASDAQ-100, which consists of Industrial,
            Technology, Retail, Telecommunication, Biotechnology, Health Care,
            Transportation, Media and Service companies, and the NASDAQ
            Financial-100, which consists of banking companies, insurance firms,
            brokerage firms, and Mortgage loan companies.
            <a href="https://en.wikipedia.org/wiki/Nasdaq"> wikipedia</a>
          </p>
        </div>
        <div id="landing_column">
          <h2>Financial Modelling Prep API</h2>
          <p>
            We update our financial statements in real time, every statements is
            audited, standardized, and up to date. We cover NYSE, NASDAQ, AMEX,
            EURONEXT, TSX, INDEXES, ETFs, MUTUAL FUNDS, FOREX and CRYPTO.
            <a href="https://financialmodelingprep.com/developer/docs/"> FMP</a>
          </p>
        </div>
        <div id="landing_column">
          <h2>Alpha Vantage API</h2>
          <p>
            Our stock APIs © are grouped into five categories: (1) Core Time
            Series Stock Data APIs, (2) Fundamental Data, (3) Physical and
            Digital/Crypto Currencies (e.g., Bitcoin), (4) Economic Indicators,
            and (5) Technical Indicators. Examples in this documentation are for
            demo purposes. Claim your free API key today to explore our full API
            offerings!
            <a href="https://www.alphavantage.co/documentation/"> ALPHA DOC</a>
          </p>
        </div>
      </div>
      <div className="img_container">
        <img src={pic} alt="Nasdaq100"></img>
      </div>
    </main>
  );
}
export default Home;
