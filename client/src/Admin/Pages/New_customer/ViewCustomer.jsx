import React, { useEffect, useState } from "react";
import "./newCustomer.css";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import { MdDateRange } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaOrcid } from "react-icons/fa";
import { GiPipes } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";
const ViewCustomer = () => {
  const { cust_id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState();


  const moreAboutCustomer = async () => {
    try {
      const customerData = await axios
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/customers/${cust_id}`, {
          withCredentials:true
        })
        .catch((error) => console.log(error));
      if (customerData.status == 200) {
        console.log(customerData.data.data)
        setCustomer(customerData.data.data);
      } else {
        toast.warn("Something went wrong", { position: "bottom-center" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const formatDate = (createAT) => {
      const date = new Date(createAT);
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        year: "numeric",
        month: "long",
      });
      return formattedDate; // Output: "September 2024"
    };

  }, [customer]);

  useEffect(() => {
    moreAboutCustomer();
  }, []);
  return (
    <div className="cust-details">
      <div className="cust-top">
        <span>
          <Link className="link" to={"/manage-customers"}>
            Customers
          </Link>
          <MdNavigateNext /> View Customer{" "}
        </span>
      </div>
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
        Customer Details
      </h2>

      <div className="abt-meters">
        <div className="abt-1">
          <FaUser className="icons" />
          <span>
            {customer?.custFirstName} {customer?.custLastName}
          </span>
        </div>
        <div className="abt-1">
          <FaTachometerAlt className="icons" />
          <span>{customer?.meters.meterNumber}</span>
        </div>
        <div className="abt-1">
          <FaLocationDot className="icons" />
          <span>{customer?.meters?.zones.zoneName}</span>
        </div>
        <div className="abt-1">
          <MdDateRange className="icons" />
          <span>{customer?.createdAt}</span>
        </div>
      </div>

      <div className="abt-meters">
        <div className="abt-1">
          <FaPhoneAlt className="icons" />
          <span>{customer?.custPhoneNumber}</span>
        </div>
        <div className="abt-1">
          <FaOrcid className="icons" />
          <span>{customer?.custID}</span>
        </div>
        <div className="abt-1">
          <GiPipes className="icons" />
          <span>{customer?.custConnectionType}</span>
        </div>
        <div className="abt-1">
          <GrStatusGood className="icons" />
          <span>{customer?.custStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
