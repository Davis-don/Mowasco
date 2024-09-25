import React from "react";
import { Link } from "react-router-dom";
import "./global.css";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { IoSpeedometerSharp } from "react-icons/io5";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaRegRectangleList } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa";
import store from "../../store/dataStore";

const SideNav = () => {
  const user = store((state) => state.user);

  return (
    <div>
      <div className="aside">
        {/* <FaLessThan className="menu" /> */}
        <div className="nav-links">
          {user && user.role == "ADMIN" ? (
            <>
              <div className="nav-1">
                <Link className="li" to={"/dashboard"}>
                  <MdDashboardCustomize className="icons" />
                  <span>Dashboard</span>
                </Link>
              </div>
              <div className="nav-1">
                <Link className="li" to={"/manage-customers"}>
                  <FaUsers className="icons" />
                  <span> Customers</span>
                </Link>
              </div>
              <div className="nav-1">
                <Link className="li" to={"/manage-meters"}>
                  <IoSpeedometerSharp className="icons" />
                  <span>Meters Management</span>
                </Link>
              </div>
              <div className="nav-1">
                <Link className="li" to={"/billing-payment"}>
                  <LuFileSpreadsheet className="icons" />
                  <span>Billing and Payments</span>
                </Link>
              </div>
              <div className="nav-1">
                <Link className="li" to={"/manage-water-readings"}>
                  <FaRegRectangleList className="icons" />
                  <span>Water readings</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="nav-1">
                <Link className="li" to={"/agent/dashboard"}>
                  <FaRegRectangleList className="icons" />
                  <span>Water Usage</span>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="logout">
          <button>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
