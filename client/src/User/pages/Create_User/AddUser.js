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
    console.log(userData);
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
              name="employeeId"
              required
              type="number"
              placeholder="Employee id"
              className="form-control m-2"
            />
            <input
              onChange={handleForm}
              name="firstName"
              required
              type="text"
              placeholder="First Name"
              className="form-control m-2"
            />
            <input
              onChange={handleForm}
              name="lastName"
              required
              type="text"
              placeholder="Last Name"
              className="form-control m-2"
            />

            {/* <input onChange={handleForm} name='Gender' required type='text'placeholder='gender'className='form-control m-2'/> */}
            <select
              onChange={handleForm}
              name="gender"
              className="form-control m-2"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="N/A">Rather not say</option>
            </select>

            <input
              onChange={handleForm}
              name="age"
              required
              type="number"
              placeholder="age"
              className="form-control m-2"
            />

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

            <input
              onChange={handleForm}
              name="password"
              required
              type="number"
              placeholder="password"
              className="form-control m-2"
            />
            <input
              onChange={handleForm}
              name="confirmPassword"
              required
              type="number"
              placeholder="confirm password"
              className="form-control m-2"
            />
            {/* <select onChange={handleForm} name="Status" className='form-control m-2'>
  <option value="">status</option>
  <option value="active">active</option>
  <option value="inactive">inactive</option>
</select>
<select onChange={handleForm} name="Role" className='form-control m-2'>
  <option value="">role</option>
  <option value="admin">admin</option>
  <option value="user">user</option>
</select> */}
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
