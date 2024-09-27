import React, { useEffect, useState } from "react";
import "./billing_payment.css";
import { MdNavigateNext } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import * as Yup from "yup";
import { IoFilterSharp } from "react-icons/io5";

const Billing_payment = () => {
  const navigate = useNavigate();
  const [customerBills, setCustomerBills] = useState([]);
  const [error, setError] = useState()
  const [loading,setLoading] = useState()


  const viewCustomerBill = async (id) => {
    try {
      navigate(`/customer-bill/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerBills = async () => {
    try {
      setLoading(true)
      setError(false)
      let getBills = await axios
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/customer/bill/all`, {
          withCredentials:true
        })
        .catch((error) => {
          console.log(error)
          setError('Something went wrong!')
        });
      if (getBills.status == 200) {
        setCustomerBills(getBills.data.data);
        console.log('bill', getBills.data.data )
      } else {
        toast.warn("Something went wrong", { position: "bottom-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error('Server error! Please try again later', {position: 'bottom-center'})
      setError('Server error. Please try again later.')
    } finally{
      setLoading(false)
    }
  };
 


  useEffect(() => {
    getCustomerBills();
  }, []);
  return (
    <div className="customer-bills">
      <div className="cust-top">
        <span>Bills</span>
      </div>

      <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
        Customers Bills
      </h4>
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

      {loading ? (
        "Loading..."
      ) : (
        <table>
          <tr>
            <th>Meter No.</th>
            <th>Customer Number</th>
            <th>Zone</th>
            <th>First name</th>
            <th>Last Name</th>
            {/*  <th>Water bill</th>
            <th>Reconnection</th> */}
            <th>Other charges</th>
            <th>Total bill</th>
            <th>View</th>
          </tr>

          {customerBills && customerBills.length > 0 ? (
            customerBills.map((cstBill, key) => (
              <tr>
                <td>{cstBill.meters.meterNumber}</td>
                <td>{cstBill.customer.cust_id}</td>
                <td>{cstBill.meters.zones.zoneName}</td>
                <td>{cstBill.customer.custFirstName}</td>
                <td>{cstBill.customer.custLastName}</td>
                <td>{cstBill.otherCharges}</td>
                <td>{cstBill.amountDue}</td>

                <td>
                  {<FaEye onClick={() => viewCustomerBill(cstBill.bill_id)} />}
                </td>
              </tr>
            ))
          ) : (
            <p>Loading bills...</p>
          )}
        </table>
      )}
    </div>
  );
};

export default Billing_payment;
