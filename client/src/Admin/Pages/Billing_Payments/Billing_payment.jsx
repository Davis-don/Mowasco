import React, { useEffect, useState } from "react";
import "./billing_payment.css";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IoFilterSharp } from "react-icons/io5";
import Footer from "../../Components/Footer";
import { useSearchCustomer } from "../../../CustomHooks/useSearchCustomer";


const Billing_payment = () => {
  const navigate = useNavigate();
  const [customerBills, setCustomerBills] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [searchInput, setSearchInput ] = useState()
  const { searchCustomer, searchedCustomer } = useSearchCustomer(
    `${process.env.REACT_APP_VITE_API_URL_BASE}/api/customer-search/search/bills`
  );

  const viewCustomerBill = async (id) => {
    try {
      navigate(`/customer-bill/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerBills = async () => {
    try {
      setLoading(true);
      setError(false);
      let getBills = await axios
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/customer/bill/all`, {
          withCredentials: true,
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong!");
        });
      if (getBills.status == 200) {
        setCustomerBills(getBills.data.data);
      } else {
        toast.warn("Something went wrong", { position: "bottom-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error! Please try again later", {
        position: "bottom-center",
      });
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  // search custoeer.
  const handleCustomerSearch = () => {
    searchCustomer(searchInput)
  }

  useEffect(() => {
    getCustomerBills();
  }, []);
  return (
    <div className="customer-bills">
      <div className="cust-top">
        <span>Bills</span>
      </div>

      <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
        Customers Bills
      </h4>
      <div className="search-filter">
        <div className="search">
          <input
            className="search-input"
            type="text"
            name="fName"
            value={searchInput}
            placeholder="Search customer.."
            onChange={(e) => setSearchInput(e.target.value)}
            required
          />
          <button onClick={handleCustomerSearch}>Search</button>
        </div>
        <div className="search-filter-left">
          <div className="filter">
            <IoFilterSharp className="filter-icon" />
            <span>Filter</span>
          </div>
        </div>
      </div>

      {loading ? (
        "Loading..."
      ) : (
        <table>
          <tr>
            <th>Meter No.</th>
            <th>Customer Number</th>
            <th>Zone</th>
            <th>First name</th>
            <th>Last Name</th>
            {/*  <th>Water bill</th>
            <th>Reconnection</th> */}
            <th>Other charges</th>
            <th>Total bill</th>
            <th>View</th>
          </tr>
          {searchedCustomer && searchInput !== "" ? (
            <>
              <tr>
                <td>{searchedCustomer.meters.meterNumber}</td>
                <td>{searchedCustomer.customer.custNumber}</td>
                <td>{searchedCustomer.meters.zones.zoneName}</td>
                <td>{searchedCustomer.customer.custFirstName}</td>
                <td>{searchedCustomer.customer.custLastName}</td>
                <td>{searchedCustomer.otherCharges}</td>
                <td>{searchedCustomer.amountDue}</td>

                <td>
                  {<FaEye onClick={() => viewCustomerBill(searchedCustomer.bill_id)} />}
                </td>
              </tr>
            </>
          ) : (
            <>
              {customerBills && customerBills.length > 0 ? (
                customerBills.map((cstBill, key) => (
                  <tr>
                    <td>{cstBill.meters.meterNumber}</td>
                    <td>{cstBill.customer.custNumber}</td>
                    <td>{cstBill.meters.zones.zoneName}</td>
                    <td>{cstBill.customer.custFirstName}</td>
                    <td>{cstBill.customer.custLastName}</td>
                    <td>{cstBill.otherCharges}</td>
                    <td>{cstBill.amountDue}</td>

                    <td>
                      {
                        <FaEye
                          onClick={() => viewCustomerBill(cstBill.bill_id)}
                        />
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <p>Loading bills...</p>
              )}
            </>
          )}
        </table>
      )}
      <Footer />
    </div>
  );
};

export default Billing_payment;
