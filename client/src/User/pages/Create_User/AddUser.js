import React from "react";
import "./Adduser.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function AddUser() {
  const [serverMessage, setServerMessage] = useState("");
  const [displayServerComponent, setServerComponent] = useState(false);
  const [form, setForm] = useState(true);
  const [userData, setUserData] = useState({
    employeeId: 0,
    firstName: "",
    lastName: "",
    gender: "",
    age: 0,
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const handleForm = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch('http://localhost:4000/EmployeesUser/Add/User', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(userData)
      // });

      const confirmPassword = userData.password === userData.confirmPassword
      if (!confirmPassword) return alert('Confirm password does not match with the password.')

      const response = await fetch(
        "http://localhost:4000/user/agent/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      ).catch((error) => {
        console.log("errors", error);
      });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      console.log("response,", response);
      // Parse the JSON response
      const responseData = await response.json();

      // update message to current state
      setServerMessage(responseData.message);
      //set servercomponent to true
      setServerComponent(true);
      setForm(false);
      setTimeout(() => {
        setServerComponent(false);
        setForm(true);
      }, 3000);
    } catch (error) {
      // Log any errors that occur
      console.log("Error:", error);
    }
  };

  return (
    <div className="overall-add-user-container">
      <div className="form-encapsulator forms">
        <h2 style={{ textAlign: "center" }}>Add Field Agent</h2>
        {displayServerComponent && (
          <div class="alert alert-info">
            <strong>{serverMessage}</strong>
          </div>
        )}
        {form && (
          <form className="update_customer" onSubmit={handlePost}>
            <div className="inputs">
              <label htmlFor="fName">Employee ID:</label>
              <input
                onChange={handleForm}
                name="employeeId"
                required
                type="number"
                placeholder="Employee id"
                className="form-control"
              />
            </div>

            <div className="inputs">
              <label>First name:</label>

              <input
                onChange={handleForm}
                name="firstName"
                required
                type="text"
                placeholder="First Name"
                className="form-control"
              />
            </div>
            <div className="inputs">
              <label>Last name:</label>

              <input
                onChange={handleForm}
                name="lastName"
                required
                type="text"
                placeholder="Last Name"
                className="form-control"
              />
            </div>

            <div className="inputs">
              <label>Gender:</label>

              <select
                onChange={handleForm}
                name="gender"
                className="form-control"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="N/A">Rather not say</option>
              </select>
            </div>

            <div className="inputs">
              <label>Age:</label>

              <input
                onChange={handleForm}
                name="age"
                required
                type="number"
                placeholder="age"
                className="form-control"
              />
            </div>

            <div className="inputs">
              <label>Phone number:</label>

              <input
                required
                onChange={handleForm}
                name="contact"
                type="number"
                placeholder="Enter Kenyan phone number"
                className="form-control"
                pattern="(\+2547[0-9]{8}|\+2541[0-9]{8}|07[0-9]{8}|01[0-9]{8})"
                title="Please enter a valid Kenyan phone number"
              />
            </div>

            <div className="inputs">
              <label>Password:</label>

              <input
                onChange={handleForm}
                name="password"
                required
                type="password"
                placeholder="password"
                className="form-control"
              />
            </div>

            <div className="inputs">
              <label>Confirm password:</label>
              <input
                onChange={handleForm}
                name="confirmPassword"
                required
                type="password"
                placeholder="confirm password"
                className="form-control"
              />
            </div>

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
}

export default AddUser;
