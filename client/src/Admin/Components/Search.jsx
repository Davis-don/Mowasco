import React from "react";
import { IoFilterSharp } from "react-icons/io5";
import "./global.css";
const Search = ({ search }) => {
  return (
    <div className="search-filter">
      <div className="search">
        <input
          className="search-input"
          type="text"
          name="fName"
          value={""}
          placeholder="Search customer.."
          onChange={""}
          required
        />
        <button>{""}</button>
      </div>
      <div className="search-filter-left">
        <div className="filter">
          <IoFilterSharp className="filter-icon" />
          <span>Filter</span>
        </div>
        <button type="button" onClick={"addNewCustomer"}>
          Add customer
        </button>
      </div>
    </div>
  );
};

export default Search;
