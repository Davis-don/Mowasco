import React, { useEffect, useState } from "react";
import "./Receiptgen.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowRightLong } from "react-icons/fa6";
function Receiptgen() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [receiptData, setReceiptData] = useState();
  const [waterReadings, setWaterReadings] = useState();

  const handleSubmit = async () => {};

  const getWaterReadings = async (meterID) => {
    try {
      const getData = await axios
        .get(`http://localhost:4000/customer/reading/${meterID}`)
        .catch((error) => console.log(error));

      if (getData.status == 200) {
        console.log("water readings", getData.data.data);
        setWaterReadings(getData.data.data);
      } else {
        toast.warning("Something went wrong. Please try again later!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getReceipt = async () => {
    try {
      const getReceiptData = await axios
        .get(`http://localhost:4000/customer/receipt/${id}`)
        .catch((error) => console.log(error));
      console.log("receipt data", getReceiptData.data.data);
      if (getReceiptData.status == 200) {

        const receiptData = getReceiptData.data.data;
        console.log('receipt data', receiptData)
        const meterID = receiptData.billing.meters.meter_id;
        setReceiptData(receiptData);
        getWaterReadings(meterID);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateBack = () => {
navigate('Account/login');
  }

  useEffect(() => {
   getReceipt()
  },[])
  return (
    <div className="overall-receipt-gen-container">
      <div className="gen-water-receipt-form-div">
        <button onClick={navigateBack}>
          
            Home
          
        </button>

        <div className="receipt-invoice">
          <h2>Invoice</h2>
          <div className="name-logo">
            <img src="" alt="company logo" />
            <h1>Mutitu water project</h1>
            <h3>Caritas</h3>
            <span>NYERI, NYANDARUA, AND LAIKIPIA COUNTIES</span>
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
                  <tr>
                    <th>Member Name:</th>
                    <td>
                      {receiptData.billing.customer.custFirstName}{" "}
                      {receiptData.billing.customer.custLastName}
                    </td>
                  </tr>

                  <tr className="rows" colSpan={2}>
                    <th>Member Number:</th>
                    <td>{receiptData.billing.customer.cust_id}</td>

                    <th>Zone:</th>
                    <td>{receiptData.billing.meters.zones.zoneName}</td>
                  </tr>

                  <tr rowspan={2}>
                    <th>Meter Number:</th>
                    <td>{receiptData.billing.meters.meterNumber}</td>
                    <th>Tel:</th>
                    <td>{receiptData.billing.customer.custPhoneNumber}</td>
                  </tr>
                  <tr>
                    <th>Date of issue</th>
                    <td>{receiptData.createdAt}</td>
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
                      <span>Domestic:</span>
                      <span>TOWNSHIP:</span>
                      <span>INSTITUTION:</span>
                      <span>Due Date:</span>
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
                    <td>Server</td>
                    <td></td>
                    <td>Total amount:</td>
                    <td>{receiptData.billing.amountDue}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bottom">
              <h4>MPESA PAYBILL</h4>
              <div className="steps">
                <FaArrowRightLong /> <span>LIPA NA MPESA</span>
                <FaArrowRightLong /> <span>PAYBILL</span>
                <FaArrowRightLong /> <span>BUSSINESS NUMBER: 522522</span>
              </div>
              <span>
                ACCOUNT No. 6243794 #......customer payment number........
              </span>
              <FaArrowRightLong /> <span>AMOUNT</span> <FaArrowRightLong />
              <span>PIN</span>
            </div>
            <p>
              This utility is payable within fourteen days from date of issue.
              Your supply is liable for disconnestion without any further
              notice. Should your supply be disconnected, in addition to
              settling the bill you will be charged reconnection bill of{" "}
              <span>Ksh. 2000</span>{" "}
            </p>
            <span>{receiptData.receiptNumber}</span>
          </div>
        ) : (
          <p>Loading data ....</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Receiptgen;
