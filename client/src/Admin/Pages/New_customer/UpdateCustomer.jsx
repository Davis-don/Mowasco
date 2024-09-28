import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import "./newCustomer.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import Footer from "../../Components/Footer";
const UpdateCustomer = () => {
  const { cust_id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [IDNumber, setIDNumber] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [connectionType, setConnectionType] = useState("");
  const [customer, setCustomer] = useState([]);

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

  const getCustomerDetails = async () => {
    try {
      const customerData = await axios
        .get(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/customers/${cust_id}`,
          {
            withCredentials: true,
          }
        )
        .catch((error) => console.log(error));
      if (customerData.status == 200) {
        setCustomer(customerData.data.data);
      } else {
        toast.warn("Something went wrong", { position: "bottom-center" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (values) => {
    console.log(values)
  };

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      IDNumber: "",
      phoneNumber: "",
      connectionType: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validation,
  });

  useEffect(() => {
    const loadDetails = () => {
      console.log("first name", customer);
      if (customer) {
        formik.setValues({
          fName: customer.custFirstName,
          lName: customer.custLastName,
          IDNumber: customer.custID,
          phoneNumber: customer.custPhoneNumber,
          connectionType: customer.custConnectionType,
        });
      }
    };
    loadDetails();
  }, [customer]);

  useEffect(() => {
    getCustomerDetails();
  }, []);
  return (
    <div>
      <div className="cust-top">
        <span>
          <Link className="link" to={"/manage-customers"}>
            Customers
          </Link>{" "}
          <MdNavigateNext /> Update Details{" "}
        </span>
      </div>
      <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
        Update Customer Details.
      </h4>
      <div className="forms">
        <form
          action=""
          className="update_customer"
          onSubmit={formik.handleSubmit}
        >
          <div className="inputs">
            <label>First Name:</label>
            <input
              className="form-control"
              type="text"
              onBlur={formik.handleBlur}
              name="fName"
              value={formik.values.fName}
              onChange={formik.handleChange}
              placeholder="First name"
              // onChange={(e) => setFName(e.target.value)}
              required
            />
          </div>
          <div className="inputs">
            <label>Last Name:</label>
            <input
              type="text"
              name="lName"
              className="form-control"
              value={formik.values.lName}
              onBlur={formik.handleBlur}
              placeholder="Last name"
              onChange={formik.handleChange}
              // onChange={(e) => setLName(e.target.value)}
              required
            />
          </div>

          <div className="inputs">
            <label>ID Name:</label>
            <input
              type="number"
              name="IDNumber"
              className="form-control"
              value={formik.values.IDNumber}
              placeholder="ID number"
              onChange={formik.handleChange}
              // onChange={(e) => setIDNumber(e.target.value)}
              onBlur={formik.handleBlur}
              required
            />
          </div>
          <div className="inputs">
            <label>Phone number:</label>

            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone number"
              className="form-control"
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              // onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="inputs">
            <label>Connection type:</label>

            <input
              type="text"
              name="connectionType"
              placeholder="Connection type"
              className="form-control"
              value={formik.values.connectionType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // onChange={(e) => setConnectionType(e.target.value)}
              required
            />
          </div>
          <div className="adduser-button">
            <button>{loading ? "Updating details..." : "Update"}</button>
          </div>
          <ToastContainer />
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default UpdateCustomer;
