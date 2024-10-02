import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdPermIdentity } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import waterImage from "../../../images/yoann-boyer-i14h2xyPr18-unsplash.jpg";
import axios from "axios";
import { IoFileTray } from "react-icons/io5";
import store from "../../../store/dataStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  // const Token = sessionStorage.getItem('userToken');
  // console.log(Token);
  const getUserData = store((state) => state.getUserData);
  const navigate = useNavigate();
  const [cookieValue, setCookieValue] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [displayServerComponent, setServerComponent] = useState(false);
  const [form, setForm] = useState(true);
  const [error, setError] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const [userCred, setUserCred] = useState({
    UserId: "",
    Password: "",
  });

  const updateCredentials = (e) => {
    setUserCred({
      ...userCred,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = () => {
    navigate("/agent/register");
  };

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch('http://localhost:4000/user/agent/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(userCred)
      // }).catch(error=>{console.log(error)})
      const login = await axios
        .post(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/user/agent/login`,
          {
            password: userCred.Password,
            employeeID: parseInt(userCred.UserId),
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => {
          console.log("error 1", error);
          if (error.status === 404) {
            setError(error.response.data.message);
            toast.warn(error.response.data.message);
          }
          if (error.status === 400) {
            setError(error.response.data.message);
            toast.warn("Customer was not found", { position: "top-center" });
          }
          if(error.status == 500){
            toast.error('Server error!! Please try again later.')
            setError( error)
          }
        });

      if (login.status == 200) {
        const data = login.data.data;
        getUserData(data);
        if (data.role === "AGENT") {
          // navigate('/Account/login')
          navigate("/agent/dashboard");
        } else {
          navigate("/Dashboard");
        }
      }
      // if(login.Token){
      // Store the received token in a cookie
      //  Cookies.set('userToken', responseData.Token, { expires: 7 }); // Expires in 7 days
      // Cookies.set('userToken', responseData.Token);
      //           sessionStorage.setItem('userToken', login.Token);
      //           if(login.userRole == 'admin'){
      //            navigate('/Dashboard')
      //           }
      //           else if(login.userRole == 'user'){
      //             navigate('/Account/login')
      //           }
      //         }
      //         else{
      // console.log('error found')
      //         }
      // }

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // Parse the JSON response
      //  const responseData = await response.json();

      // update message to current state
      setServerMessage(login.message);
      //set servercomponent to true
      setServerComponent(true);
      setForm(false);
      setTimeout(() => {
        setServerComponent(false);
        setForm(true);
      }, 3000);
    } catch (error) {
      // Log any errors that occur
      console.log("Error 2:", error);
      // setError(error)
    } finally {
      // setError(false)
    }
  };
  return (
    <div className="overall-login-container container-fluid">
      <img className="water-background" src={waterImage} alt="water in lake" />
      <div className="form-div-container">
        <h4 style={{ textAlign: "center" }}>Sign in to your account</h4>
        <h6 style={{ textAlign: "center" }}>Welcome back</h6>
        <div className="login-form-container">
          {displayServerComponent && (
            <div class="alert alert-info">
              <strong>{serverMessage}</strong>
            </div>
          )}
          {form && (
            <form onSubmit={handlePost}>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <MdPermIdentity />
                </span>
                <input
                  required
                  onChange={updateCredentials}
                  name="UserId"
                  type="number"
                  className="form-control"
                  placeholder="Enter company ID"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <RiLockPasswordFill />
                </span>
                <input
                  required
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter password"
                  name="Password"
                  onChange={updateCredentials}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {passwordShown ? <MdVisibilityOff /> : <MdVisibility />}
                </span>
              </div>
              {error && <p className="error">{error.message}</p>}

              <p style={{ float: "right" }}>
                <a href="#" className="text-danger fs-8" onClick={registerUser}>
                  Forgot password
                </a>
              </p>
              <div style={{ width: "max-content", margin: "auto" }}>
                <button
                  type="submit"
                  className="btn btn-primary actual-signin-btn"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;

