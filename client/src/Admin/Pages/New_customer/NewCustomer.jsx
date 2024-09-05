import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";

const NewCustomer = () => {
  const [serverMessage, setServerMessage] = useState("");
  const [displayServerComponent, setServerComponent] = useState(false);

  
   const handleSubmit = async (values) => {
    try {
      const postUser = await axios
        .post("http://localhost:4000/customers/create", {
          custMeterNumber: values.meterNumber,
          custZone: values.zone,
          custFirstName: values.fName,
          custLastName: values.lName,
          custID: values.IDNumber,
          custPhoneNumber: values.phoneNumber,
          custConnectionType: values.connectionType,
          custStatus: values.status
        })
        .catch((error) => console.log(error));

      console.log(postUser)
      
    } catch (error) {
      console.log(error)
    }
   };

  const formik = useFormik({
    initialValues: {
      meterNumber: "",
      zone: "",
      fName: "",
      lName: "",
      IDNumber: "",
      phoneNumber: "",
      connectionType:'',
      status: "",
    },
    onSubmit:handleSubmit
  });


 
  
  return (
    <div className="overall-add-user-container">
      <div className="form-encapsulator">
        <h2 style={{ textAlign: "center" }}>Create Account</h2>
        {displayServerComponent && (
          <div class="alert alert-info">
            <strong>{serverMessage}</strong>
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <input
            onChange={formik.handleChange}
            name="meterNumber"
            required
            value={formik.meterNumber}
            type="text"
            placeholder="Meter number"
            className="form-control m-2"
          />
          <select
            onChange={formik.handleChange}
            name="zone"
            value={formik.zone}
            className="form-control m-2"
          >
            <option value="">Zone Area</option>
            <option value="1">Zone 1</option>
            <option value="2">Zone 2</option>
            <option value="3">Zone 3</option>
            <option value="4">Zone 4</option>
          </select>
          <input
            onChange={formik.handleChange}
            name="fName"
            value={formik.fName}
            required
            type="text"
            placeholder="First Name"
            className="form-control m-2"
          />
          <input
            onChange={formik.handleChange}
            name="lName"
            value={formik.lName}
            required
            type="text"
            placeholder="Last Name"
            className="form-control m-2"
          />
          <input
            onChange={formik.handleChange}
            name="IDNumber"
            value={formik.IDNumber}
            required
            type="number"
            placeholder="National ID number"
            className="form-control m-2"
          />
          <input
            required
            onChange={formik.handleChange}
            name="phoneNumber"
            value={formik.phoneNumber}
            type="number"
            placeholder="Phone number"
            className="form-control"
            // pattern="(\+2547[0-9]{8}|\+2541[0-9]{8}|07[0-9]{8}|01[0-9]{8})"
            // title="Please enter a valid Kenyan phone number"
          />

          <input
            type="text"
            className="form-control"
            name="connectionType"
            value={formik.connectionType}
            onChange={formik.handleChange}
            placeholder="Connection type"
          />
          <select
            onChange={formik.handleChange}
            name="status"
            value={formik.status}
            className="form-control m-2"
          >
            <option value="">status</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>

          <div className="adduser-button">
            <button className="btn btn-outline-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCustomer;
