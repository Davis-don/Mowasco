import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
const AddNewCustomers = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
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
      "Please provide national indentification number.",
    ),
    phoneNumber: Yup.number().required("Provide customers phone number."),
    connectionType: Yup.string().required("Provide the connection type."),
  });

  const handleSubmit = async (e) => {
    // navigate("/newTestFile");
    e.preventDefault();
    try {
      setLoading(true);
      const postUser = await axios
        .post(`${process.env.REACT_APP_VITE_API_URL_BASE}/customers/create`, {
          custFirstName: fName,
          custLastName: lName,
          custID: parseInt(IDNumber),
          custPhoneNumber: parseInt(phoneNumber),
          custConnectionType: connectionType,
        }, {
          withCredentials:true
        })
        .catch((error) => {
          console.log(error);
          toast.error("Server error!. Please try again later.", {
            position: "top-center",
          });
          setError(error);
        });

      if (postUser.status == 200) {
        toast("Sucessfull.", { position: "top-center" });
        const userData = postUser.data.data;
        const userID = userData.cust_id;
        navigate(`/customer/${userID}/assign-meter`);
      } else {
        toast.warn("something went wrong. Try again later.", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log("error", error);
      setError(error);
    } finally {
      setLoading(false);
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
        <span>
          <Link className="link" to={"/manage-customers"}>
            Customers
          </Link>
          <MdNavigateNext /> New Customer{" "}
        </span>
      </div>
      <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
        Register a new Customer
      </h4>

      <div className="forms">
        <form action="" className="update_customer" onSubmit={handleSubmit}>
          <div className="inputs">
            <label htmlFor="fName">First Name:</label>
            <input
              className="form-control"
              type="text"
              name="fName"
              value={fName}
              placeholder="First name"
              onChange={(e) => setFName(e.target.value)}
              required
            />
          </div>
          <div className="inputs">
            <label htmlFor="fName">Last Name:</label>

            <input
              type="text"
              name="lName"
              className="form-control"
              value={lName}
              placeholder="Last name"
              onChange={(e) => setLName(e.target.value)}
              required
            />
          </div>

          <div className="inputs">
            <label htmlFor="fName">ID No.:</label>

            <input
              type="number"
              name="IDNumber"
              className="form-control"
              value={IDNumber}
              placeholder="ID number"
              onChange={(e) => setIDNumber(e.target.value)}
              required
            />
          </div>
          <div className="inputs">
            <label htmlFor="fName">Phone Number:</label>

            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone number"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="inputs">
            <label htmlFor="fName">Connection type</label>

            <input
              type="text"
              name="connectionType"
              placeholder="Connection type"
              className="form-control"
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value)}
              required
            />
          </div>
          <div className="adduser-button">
            <button>
              {loading ? "Registering...." : "Register"}
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default AddNewCustomers;
