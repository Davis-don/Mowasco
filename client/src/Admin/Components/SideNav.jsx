import React from 'react';
import { Link } from 'react-router-dom';
import './global.css'
import Navigation from './Navigation';

const SideNav = () => {
    return (
      <div>
        <div className="aside">
          <nav>
            <ul>
              <li>
                <Link className="li" to={"/dashboard"}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="li" to={"/manage-customers"}>
                  Customer management
                </Link>
              </li>
              <li>
                <Link className="li" to={"/manage-meters"}>
                  Meter Management
                </Link>
              </li>
              <li>
                <Link className="li" to={"/billing-payment"}>
                  Billing and Payments
                </Link>
              </li>
              <li>
                <Link className="li" to={"/manage-water-readings"}>
                  Water readings
                </Link>
              </li>
              <li>
                <Link className="li">Settings</Link>
              </li>
            </ul>
          </nav>

          <div className="logout">
            <button>Log out</button>
          </div>
        </div>
      </div>
    );
}



export default SideNav;