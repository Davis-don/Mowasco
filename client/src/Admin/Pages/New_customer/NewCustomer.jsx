import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";

const NewCustomer = () => {
  const [serverMessage, setServerMessage] = useState("");
  const [displayServerComponent, setServerComponent] = useState(false);
  const [form, setForm] = useState(true);
  const [userData, setUserData] = useState({
    Gender: "",
    Contact: "",
    Status: "",
    MeterNumber: "",
    ZoneArea: "",
    FName: "",
    LName: "",
    IdNumber: "",
  });
  const handleForm = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    console.log(userData);
  };

  const handlePost = async (e) => {
    e.preventDefault();

  }

  return (
    <div className="overall-add-user-container">
      <div className="form-encapsulator">
        <h2 style={{ textAlign: "center" }}>Create Account</h2>
        {displayServerComponent && (
          <div class="alert alert-info">
            <strong>{serverMessage}</strong>
          </div>
        )}
        {form && (
          <form onSubmit={handlePost}>
            <input
              onChange={handleForm}
              name="MeterNumber"
              required
              type="text"
              placeholder="Meter number"
              className="form-control m-2"
            />
            <select
              onChange={handleForm}
              name="ZoneArea"
              className="form-control m-2"
            >
              <option value="">Zone Area</option>
              <option value="zone1">Zone 1</option>
              <option value="zone2">Zone 2</option>
              <option value="zone3">Zone 3</option>
              <option value="zone3">Zone 3</option>
            </select>
            <input
              onChange={handleForm}
              name="FName"
              required
              type="text"
              placeholder="First Name"
              className="form-control m-2"
            />
            <input
              onChange={handleForm}
              name="LName"
              required
              type="text"
              placeholder="Last Name"
              className="form-control m-2"
            />
            <input
              onChange={handleForm}
              name="IdNumber"
              required
              type="text"
              placeholder="ID number"
              className="form-control m-2"
            />
            <input
              required
              onChange={handleForm}
              name="Contact"
              type="text"
              placeholder="Phone number"
              className="form-control"
              pattern="(\+2547[0-9]{8}|\+2541[0-9]{8}|07[0-9]{8}|01[0-9]{8})"
              title="Please enter a valid Kenyan phone number"
            />

            <select
              onChange={handleForm}
              name="Gender"
              className="form-control m-2"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="N/A">Rather not say</option>
            </select>


            <select
              onChange={handleForm}
              name="Status"
              className="form-control m-2"
            >
              <option value="">status</option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>

            <div className="adduser-button">
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewCustomer;
