import React from "react";
import "./water_reading.css";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
    <div className="water-readings">
      <div className="cust-top">
        <h4>Water Readings</h4>
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
      </div>
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>Meter Readings</h2>
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
  );
};

export default WaterReading;
