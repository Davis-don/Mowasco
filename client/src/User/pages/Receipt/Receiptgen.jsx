import React, { useEffect, useRef, useState } from "react";
import "./Receiptgen.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowRightLong } from "react-icons/fa6";
import logo from "../../../../src/images/logo.jpeg";
import store from "../../../store/dataStore";
import {ReactToPrint} from 'react-to-print'

function Receiptgen() {
const  componentRef  = useRef();
  const user = store((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [receiptData, setReceiptData] = useState();
  const [waterReadings, setWaterReadings] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const generateReceipt = async () => {
    window.print()
  };

  const getWaterReadings = async (meterID) => {
    try {
      setError(false);
      setLoading(true);
      const getData = await axios
        .get(`http://localhost:4000/customer/reading/${meterID}`, {
          withCredentials: true,
        })
        .catch((error) => {
          setError(error.message);
        });
      if (getData.status == 200) {
        setWaterReadings(getData.data.data);
      } else {
        toast.warning("Something went wrong. Please try again later!!");
      }
    } catch (error) {
      setError("Server error ! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getReceipt = async () => {
    try {
      setLoading(true);
      setError(false);

      const getReceiptData = await axios
        .get(`http://localhost:4000/customer/receipt/${id}`, {
          withCredentials: true,
        })
        .catch((error) => {
          setError(error.message);
        });
      if (getReceiptData.status == 200) {
        const receiptData = getReceiptData.data.data;

        const meterID = receiptData.billing.meters.meter_id;
        setReceiptData(receiptData);
        getWaterReadings(meterID);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      setError('Server error! Please try again later!!');
    } finally{
      setLoading(false)
    }
  };

  const navigateBack = () => {
    navigate("/agent/dashboard");
  };

  useEffect(() => {
    getReceipt();
  }, []);
  return (
    <div className="overall-receipt-gen-container">
      {loading ? (
        "Loading ..."
      ) : (
        <div className="gen-water-receipt-form-div">
          <div className="receipt-btn">
            <button onClick={navigateBack}>Home</button>
            <div className="righ">
              <ReactToPrint
                trigger={() => <button>Print/Download</button>}
                content={() => componentRef.current}
              />
              {error && <p className="error">{error}</p>}
            </div>
          </div>

          <div className="toPrint" ref={componentRef}>
            <div className="receipt-invoice">
              <h2>Invoice</h2>
              <div className="name-logo">
                <div className="company-logo">
                  <img src={logo} alt="company logo" />
                </div>{" "}
                <div className="company-name">
                  <h1>Mutitu water project</h1>
                  <h3>
                    <i>Caritas</i>
                  </h3>
                  <span>NYERI, NYANDARUA, AND LAIKIPIA COUNTIES</span>
                </div>
              </div>
              <div className="office-details">
                <div className="office-left">
                  <h4>MAIN OFFICE</h4>
                  <span>Catholic parish Mugunda</span>
                </div>
                <div className="office-contacts">
                  <span>P.O BOX 1 (10129),</span>
                  <span>MUGUNDA</span>
                  <span className="email">
                    <span>Email:</span> mutituwaterproject01@gmail.com
                  </span>
                  <span>Tel: 0741508321</span>
                </div>
              </div>
            </div>

            {receiptData && waterReadings ? (
              <div>
                <div className="receipt-details">
                  <table>
                    <thead className="receipt-tbl">
                      <tr className="tr">
                        <th>Member Name:</th>
                        <td className="td">
                          {receiptData.billing.customer.custFirstName}{" "}
                          {receiptData.billing.customer.custLastName}
                        </td>
                      </tr>

                      <tr className="rows tr" colSpan={2}>
                        <th>Member Number:</th>
                        <td className="td">
                          {receiptData.billing.customer.cust_id}
                        </td>

                        <th>Zone:</th>
                        <td className="td">
                          {receiptData.billing.meters.zones.zoneName}
                        </td>
                      </tr>

                      <tr className="tr" rowspan={2}>
                        <th>Meter Number:</th>
                        <td className="td">
                          {receiptData.billing.meters.meterNumber}
                        </td>
                        <th>Tel:</th>
                        <td className="td">
                          {receiptData.billing.customer.custPhoneNumber}
                        </td>
                      </tr>
                      <tr className="tr">
                        <th>Date of issue</th>
                        <td className="td">{receiptData.createdAt}</td>
                      </tr>
                    </thead>
                  </table>

                  <table border={"1px"}>
                    <thead>
                      <tr>
                        <th colSpan={2}>Consumption Data</th>
                        <th>Billing Details</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td rowspan={2}>Current Reading</td>
                        <td></td>
                        <td>Billing Items</td>
                        <td>Shs.</td>
                      </tr>
                      <tr>
                        <td>{waterReadings.currentReading}</td>
                        <td>Water Sales</td>
                      </tr>
                      <tr>
                        <td rowSpan={2}>Previous Reading</td>
                        <td rowSpan={2}>{waterReadings.prevReading}</td>
                        <td>Arrears</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Reconnection</td>
                      </tr>
                      <tr>
                        <td rowspan={2}>
                          Consumption -{" "}
                          <span>
                            M <sup>3</sup>
                          </span>
                        </td>
                        <td rowSpan={2}>{waterReadings.consumption}</td>
                        <td>July 14 2024</td>
                        <td>{receiptData.billing.amountDue}</td>
                      </tr>
                      <tr>
                        <td>Other charges</td>
                      </tr>
                      <tr>
                        <td rowSpan={3} colSpan={2}>
                          <span>Domestic:</span> <br />
                          <span>TOWNSHIP:</span> <br />
                          <span>INSTITUTION:</span> <br />
                          <span>Due Date:</span> br
                        </td>
                        <td>Adjustments</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Total Charges</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Less Payment</td>
                      </tr>
                      <tr>
                        <td>
                          Served by :{" "}
                          <span className="server">
                            {user.first_name} {user.lastName}
                          </span>
                        </td>
                        <td></td>
                        <td>Total amount:</td>
                        <td>{receiptData.billing.amountDue}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bottom">
                  <h4>MPESA PAYBILL</h4>
                  <div className="payment-process">
                    <div className="steps">
                      <FaArrowRightLong className="next" />{" "}
                      <span>LIPA NA MPESA</span>
                      <FaArrowRightLong className="next" /> <span>PAYBILL</span>
                      <FaArrowRightLong className="next" />{" "}
                      <span>BUSSINESS NUMBER: 522522</span>
                    </div>
                    <div className="account">
                      <span>
                        ACCOUNT No. 6243794 #......customer payment
                        number........
                      </span>
                      <FaArrowRightLong className="next" /> <span>AMOUNT</span>{" "}
                      <FaArrowRightLong className="next" />
                      <span>PIN</span>
                    </div>
                  </div>
                </div>
                <p className="notice">
                  This utility is payable within fourteen days from date of
                  issue. Your supply is liable for disconnestion without any
                  further notice. Should your supply be disconnected, in
                  addition to settling the bill you will be charged reconnection
                  bill of <span>Ksh. 2000</span>{" "}
                </p>
                <p className="receipt-no">{receiptData.receiptNumber}</p>
              </div>
            ) : (
              <p>Loading data ....</p>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Receiptgen;
