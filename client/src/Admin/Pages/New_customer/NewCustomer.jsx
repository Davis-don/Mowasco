import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup'

import { useFormik } from "formik";

const NewCustomer = () => {
  const [serverMessage, setServerMessage] = useState("");
  const [displayServerComponent, setServerComponent] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validation = Yup.object({
    meterNumber: Yup.number().required('Please provide a meter number').max(10, 'A meter number can only have 10 digits').min(7, 'A meter number cannot have less that 8 characters.'),
    zone: Yup.number().required('Please provide a zone'),
    fName: Yup.string().required('Please provide customer first name.'),
    lName: Yup.string().required('Please provide customers last name'),
    IDNumber:Yup.number().required('Please provide national indentification number.'),
    phoneNumber: Yup.number().required('Provide customers phone number.'),
    connectionType:Yup.string().required('Provide the connection type.'),
  });
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const postUser = await axios
        .post("http://localhost:4000/customers/create", {
          custMeterNumber: values.meterNumber,
          custZone: values.zone,
          custFirstName: values.fName,
          custLastName: values.lName,
          custID: values.IDNumber,
          custPhoneNumber: values.phoneNumber,
          custConnectionType: values.connectionType,
        })
        .catch((error) => {
          console.log("dsjsdjk", error);
          toast.error("Server error!. Please try again later.", {
            position: "top-center",
          });
          setError(error);
          return;
        });

      if (postUser.status == 200) {
        toast("Sucessfull.", { position: "top-center" });
      } else{
      toast.warn("something went wrong. Try again later.", { position: "bottom-center" });
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
      meterNumber: "",
      zone: "",
      fName: "",
      lName: "",
      IDNumber: "",
      phoneNumber: "",
      connectionType: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validation
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
          <div>
            <input
              onChange={formik.handleChange}
              name="meterNumber"
              value={formik.meterNumber}
              type="text"
              placeholder="Meter number"
              className="form-control m-2"
              onBlur={formik.handleBlur}
            />
            {formik.touched.meterNumber && formik.errors.meterNumber && (
              <p>{formik.errors.meterNumber}</p>
            )}
          </div>

          <div>
            <select
              onChange={formik.handleChange}
              name="zone"
              value={formik.zone}
              className="form-control m-2"
              onBlur={formik.handleBlur}
            >
              <option value="">Zone Area</option>
              <option value="1">Zone 1</option>
              <option value="2">Zone 2</option>
              <option value="3">Zone 3</option>
              <option value="4">Zone 4</option>
            </select>

            {formik.touched.zone && formik.errors.zone && (
              <p>{formik.errors.zone}</p>
            )}
          </div>

          <div>
            <input
              onChange={formik.handleChange}
              name="fName"
              value={formik.fName}
              type="text"
              placeholder="First Name"
              className="form-control m-2"
              onBlur={formik.handleBlur}
            />
            {formik.touched.fName && formik.errors.fName && (
              <p>{formik.errors.fName}</p>
            )}
          </div>

          <div>
            <input
              onChange={formik.handleChange}
              name="lName"
              value={formik.lName}
              type="text"
              placeholder="Last Name"
              className="form-control m-2"
              onBlur={formik.handleBlur}
            />
            {formik.touched.lName && formik.errors.lName && (
              <p>{formik.errors.lName}</p>
            )}
          </div>

          <div>
            <input
              onChange={formik.handleChange}
              name="IDNumber"
              value={formik.IDNumber}
              type="number"
              placeholder="National ID number"
              className="form-control m-2"
              onBlur={formik.handleBlur}
            />
            {formik.touched.IDNumber && formik.errors.IDNumber && (
              <p>{formik.errors.IDNumber}</p>
            )}
          </div>

          <div>
            <input
              onChange={formik.handleChange}
              name="phoneNumber"
              value={formik.phoneNumber}
              type="number"
              placeholder="Phone number"
              className="form-control"
              onBlur={formik.handleBlur}
              // pattern="(\+2547[0-9]{8}|\+2541[0-9]{8}|07[0-9]{8}|01[0-9]{8})"
              // title="Please enter a valid Kenyan phone number"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p>{formik.errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              className="form-control"
              name="connectionType"
              value={formik.connectionType}
              onChange={formik.handleChange}
              placeholder="Connection type"
              onBlur={formik.handleBlur}
            />
            {formik.touched.connectionType && formik.errors.connectionType && (
              <p>{formik.errors.connectionType}</p>
            )}
          </div>
          {/* <select
            onChange={formik.handleChange}
            name="status"
            value={formik.status}
            className="form-control m-2"
          >
            <option value="">status</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select> */}

          <div className="adduser-button">
            <button className="btn btn-outline-primary">
              {loading ? "Generating customer ...." : "Generate customer"}
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
      {/* {error && <p>{error}</p>} */}
    </div>
  );
};

export default NewCustomer;
