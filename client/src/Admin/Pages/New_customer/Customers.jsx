import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./newCustomer.css";

const Customers = () => {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState("");
  const [displayServerComponent, setServerComponent] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  //get and map all the users from the database.

  const getCustomers = async () => {
    try {
      setLoading(true);
      setError(false);
      const getUsers = await axios
        .get(`http://localhost:4000/customers/all`)
        .catch((error) => {
          console.log(error);
          toast.error("Server error.", error.message);
          setError(error);
        });

      if (getUsers.status == 200) {
        setCustomers(getUsers.data.data);

        toast.success("All users have been found successfully.");
      } else {
        toast.warn("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addNewCustomer = async () => {
    try {
      navigate("/add-new-customer");
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomer = async() => {
    try {
      navigate("/update-customer");
    } catch (error) {
      console.log(error)
    }
  }

  const viewCustomer = async() => {
    try {
      navigate("/customer-details");
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const deleteCustomer = await axios
        .delete(`http://localhost:4000/customers/delete/${id}`)
        .catch((error) => {
          console.log(error);
          toast.warn("Server error");
        });

      if (deleteCustomer) {
        toast.success("Customer deleted successfully.");
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <div className="cust-top">
        <h4>Customers </h4>
        <button type="button" onClick={addNewCustomer}>
          Add customer
        </button>
      </div>

      <ToastContainer />

      {/* {error && <p>{error}</p>} */}

      <table>
        <tr>
          <th>Meter no.</th>
          <th>Zone</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone number</th>
          <th>ID number</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>View</th>
        </tr>

        {customers && customers.length > 0 ? (
          customers.map((customer, key) => (
            <tr key={key}>
              <td>{customer.custMeterNumber}</td>
              <td>{customer.custZone}</td>
              <td>{customer.custFirstName}</td>
              <td>{customer.custLastName}</td>
              <td>{customer.custPhoneNumber}</td>
              <td>{customer.custID}</td>
              <td>{customer.custStatus}</td>
              <td>{<MdEdit onClick={updateCustomer} />}</td>
              <td>
                {
                  <MdDeleteForever
                    onClick={() => handleDelete(customer.cust_id)}
                  />
                }
              </td>
              <td>{<FaEye onClick={viewCustomer} />}</td>
            </tr>
          ))
        ) : (
          <p>Loading customers</p>
        )}
      </table>
    </div>
  );
};

export default Customers;
