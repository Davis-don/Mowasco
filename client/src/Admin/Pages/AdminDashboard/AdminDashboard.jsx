import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet } from "react-router-dom";
function AdminDashboard() {
  const [zones, setZones] = useState();
  const [customer, setCustomer] = useState();
  const [meters, setMeters] = useState();

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
      console.log(error);
    }
  };

  // 2. get customers

  const getCustomer = async () => {
    try {
      const customers = await axios
        .get(`http://localhost:4000/customers/all`)
        .catch((error) => console.log(error));

      if (customers.status == 200) {
        toast.success("Customers found successfully.");

        setCustomer(customers.data.data);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 3. Get all the registered meters.
  const getMeters = async () => {
    try {
      const meters = await axios
        .get(`http://localhost:4000/meters/all`)
        .catch((error) => {
          toast.warn("Error. Please try again later.");
          console.log(error);
        });

      if (meters.status == 200) {
        setMeters(meters.data.data);
        toast.success("Meters found successfully.");
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 4. Get total water readings.
  const getTotalWaterConsumed = async () => {
    try {
      const totalConsumed = await axios
        .get(`http://localhost:4000/customer/reading/all/total-readings`)
        .catch((error) => console.log(error));

      console.log(totalConsumed.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getZones();
    getCustomer();
    getMeters();
    getTotalWaterConsumed();
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
              {customer && customer.length > 0 ? (
                <p>Active consumers: {customer.length}</p>
              ) : (
                <p>Loading customers...</p>
              )}
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
          {/* ADDDed here */}
          <div className="cards">
            <div className="card-title">
              <h4>Number of Agents : {"January"}</h4>
              <p>Agents: {12}</p>
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
              <h4>Number of Agents : {"January"}</h4>
              <p>Agents: {12}</p>
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
              <h4>Number of Agents : {"January"}</h4>
              <p>Agents: {12}</p>
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
              {meters && meters.length > 0 ? (
                <p>Meters: {meters.length}</p>
              ) : (
                <p>Loading meters ...</p>
              )}
            </div>
          </div>
          {/* /// added */}
          <div className="cards">
            <div className="card-title">
              <h4>Number of registered meters : {"January"}</h4>
              {meters && meters.length > 0 ? (
                <p>Meters: {meters.length}</p>
              ) : (
                <p>Loading meters ...</p>
              )}
            </div>
          </div>{" "}
          <div className="cards">
            <div className="card-title">
              <h4>Number of registered meters : {"January"}</h4>
              {meters && meters.length > 0 ? (
                <p>Meters: {meters.length}</p>
              ) : (
                <p>Loading meters ...</p>
              )}
            </div>
          </div>{" "}
          <div className="cards">
            <div className="card-title">
              <h4>Number of registered meters : {"January"}</h4>
              {meters && meters.length > 0 ? (
                <p>Meters: {meters.length}</p>
              ) : (
                <p>Loading meters ...</p>
              )}
            </div>
          </div>{" "}
          <div className="cards">
            <div className="card-title">
              <h4>Number of registered meters : {"January"}</h4>
              {meters && meters.length > 0 ? (
                <p>Meters: {meters.length}</p>
              ) : (
                <p>Loading meters ...</p>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default AdminDashboard;
