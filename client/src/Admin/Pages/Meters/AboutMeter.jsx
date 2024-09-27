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
import { useFetch } from "../../../CustomHooks/useFetch";
import { useDate } from "../../../CustomHooks/useDate";
const AboutMeter = () => {
  const { meter_id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meterHistory, setMeterHistory] = useState();
  const [meterReadingHistory, setMeterReadingHistory] = useState([]);
  const { formatDate } = useDate();

  const { data, loading1, error1 } = useFetch(
    `${process.env.REACT_APP_VITE_API_URL_BASE}/meters/${meter_id}`
  );



 


  const getMeterReadings = async () => {
    try {
      setError(false)
      setLoading(true)
      const getReadings = await axios
        .get(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/customer/reading/all/${meter_id}/readings`,
          {
            withCredentials: true,
          },
        )
        .catch((error) => {
          setError('Something went wrong!!')
        });
      if (getReadings.status == 200) {
        setMeterReadingHistory(getReadings.data.data);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      setError('Server error! Please try again later.')
    } finally{
      setLoading(false)
    }
  };

  
  useEffect(() => {
    getMeterReadings();
  }, []);


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
      {loading ? (
        "Loading data ..."
      ) : (
        <>
          {data ? (
            <div className="abt-meters">
              <div className="abt-1">
                <FaUser className="icons" />
                <span>
                  {data.customer?.custFirstName} {data?.customer?.custLastName}
                </span>
              </div>
              <div className="abt-1">
                <FaTachometerAlt className="icons" />
                <span>{data?.meterNumber}</span>
              </div>
              <div className="abt-1">
                <FaLocationDot className="icons" />
                <span>{data?.zones.zoneName}</span>
              </div>
              <div className="abt-1">
                <MdDateRange className="icons" />
                <span>{formatDate (data.createdAt)}</span>
              </div>
            </div>
          ) : (
            <p>Loading data ...</p>
          )}
        </>
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

          {error && <p className="error">{error}</p>}
          <tbody>
            {meterReadingHistory && meterReadingHistory.length > 0 ? (
              meterReadingHistory.map((history, key) => (
                <tr key={key}>
                  <td>{history.meter.meterNumber}</td>
                  <td>{formatDate(history.createdAt)}</td>
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
