import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useState, useEffect } from "react";
import { SearchBar } from "../sitecomponent/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import "../App.css";
import { keys } from "../../config/key";

const columns = [
  { headerName: "Symbol", field: "symbol", sortable: true, flex: 1 },
  { headerName: "Name", field: "name", sortable: true, flex: 1 },
  { headerName: "Industry", field: "sector", sortable: true, flex: 1 },
  { headerName: "Headquater", field: "headQuarter", sortable: true, flex: 1 },
  { headerName: "Founded", field: "founded", sortable: true, flex: 1 },
];

function Stock() {
  //define the state
  //data for aggrid
  const [rowData, setRowData] = useState([]);
  const [presentData, setPresentData] = useState([]);
  //Set select symbol
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [selectIndustry, setSelectIndustry] = useState("");
  // checking loading status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectorName, setSectorName] = useState([]);
  const [message, setMessage] = useState("There are no symbol to show");

  // getting the stock information
  async function getStockInfo() {
    let res = await fetch(
      `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${keys.FPM_Key}`
    );
    let data = await res.json();
    return data.map(({ symbol, name, sector, headQuarter, founded }) => {
      return { symbol, name, sector, headQuarter, founded };
    });
  }

  // retrive the stock data while the error variable is changed
  useEffect(() => {
    (async () => {
      try {
        setRowData(await getStockInfo());
        setLoading(false);
      } catch {
        setError(error);
        setLoading(false);
      }
    })();
  }, []);

  // create the unique sector list
  useEffect(() => {
    if (rowData) {
      setSectorName(getSectors(rowData));
      setPresentData(rowData);
    }
  }, [rowData]);

  // set error meassgae
  useEffect(() => {
    if (presentData.length == 0 && selectedSymbol !== "") {
      setMessage(`There is no symbol match you search selection`);
    }
  }, [presentData]);

  //fillter the data by symbol or sector
  useEffect(() => {
    if (selectedSymbol === "" && selectIndustry === "") {
      setPresentData(rowData);
    }
    if (selectedSymbol !== "" && selectIndustry === "") {
      let filteredData = rowData.filter(({ symbol }) =>
        symbol.toLowerCase().includes(selectedSymbol.toLowerCase())
      );
      setPresentData(filteredData);
    }
    if (selectedSymbol === "" && selectIndustry !== "") {
      let filteredData = rowData.filter(({ sector }) =>
        sector.includes(selectIndustry.value)
      );
      setPresentData(filteredData);
    }
    if (selectedSymbol !== "" && selectIndustry !== "") {
      let filteredData = rowData.filter(
        ({ symbol, sector }) =>
          symbol.toLowerCase().includes(selectedSymbol.toLowerCase()) &&
          sector.includes(selectIndustry.value)
      );
      setPresentData(filteredData);
    }
  }, [selectedSymbol, selectIndustry]);

  // function for changing the sector
  const onChangehandle = (e) => {
    if (e) {
      setSelectIndustry(e);
    }
    if (!e) {
      setSelectIndustry("");
    }
  };

  //geting the sector list
  function getSectors(rowData) {
    let _rowData = [...rowData];
    let sectors = new Set();
    _rowData.map((stock) => {
      return sectors.add(stock.sector);
    });
    return [...sectors];
  }

  // loading status
  if (loading === true) {
    return (
      <div>
        <p>Loading the data</p>
      </div>
    );
  }

  return (
    <>
      <title>All stock</title>
      <div className="listStock">
        <SearchBar
          isClearable={true}
          disablePortal
          onSubmit={setSelectedSymbol}
        />
        <Select
          className="listStock_box"
          labelId="sector"
          id="sector"
          isClearable={true}
          value={selectIndustry}
          onChange={onChangehandle}
          placeholder="Industries.."
          options={sectorName.map((values) => ({
            value: values,
            label: values,
          }))}
        ></Select>
      </div>
      <div
        className="ag-theme-balham"
        style={{
          height: "650px",
          width: "100%",
        }}
      >
        <h2>Nasdaq: 100 companies list</h2>
        <AgGridReact
          columnDefs={columns}
          rowData={presentData}
          pagination={true}
          suppressRowHoverHighlight={true}
          columnHoverHighlight={true}
          paginationAutoPageSize={true}
          overlayNoRowsTemplate={message}
        />
      </div>
    </>
  );
}
export default Stock;
