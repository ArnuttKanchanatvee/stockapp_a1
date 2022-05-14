import { useState } from "react";

export function SearchBar(props) {
  const [innerSerach, setInnerSeatch] = useState("");

  const regex = /[A-Za-z]/;
  function validate(e) {
    const chars = e.target.value.split("");
    const char = chars.pop();
    if (!regex.test(char)) {
      setInnerSeatch((e.target.value = chars.join("")));
    }
  }
  return (
    <>
      <input
        aria-labelledby="search-button"
        name="search"
        type="search"
        placeholder="Stock Symbol"
        value={innerSerach}
        maxLength="10"
        onChange={(e) => {
          if (e) {
            validate(e);
            setInnerSeatch(e.target.value.toUpperCase());
          }
          if (e.target.value === "") {
            setInnerSeatch("");
          }
        }}
      />
      <button
        type="button"
        onClick={() => {
          props.onSubmit(innerSerach);
        }}
      >
        Search
      </button>
    </>
  );
}
