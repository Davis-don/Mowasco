import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegUser, FaUser } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import "./createmeters.css";
import { MdDateRange } from "react-icons/md";
import axios, { Axios } from "axios";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { VITE_API_URL_BASE } from "../../../Utils/config";
const AboutMeter = () => {
  const {meter_id} = useParams()
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meterHistory, setMeterHistory] = useState()

    useEffect(() => {
      const meterData = async () => {
        try {
          const meterDetails = await axios
            .get(
              `${process.env.REACT_APP_VITE_API_URL_BASE}/meters/${meter_id}`
            )
            .catch((errors) => console.log(errors));
          if (meterDetails.status == 200) {
            console.log("meter details", meterDetails);
            setMeterHistory(meterDetails.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      if (meter_id) meterData();
    }, [meter_id]);
  
    const getMeterReadings = async () => {
      try {
        const getReadings = await axios.get(`${process.env.REACT_APP_VITE_API_URL_BASE}/`)
        
      } catch (error) {
        console.log(error)
      }
    }




  return (
    <div>
      <div className="cust-top">
        <span>
          <Link className="link" to={"/manage-meters"}>
            {" "}
            Meters
          </Link>
          <MdNavigateNext /> <span>Meter History</span>
        </span>
      </div>
      <h4 style={{ textAlign: "center", marginTop: "1rem" }}>Meter History</h4>

      {meterHistory ? (
        <div className="abt-meters">
          <div className="abt-1">
            <FaUser className="icons" />
            <span>
              {meterHistory.customer.custFirstName}
              {meterHistory.customer.custLastName}
            </span>
          </div>
          <div className="abt-1">
            <FaTachometerAlt className="icons" />
            <span>{meterHistory.meterNumber}</span>
          </div>
          <div className="abt-1">
            <FaLocationDot className="icons" />
            <span>{meterHistory.zones.zoneName}</span>
          </div>
          <div className="abt-1">
            <MdDateRange className="icons" />
            <span>{meterHistory.createdAt}</span>
          </div>
        </div>
      ) : (
        <p>Loading data ...</p>
      )}

      <div className="mtrs-form">
        <h5>Meter water reading history</h5>
        <table>
          <thead>
            <tr>
              <th>Reading date</th>
              <th>Current Reading</th>
              <th>Previous Reading</th>
              <th>Consumption</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>

        {/* <form action=""  onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              className="form-control"
              type="text"
              name="fName"
              value={formik.values.fName}
              placeholder="First name"
              required
            />
          </div>
          <div className="inputs">
            <input
              type="text"
              name="lName"
              className="form-control m-2"
              value={formik.values.lastName}
              placeholder="Last name"
              required
            />
          </div>

          <div className="inputs">
            <input
              type="number"
              name="IDNumber"
              className="form-control m-2"
              value={formik.values.IDNumber}
              placeholder="ID number"
              required
            />
          </div>
          <div className="inputs">
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone number"
              className="form-control m-2"
              value={formik.values.phoneNumber}
              required
            />
          </div>
          <div className="inputs">
            <input
              type="text"
              name="connectionType"
              placeholder="Connection type"
              className="form-control m-2"
              value={formik.values.connectionType}
              required
            />
          </div>
          <div className="adduser-button">
            <button className="btn btn-outline-primary">
              {loading ? "Submitting...." : "Submit"}
            </button>
          </div>
          <ToastContainer />
        </form> */}
      </div>
    </div>
  );
};

export default AboutMeter;
