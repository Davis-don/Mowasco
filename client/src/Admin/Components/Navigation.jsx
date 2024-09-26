import React, { useEffect, useState } from "react";
import "./global.css";
import logo from "../../../src/images/logo.jpeg";
import logoImg from "../.././../src/images/jack-b-o1radglopDA-unsplash.jpg";
import Header from "./Header";
import store from "../../store/dataStore";
import { Navigate } from "react-router-dom";
const Navigation = () => {
  const user = store((state) => state.user);
  const [time, setTime] = useState( new Date())

  useEffect(() => {
    setInterval(() => {
      setTime(new Date())
    }, (1000));
  }, [])
  if(!user){
    return <Navigate to={'/'}/>
  }
  return (
    <div className="navigation">
      <Header />
      <div className="nav-top">
        <div className="nav-left">
          <span>
            {" "}
            {time.toLocaleTimeString()} {"  "}
            {time.toLocaleDateString()}
          </span>
        </div>
        <div className="nav-right">
          <h4>
            Welcome back{" "}
            <span>
              {user.first_name} {user.lastName}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
