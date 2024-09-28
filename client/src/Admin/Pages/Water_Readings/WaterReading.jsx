import React from "react";
import "./water_reading.css";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoFilterSharp } from "react-icons/io5";
import Footer from "../../Components/Footer";

const WaterReading = () => {
  const navigate = useNavigate();

  const viewMeterHistory = async () => {
    try {
      navigate("/meter-readings-history");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div className="water-readings">
      <div className="cust-top">
        <span>Water Readings</span>
      </div>
      <h4 style={{ textAlign: "center", marginTop: "1rem" }}>Meter Readings</h4>
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
          <button>Search</button>
        </div>
        <div className="search-filter-left">
          <div className="filter">
            <IoFilterSharp className="filter-icon" />
            <span>Filter</span>
          </div>
        </div>
      </div>
      <table>
        <tr>
          <th>Meter No.</th>
          <th>Zone</th>
          <th>Customer Names</th>
          <th>Current Reading</th>
          <th>Reading date</th>
          <th>View</th>
        </tr>
        <tr>
          <td>1001</td>
          <td>2</td>
          <td>Wilfred Kiama</td>
          <td>12.43</td>
          <td>12th may, 2024</td>
          <td>{<FaHistory onClick={viewMeterHistory} />}</td>{" "}
        </tr>
      </table>
    </div>
    <Footer/>
    </>
    
  );
};

export default WaterReading;
