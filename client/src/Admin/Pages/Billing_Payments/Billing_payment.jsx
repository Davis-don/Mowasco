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

  const viewCustomerBill = async () => {
    try {
      navigate("/customer-bill");
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerBills = async () => {
    try {
      let getBills = await axios
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/customer/bill/all`)
        .catch((error => console.log(error)));
      if (getBills.status == 200) {
        console.log(getBills);
        setCustomerBills(getBills.data.data);
      } else {
        toast.warn("Something went wrong", { position: "bottom-center" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validation = Yup.object({
    meterNumber: Yup.number().required("Please provide a meter number"),
    zone: Yup.number().required("Please provide a zone"),
    fName: Yup.string().required("Please provide customer first name."),
    lName: Yup.string().required("Please provide customers last name"),
    IDNumber: Yup.number().required(
      "Please provide national indentification number."
    ),
    phoneNumber: Yup.number().required("Provide customers phone number."),
    connectionType: Yup.string().required("Provide the connection type."),
  });

  const handleSubmit = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      fName: "",
      lastName: "",
      IDNumber: "",
      phoneNumber: "",
      connectionType: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validation,
  });

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

      <table>
        <tr>
          <th>Meter No.</th>
          <th>Customer Number</th>
          <th>First name</th>
          <th>Last Name</th>
          <th>Arrears</th>
          <th>Water bill</th>
          <th>Reconnection</th>
          <th>Other charges</th>
          <th>Total bill</th>
          <th>View</th>
        </tr>

        {customerBills && customerBills.length > 0 ? (
          customerBills.map((cstBill, key) => (
            <tr>
              <td>{cstBill.meters.meterNumber}</td>
              <td>{cstBill.customer.cust_id}</td>
              <td>{cstBill.customer.custFirstName}</td>
              <td>{cstBill.customer.custLastName}</td>
              <td>{cstBill.arrears}</td>
              <td>{cstBill.waterBill}</td>
              <td>{cstBill.reconnection}</td>
              <td>{cstBill.otherCharges}</td>
              <td>{cstBill.amountDue}</td>

              <td>{<FaEye onClick={viewCustomerBill} />}</td>
            </tr>
          ))
        ) : (
          <p>Loading bills...</p>
        )}
      </table>
    </div>
  );
};

export default Billing_payment;
