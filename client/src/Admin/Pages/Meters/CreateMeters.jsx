import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "./createmeters.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IoFilterSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineHistory } from "react-icons/ai";
import { useFetch } from "../../../../src/CustomHooks/useFetch";
import { useDate } from "../../../CustomHooks/useDate";
import Footer from "../../Components/Footer";
import { useSearchCustomer } from "../../../CustomHooks/useSearchCustomer";
const CreateMeters = () => {
  const [searchInput, setSearchInput] = useState()

  const navigate = useNavigate();
  const { searchCustomer, searchedCustomer, error, loading } =
    useSearchCustomer(
      `${process.env.REACT_APP_VITE_API_URL_BASE}/api/customer-search/all`
    );


  const {
    data: meters,
    error1,
    loading1,
  } = useFetch(`http://localhost:4000/meters/all`);
  const { formatDate } = useDate();
  const viewHistory = async (id) => {
    try {
      navigate(`/${id}/meter-history`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCustomerSearch = () => {
    searchCustomer(searchInput)
  }

  return (
    <div>
      <div className="cust-top">
        <span>Meters</span>
      </div>
      <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
        Registered Meters
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
          <button onClick={handleCustomerSearch} disabled={!searchInput}>
            Search
          </button>
        </div>
        <div className="search-filter-left">
          <div className="filter">
            <IoFilterSharp className="filter-icon" />
            <span>Filter</span>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Meter no.</th>
            <th>Customer No.</th>
            <th>Zone</th>
            <th>Meter Status</th>
            <th>Installation Date</th>
            <th>Repair Date</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {searchedCustomer && searchInput !== "" ? (
            <>
              
              <tr>
                <td>{searchedCustomer.meters?.meterNumber}</td>
                <td>{searchedCustomer.custNumber}</td>
                <td>{searchedCustomer?.meters?.zones?.zoneName}</td>
                <td>{searchedCustomer?.custStatus}</td>
                <td>{formatDate(searchedCustomer?.meters?.createdAt)}</td>
                <td>{formatDate(searchedCustomer?.meters?.createdAt)}</td>
                <td>
                  {
                    <AiOutlineHistory
                      onClick={() => viewHistory(searchedCustomer.meter_id)}
                    />
                  }
                </td>
              </tr>
              
            </>
          ) : (
            <>
              {loading1 ? (
                "Loading data ..."
              ) : meters && meters.length > 0 ? (
                meters.map((meter, key) => (
                  <tr key={key}>
                    <td>{meter?.meterNumber}</td>
                    <td>{meter.customer.custNumber}</td>
                    <td>{meter?.zones.zoneName}</td>
                    <td>{meter?.customer.custStatus}</td>
                    <td>{formatDate(meter?.createdAt)}</td>
                    <td>{formatDate(meter?.createdAt)}</td>
                    <td>
                      {
                        <AiOutlineHistory
                          onClick={() => viewHistory(meter.meter_id)}
                        />
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <p>Loading data ...</p>
              )}
            </>
          )}
        </tbody>

        {error1 && <p>{error1}</p>}
      </table>
      <Footer />
    </div>
  );
};

export default CreateMeters;
