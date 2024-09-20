import React, { useState } from 'react';
import "./billing_payment.css";
import { MdNavigateNext } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MdDateRange } from "react-icons/md";
import { FaRegUser, FaUser } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import * as Yup from "yup";


const ViewBill = () => {
    const [error, setError] = useState(false);
    const [customerBillHistory, setCustomerBillHistory] = useState([])
    const [loading, setLoading] = useState(false);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [IDNumber, setIDNumber] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [connectionType, setConnectionType] = useState("");
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
    return (
      <div>
        <div className="cust-top">
          <h4>
            Bills <MdNavigateNext /> Customer Bills{" "}
          </h4>
        </div>
        <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
          Customers Bills
        </h2>
        {customerBillHistory && customerBillHistory.length > 0 ? (
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
              <span>{customerBillHistory.meterNumber}</span>
            </div>
            <div className="abt-1">
              <FaLocationDot className="icons" />
              <span>{customerBillHistory.zones.zoneName}</span>
            </div>
            <div className="abt-1">
              <MdDateRange className="icons" />
              <span>{customerBillHistory.createdAt}</span>
            </div>
          </div>
        ) : (
          <p>Loading data ...</p>
        )}
      </div>
    );
}


export default ViewBill;