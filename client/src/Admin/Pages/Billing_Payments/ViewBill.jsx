import React, { useEffect, useState } from 'react';
import "./billing_payment.css";
import { MdNavigateNext } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MdDateRange } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const ViewBill = () => {
  const {bill_id} = useParams()
  const navigate = useNavigate()
    const [error, setError] = useState(false);
    const [customerBillHistory, setCustomerBillHistory] = useState()
    const [billingHistory, setBillingHistory] = useState([])
 

  const getCustomerDetails = async () => {
    try {
      const getBills = await axios.get(
        `${process.env.REACT_APP_VITE_API_URL_BASE}/customer/bill/${bill_id}`
      ).catch(error => console.log(error))

      if(getBills.status == 200) {
        const custData = getBills.data.data
        const custID = custData.customer.cust_id;
        setCustomerBillHistory(custData)
        getAllCustomerBills(custID)
      } else{
        toast.warn('Something went wrong.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllCustomerBills = async (id) => {
    try {
      const getAllBills = await axios.get(
        `${process.env.REACT_APP_VITE_API_URL_BASE}/customer/bill/customer/all/${id}`
      ).catch(error => console.log(error))
      if (getAllBills.status == 200) {
        console.log('all bills', getAllBills.data.data)
        setBillingHistory(getAllBills.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const generateInvoice = (id) => {
    try {
      navigate(`/customer/meter/receipt/${id}`);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
getCustomerDetails()
  }, [bill_id])
    return (
      <div>
        <div className="cust-top">
          <span>
            <Link className="link" to={"/billing-payment"}>
              Bills
            </Link>{" "}
            <MdNavigateNext /> Customer Bills{" "}
          </span>
        </div>
        <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
          Customers Bills
        </h2>
        {customerBillHistory ? (
          <div className="abt-meters">
            <div className="abt-1">
              <FaUser className="icons" />
              <span>
                {customerBillHistory.customer.custFirstName}
                {customerBillHistory.customer.custLastName}
              </span>
            </div>
            <div className="abt-1">
              <FaTachometerAlt className="icons" />
              <span>{customerBillHistory.customer.meters.meterNumber}</span>
            </div>
            <div className="abt-1">
              <FaLocationDot className="icons" />
              <span>{customerBillHistory.customer.meters.zones.zoneName}</span>
            </div>
            <div className="abt-1">
              <MdDateRange className="icons" />
              <span>{customerBillHistory.billingDate}</span>
            </div>
          </div>
        ) : (
          <p>Loading data ...</p>
        )}

        <span>Customer bills history</span>

        <table>
          <thead>
            <tr>
              <th>Billing Date</th>
              <th>Consumption</th>
              <th>Arrears</th>
              <th>Water bill</th>
              <th>Reconnection</th>
              <th>Other charges</th>
              <th>Total bill</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory && billingHistory.length > 0 ? (
              billingHistory.map((blHistory, key) => (
                <tr key={key}>
                  <td>{blHistory.billingDate}</td>
                  <td>{blHistory.consumption}</td>
                  <td>{blHistory.arrears}</td>
                  <td>{blHistory.waterBill}</td>
                  <td>{blHistory.reconnection}</td>
                  <td>{blHistory.otherCharges}</td>
                  <td>{blHistory.amountDue}</td>
                  <td
                    onClick={() =>
                      generateInvoice(blHistory.receipts.receipt_id)
                    }
                  >
                    <span className="invoice">Invoice</span>
                  </td>
                </tr>
              ))
            ) : (
              <p>Loading bills ...</p>
            )}
          </tbody>
        </table>
      </div>
    );
}


export default ViewBill;