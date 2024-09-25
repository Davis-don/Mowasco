import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
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
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/customers/all`, {
          withCredentials: true,
        })
        .catch((error) => {
          console.log(error);
          toast.error("Server error.", error.message);
          setError(error);
        });

      if (getUsers.status == 200) {
        const data = getUsers.data.data;
        console.log("customer", data);
        setCustomers(data);
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

  const updateCustomer = async (id) => {
    try {
      navigate(`/update-customer/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const viewCustomer = async (id) => {
    try {
      navigate(`/customer-details/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteCustomer = await axios
        .delete(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/customers/delete/${id}`,
          {
            withCredentials: true,
          }
        )
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
        <span>Customer</span>
      </div>

      <div className="search-filter">
        <div className="search">
          <input
            className="search-input"
            type="text"
            name="fName"
            value={""}
            placeholder="Search customer.."
            onChange={""}
            required
          />
          <button>Search</button>
        </div>
        <div className="search-filter-left">
          <div className="filter">
            <IoFilterSharp className="filter-icon" />
            <span>Filter</span>
          </div>
          <button type="button" onClick={addNewCustomer}>
            Add customer
          </button>
        </div>
      </div>

      <ToastContainer />

      <table>
        <thead>
          <tr>
            <th>Meter no.</th>
            <th>Zone</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone number</th>
            <th>ID number</th>
            <th className="action">Status</th>
            <th className="action">Edit</th>
            <th className="action">Delete</th>
            <th className="action">View</th>
          </tr>
        </thead>

        {customers && customers.length > 0 ? (
          customers.map((customer, key) => (
            <tbody>
              <tr key={key}>
                <td>{customer.meters?.meterNumber}</td>
                <td>{customer.meters?.zones.zoneName}</td>
                <td>{customer.custFirstName}</td>
                <td>{customer.custLastName}</td>
                <td>{customer.custPhoneNumber}</td>
                <td>{customer.custID}</td>
                <td className="action">
                  <span className="status">{customer.custStatus}</span>
                </td>
                <td className="action">
                  {
                    <MdEdit
                      className="icons"
                      onClick={() => updateCustomer(customer.cust_id)}
                    />
                  }
                </td>
                <td className="action">
                  {
                    <MdDelete
                      className="icons"
                      onClick={() => handleDelete(customer.cust_id)}
                    />
                  }
                </td>
                <td className="action">
                  {
                    <FaEye
                      className="icons"
                      onClick={() => viewCustomer(customer.cust_id)}
                    />
                  }
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <p>Loading customers</p>
        )}
      </table>
    </div>
  );
};

export default Customers;
