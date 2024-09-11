import React, { useEffect } from "react";
import "./Admin.css";
import AddUser from "../../User/pages/Create_User/AddUser";
import NewCustomer from "../Pages/New_customer/NewCustomer";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FaHome, FaUserTie, FaMoneyBillWave } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDashDisplay() {
  const [zones, setZones] = useState();
  const [customer, setCustomer] = useState()
  const [meters, setMeters] = useState()

  // 1. Get the number of zones
 const getZones = async () => {
     try {
      const zones = await axios
        .get("http://localhost:4000/zones/all")
        .catch((error) => console.log(error));
  
      if (zones.status == 200) {
        toast.success("Meters found successfully.");
        setZones(zones.data.data);
      } else {
        
        toast.warn("Something went wrong.");
      }
     } catch (error) {
      console.log(error)
     }
   };

  // 2. get customers

  const getCustomer = async() => {
    try {
      
      const customers = await axios.get(`http://localhost:4000/customers/all`).catch(error => console.log(error))

      if (customers.status == 200){
        toast.success('Customers found successfully.')

        setCustomer(customers.data.data)
      } else{
        toast.warn('Something went wrong.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 3. Get all the registered meters.
  const getMeters = async () => {
    try {
      const meters = await axios.get(`http://localhost:4000/meters/all`).catch(error => {
        toast.warn('Error. Please try again later.')
        console.log(error)})

        if(meters.status == 200){
          setMeters(meters.data.data)
          toast.success('Meters found successfully.')
        } else {
          toast.warn('Something went wrong.')
        }
    } catch (error) {
      console.log(error)
    }
  }

  // 4. Get total water readings.
  const getTotalWaterConsumed = async() => {
    try {
      const totalConsumed = await axios
        .get(`http://localhost:4000/customer/reading/all/total-readings`)
        .catch((error) => console.log(error));

    console.log(totalConsumed.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getZones();
    getCustomer();
    getMeters()
    getTotalWaterConsumed()
  }, []);
  return (
    <>
      <div className="adminSect">
        <div className="admin-cards">
          <div className="cards">
            <div className="card-title">
              <h4>Total amount consumed for the month : {"January"}</h4>
              <p>
                Total amount: {12} M <sup>4</sup>
              </p>
            </div>
          </div>

          <div className="cards">
            <div className="card-title">
              <h4>Total amount consumed for the month : {"January"}</h4>
              <p>Total amount: {12}</p>
            </div>
          </div>

          <div className="cards">
            <div className="card-title">
              <h4> Total number of consumers active consumers</h4>
              {
                customer && customer.length > 0 ? (
                  <p>Active consumers: {customer.length}</p>
                ): (
                  <p>Loading customers...</p>
                )
              }
            </div>
          </div>

          <div className="cards">
            <div className="card-title">
              <h4>Number of Zones</h4>
              {zones && zones.length > 0 ? (
                <p>Zones: {zones.length}</p>
              ) : (
                <p>Loading zones</p>
              )}
            </div>
          </div>
          <div className="cards">
            <div className="card-title">
              <h4>Number of Agents : {"January"}</h4>
              <p>Agents: {12}</p>
            </div>
          </div>
          <div className="cards">
            <div className="card-title">
              <h4>Number of registered meters : {"January"}</h4>
              {
                meters && meters.length > 0 ? (
                  <p>Meters: {meters.length}</p>
                ): (
                  <p>Loading meters ...</p>
                )
              }
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
function Admin() {
  const [sidebar, setSidebar] = useState(false);
  const [Home, setHome] = useState(true);
  const [User, setUser] = useState(false);
  const [Bill, setBill] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [newCustomer, setNewCustomer] = useState(false);
  let component;
  if (Home == true) {
    component = <AdminDashDisplay />;
  } else if (User == true) {
    component = <AddUser />;
  } else if (Bill == true) {
    component = "";
  } else if (newCustomer == true) {
    component = <NewCustomer />;
  } else if (receipt == true) {
    component = "";
  }

  return (
    <div className="admin-overall-container">
      <div className="small-phone-display">
        <header className="dashboard-header-small">
          <div className="left-side-small-screen-content"></div>
          <div className="right-side-small-screen-content">
            <div
              onClick={() => {
                setSidebar(true);
              }}
            >
              <IoMenuSharp className="fs-1 text-light" />
            </div>
          </div>
        </header>
        {sidebar && (
          <div className="sidebar-small-screen">
            <h2 style={{ display: "flex", gap: "10px" }}>
              <span>
                <MdOutlineDashboard className="fs-1 text-light" />
              </span>
              <span className="text-light">Dashboard</span>
            </h2>
            <div
              className="close-btn-small"
              onClick={() => {
                setSidebar(false);
              }}
            >
              <IoMdClose className="fs-1 text-dark" />
            </div>
            <ul className="list-unstyled p-3">
              <li
                className={Home ? "active-link-css" : ""}
                onClick={() => {
                  setSidebar(false);
                  setHome(true);
                  setUser(false);
                  setNewCustomer(false);
                  setBill(false);
                  setReceipt(false);
                }}
                style={{ display: "flex", gap: "10px" }}
              >
                <span>
                  <FaHome className="text-light fs-2" />
                </span>
                <span className="fs-5 text-light">Home</span>
              </li>
              <li
                className={User ? "active-link-css" : ""}
                onClick={() => {
                  setSidebar(false);
                  setHome(false);
                  setUser(true);
                  setNewCustomer(false);
                  setBill(false);
                  setReceipt(false);
                }}
                style={{ display: "flex", gap: "10px" }}
              >
                <span>
                  <FaUserTie className="text-light fs-2" />
                </span>
                <span className="fs-5 text-light">User</span>
              </li>
              <li
                className={newCustomer ? "active-link-css" : ""}
                onClick={() => {
                  setSidebar(false);
                  setHome(false);
                  setNewCustomer(true);
                  setUser(false);
                  setBill(false);
                  setReceipt(false);
                }}
                style={{ display: "flex", gap: "10px" }}
              >
                <span>
                  <IoMdPersonAdd className="text-light fs-2" />
                </span>
                <span className="fs-5 text-light">Create new Customer</span>
              </li>
              <li
                className={Bill ? "active-link-css" : ""}
                onClick={() => {
                  setSidebar(false);
                  setHome(false);
                  setNewCustomer(false);
                  setUser(false);
                  setBill(true);
                  setReceipt(false);
                }}
                style={{ display: "flex", gap: "10px" }}
              >
                <span>
                  <FaMoneyBillWave className="text-light fs-2" />
                </span>
                <span className="fs-5 text-light">Bill</span>
              </li>
              <li
                className={receipt ? "active-link-css" : ""}
                onClick={() => {
                  setSidebar(false);
                  setHome(false);
                  setUser(false);
                  setNewCustomer(false);
                  setBill(false);
                  setReceipt(true);
                }}
                style={{ display: "flex", gap: "10px" }}
              >
                <span>
                  <FaReceipt className="text-light fs-2" />
                </span>
                <span className="fs-5 text-light">Receipt</span>
              </li>
            </ul>
          </div>
        )}
        <div className="component-dash-display">{component}</div>
      </div>
    </div>
  );
}

export default Admin;
