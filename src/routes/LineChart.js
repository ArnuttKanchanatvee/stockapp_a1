// create line chart
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// table library
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
// Date picker react for select the date
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "../App.css";
import { keys } from "../../config/key";

function LineChart() {
  // define the column name and value for Ag-grid
  const columns = [
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      flex: 1,
    },
    {
      headerName: "Opening Price",
      field: "open",
      sortable: true,
      flex: 1,
    },
    {
      headerName: "Highest Price",
      field: "high",
      sortable: true,
      flex: 1,
    },
    {
      headerName: "Lowest Price",
      field: "low",
      sortable: true,
      flex: 1,
    },
    {
      headerName: "Closing Price",
      field: "close",
      sortable: true,
      flex: 1,
    },
    { headerName: "Volume", field: "volume", sortable: true, flex: 1 },
  ];
  // define the varible
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [presentData, setPresentData] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  // setting date
  const date = presentData.map(({ date }) => date);
  //setting values
  const val = presentData.map(({ close }) => close);

  //getting data from API
  async function getPriceInfo() {
    let res = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${state.selectedSymbol.toUpperCase()}&apikey=${
        keys.ALP_Key
      }`
    );
    let data = await res.json();
    if (Object.keys(data) == "Error Message") {
      return Object.entries(data).map(([key, values1]) => {
        return key;
      });
    } else {
      return Object.entries(data["Time Series (Daily)"]).map(
        ([keys, values1]) => {
          return {
            date: keys,
            open: Object.values(values1)[0],
            high: Object.values(values1)[1],
            low: Object.values(values1)[2],
            close: Object.values(values1)[3],
            volume: Object.values(values1)[4],
          };
        }
      );
    }
  }

  // Retrive the data
  useEffect(() => {
    (async () => {
      try {
        setRowData(await getPriceInfo());
        setPresentData(await getPriceInfo());
        setLoading(false);
      } catch {
        setError(error);
        setLoading(false);
      }
    })();
  }, []);

  // navigate back to the search pages
  const onNavigatePageClick = (e) => {
    e.preventDefault();
    // Navigate.
    navigate("/Quote");
  };

  // filter date
  useEffect(() => {
    if (startDate === null) {
      setPresentData(rowData);
    }
    if (startDate !== null && endDate === null) {
      setEndDate(new Date());
    }
    if (startDate !== null) {
      let filteredData = rowData.filter(
        ({ date }) =>
          Date.parse(date) >= Date.parse(startDate) &&
          Date.parse(date) <= Date.parse(endDate)
      );
      setPresentData(filteredData);
    }
  }, [startDate, endDate]);

  // Showing meassgae if it error
  if (rowData == "Error Message") {
    return (
      <div>
        <p>
          There are some problem with the stock symbol or API server please go
          back and try again
        </p>
        <button onClick={onNavigatePageClick}>Back to Stock Search</button>
      </div>
    );
  }
  return (
    <main>
      <div className="listStock_box">
        <ul>
          <li>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              isClearable={true}
              placeholderText="Select Start date"
            />
          </li>
          <li>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              isClearable={true}
              placeholderText="Select End date"
            />
          </li>
        </ul>
      </div>
      <div
        className="ag-theme-balham"
        style={{ height: "220px", width: "100%" }}
      >
        <h2>Price History</h2>
        <AgGridReact
          columnDefs={columns}
          rowData={presentData}
          pagination={true}
          suppressRowHoverHighlight={true}
          columnHoverHighlight={true}
          paginationAutoPageSize={true}
          autoSizePadding={true}
        />
        <button onClick={onNavigatePageClick}>Back to Stock Search</button>
        <div className="line_container">
          <Plot
            data={[
              {
                x: date,
                y: val,
                type: "scatter",
              },
            ]}
            layout={{
              width: 1650,
              height: 480,
              title: `Prices History of ${state.selectedSymbol}`,
              margin: { b: 130, pad: 5 },
              font: {
                family: "Arial, sans-seif",
              },
              xaxis: {
                title: "Date",
                titlefont: {
                  family: "Arial, sans-seif",
                },
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}

export default LineChart;
