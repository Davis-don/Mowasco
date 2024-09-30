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
import { useSearchCustomer } from "../../../CustomHooks/useSearchCustomer";
import "./newCustomer.css";
import Footer from "../../Components/Footer";
import Search from "../../Components/Search";

const Customers = () => {
  const [searchInput, setSearchInput] = useState("");

  // const { searchCustomer,searchedCustomer } = useSearchCustomer(
  //   `${process.env.REACT_APP_VITE_API_URL_BASE}/api/customer-search/all`,
  //   searchInput
  // );
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState("");
  const [displayServerComponent, setServerComponent] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchedCustomer, setSearchedCustomer] = useState();
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
        console.log(getUsers.data.data);
        const data = getUsers.data.data;
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
          },
        )
        .catch((error) => {
          console.log(error);
          toast.warn("Server error");
        });
      setCustomers(customers.filter((customer) => customer.cust_id !== id));

      if (deleteCustomer) {
        toast.success("Customer deleted successfully.", {
          position: "bottom-center",
        });
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

  // getSearch function

  const searchCustomer = async (e) => {
    e.preventDefault();
    if (searchInput == "") {
      alert("Please input item to search");
    }

    try {
      const search = await axios
        .post(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/api/customer-search/all`,
          {
            meterNumber: parseInt(searchInput),
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => {
          console.log("error", error);
          toast.error("Invalid meter number", { position: "bottom-center" });
        });

      if (search.status == 200) {
        setSearchedCustomer(search.data.data);
      } else {
        toast.warn("Customer not found!");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <div className="cust-top">
        <span>Customer</span>
      </div>

      <div className="search-filter">
        <div className="search">
          <input
            className="search-input"
            type="number"
            name="fName"
            value={searchInput}
            placeholder="Search customer.."
            onChange={(e) => setSearchInput(e.target.value)}
            required
          />
          <button onClick={searchCustomer} disabled={!searchInput}>
            {"Search"}
          </button>
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
            <th>Customer No.</th>
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

        <tbody>
          {searchedCustomer && searchInput !== "" ? (
            <>
              <tr>
                <td>{searchedCustomer.meters?.meterNumber}</td>
                <td>{searchedCustomer.custNumber}</td>
                <td>{searchedCustomer.meters?.zones.zoneName}</td>
                <td>{searchedCustomer.custFirstName}</td>
                <td>{searchedCustomer.custLastName}</td>
                <td>{searchedCustomer.custPhoneNumber}</td>
                <td>{searchedCustomer.custID}</td>
                <td className="action">
                  <span className="status">{searchedCustomer.custStatus}</span>
                </td>
                <td className="action">
                  {
                    <MdEdit
                      className="icons"
                      onClick={() => updateCustomer(searchedCustomer.cust_id)}
                    />
                  }
                </td>
                <td className="action">
                  {
                    <MdDelete
                      className="icons"
                      onClick={() => handleDelete(searchedCustomer.cust_id)}
                    />
                  }
                </td>
                <td className="action">
                  {
                    <FaEye
                      className="icons"
                      onClick={() => viewCustomer(searchedCustomer.cust_id)}
                    />
                  }
                </td>
              </tr>
            </>
          ) : (
            <>
              {customers && customers.length > 0 ? (
                customers.map((customer, key) => (
                  <tr key={key}>
                    <td>{customer.meters?.meterNumber}</td>
                    <td>{customer?.custNumber}</td>
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
                ))
              ) : (
                <p>Loading customers</p>
              )}{" "}
            </>
          )}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default Customers;
