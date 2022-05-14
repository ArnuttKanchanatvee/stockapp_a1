import "./App.css";
import "./index.css";
// react module
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// pages imported
import Home from "./routes/Home";
import Quote from "./routes/Quote";
import Stock from "./routes/Stock";

import LineChart from "./routes/LineChart";
import Header from "./sitecomponent/Header";
import Footer from "./sitecomponent/Footer";
function App() {
  return (
    <div>
      <title>Stock Application</title>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Stock" element={<Stock />} />
          <Route path="/Quote" element={<Quote />} />
          <Route path="/chart/:selectedSymbol" element={<LineChart />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
