import React from 'react';
import './global.css'
import logo from '../../../src/images/logo.jpeg'
import logoImg from "../.././../src/images/jack-b-o1radglopDA-unsplash.jpg";
const Navigation = () => {
    return (
      <div className="navigation">
        <div className="nav-top">
          <div className="nav-left">
            <h5>12.14.00</h5>
          </div>
          <div className="nav-right">
            <h4>Welcome Back</h4>

            <div className="admin-img">
              <img src={logo} alt="Admin image here" />
            </div>
          </div>
        </div>
      </div>
    );
}



export default Navigation;