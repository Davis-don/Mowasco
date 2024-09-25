import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import "./newCustomer.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
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
        .get(`http://localhost:4000/customers/${cust_id}`)
        .catch((error) => console.log(error));
      if (customerData.status == 200) {
        setCustomer(customerData.data.data);
        console.log(customerData.data.data);
      } else {
        toast.warn("Something went wrong", { position: "bottom-center" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {};

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

      <form action="" onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            className="form-control"
            type="text"
            name="fName"
            value={formik.values.fName}
            placeholder="First name"
            onChange={(e) => setFName(e.target.value)}
            required
          />
        </div>
        <div className="inputs">
          <input
            type="text"
            name="lName"
            className="form-control m-2"
            value={formik.values.lName}
            placeholder="Last name"
            onChange={(e) => setLName(e.target.value)}
            required
          />
        </div>

        <div className="inputs">
          <input
            type="number"
            name="IDNumber"
            className="form-control m-2"
            value={formik.values.IDNumber}
            placeholder="ID number"
            onChange={(e) => setIDNumber(e.target.value)}
            required
          />
        </div>
        <div className="inputs">
          <input
            type="number"
            name="phoneNumber"
            placeholder="Phone number"
            className="form-control m-2"
            value={formik.values.phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="inputs">
          <input
            type="text"
            name="connectionType"
            placeholder="Connection type"
            className="form-control m-2"
            value={formik.values.connectionType}
            onChange={(e) => setConnectionType(e.target.value)}
            required
          />
        </div>
        <div className="adduser-button">
          <button className="btn btn-outline-primary">
            {loading ? "Submitting...." : "Submit"}
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default UpdateCustomer;
