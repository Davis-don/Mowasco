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
const AboutMeter = () => {
  const { meter_id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meterHistory, setMeterHistory] = useState();
  const [meterReadingHistory, setMeterReadingHistory] = useState([]);

  useEffect(() => {
    const meterData = async () => {
      try {
        const meterDetails = await axios
          .get(
            `${process.env.REACT_APP_VITE_API_URL_BASE}/meters/${meter_id}`,
            {
              withCredentials: true,
            }
          )
          .catch((errors) => console.log(errors));
        if (meterDetails.status == 200) {
          setMeterHistory(meterDetails.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (meter_id) meterData();
    getMeterReadings();
  }, [meter_id]);

  const getMeterReadings = async () => {
    try {
      const getReadings = await axios
        .get(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/customer/reading/all/${meter_id}/readings`,
          {
            withCredentials: true,
          }
        )
        .catch((error) => console.log(error));
      if (getReadings.status == 200) {
        setMeterReadingHistory(getReadings.data.data);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <th>Meter No.</th>
              <th>Reading date</th>
              <th>Current Reading</th>
              <th>Previous Reading</th>
              <th>Consumption</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {meterReadingHistory && meterReadingHistory.length > 0 ? (
              meterReadingHistory.map((history, key) => (
                <tr key={key}>
                  <td>{history.meter.meterNumber}</td>
                  <td>{history.createdAt}</td>
                  <td>{history.currentReading}</td>
                  <td>{history.prevReading}</td>
                  <td>{history.consumption}</td>
                  <td>{history.amount}</td>
                </tr>
              ))
            ) : (
              <p className="error">No water readings recorded.</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutMeter;
