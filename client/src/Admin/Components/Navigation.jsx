import React from "react";
import "./global.css";
import logo from "../../../src/images/logo.jpeg";
import logoImg from "../.././../src/images/jack-b-o1radglopDA-unsplash.jpg";
import Header from "./Header";
import store from "../../store/dataStore";
import { Navigate } from "react-router-dom";
const Navigation = () => {
  const user = store((state) => state.user);
  if(!user){
    return <Navigate to={'/'}/>
  }
  return (
    <div className="navigation">
      <Header />
      <div className="nav-top">
        <div className="nav-left">
          <span>12.14.00</span>
        </div>
        <div className="nav-right">
          <h4>
            Welcome Back{" "}
            <span>
              {user.first_name} {user.lastName}
            </span>
          </h4>

          <div className="admin-img">
            <img src={logo} alt="Admin image here" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
