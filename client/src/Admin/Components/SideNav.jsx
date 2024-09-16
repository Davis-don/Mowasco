import React from 'react';
import { Link } from 'react-router-dom';
import './global.css'
import { MdDashboardCustomize } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { IoSpeedometerSharp } from "react-icons/io5";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaRegRectangleList } from "react-icons/fa6";

const SideNav = () => {
    return (
      <div>
        <div className="aside">
          <div className="nav-links">
            <div className="nav-1">
              <Link className="li" to={"/dashboard"}>
                <MdDashboardCustomize className="icons" />
                Dashboard
              </Link>
            </div>

            <div className="nav-1">
              <Link className="li" to={"/manage-customers"}>
                <FaUsers className="icons" />
                Customers
              </Link>
            </div>

            <div className="nav-1">
              <Link className="li" to={"/manage-meters"}>
                <IoSpeedometerSharp className="icons" />
                Meters Management
              </Link>
            </div>

            <div className="nav-1">
              <Link className="li" to={"/billing-payment"}>
                <LuFileSpreadsheet className="icons" />
                Billing and Payments
              </Link>
            </div>

            <div className="nav-1">
              <Link className="li" to={"/manage-water-readings"}>
                <FaRegRectangleList className="icons" />
                Water readings
              </Link>
            </div>
            <div className="nav-1">
              <Link className="li">Settings</Link>
            </div>
          </div>

          <div className="logout">
            <button>Log out</button>
          </div>
        </div>
      </div>
    );
}



export default SideNav;