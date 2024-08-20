import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdPermIdentity } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import waterImage from '../images/yoann-boyer-i14h2xyPr18-unsplash.jpg'
import Cookies from 'js-cookie';
import { IoFileTray } from 'react-icons/io5';
function Login() {
  // const Token = sessionStorage.getItem('userToken');
  // console.log(Token);
  const navigate = useNavigate();
  const [cookieValue, setCookieValue] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [serverMessage,setServerMessage]=useState("");
  const [displayServerComponent,setServerComponent]=useState(false);
  const [form,setForm]=useState(true);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const [userCred,setUserCred]=useState({
    UserId:"",
    Password:""
  });
  const updateCredentials=(e)=>{
    setUserCred({
      ...userCred,[e.target.name]:e.target.value
    })
  }


  const handlePost = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/User/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCred)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
       // Parse the JSON response
       const responseData = await response.json();
        if(responseData.Token){
           // Store the received token in a cookie
          //  Cookies.set('userToken', responseData.Token, { expires: 7 }); // Expires in 7 days
         // Cookies.set('userToken', responseData.Token);
          sessionStorage.setItem('userToken', responseData.Token);
           console.log(responseData.userRole);
          if(responseData.userRole == 'admin'){
           navigate('/Admin/Dashboard')
          }
          else if(responseData.userRole == 'user'){
            navigate('/Account/login') 
          }
        }
        else{

        }
      // update message to current state
      setServerMessage(responseData.message);
      //set servercomponent to true
      setServerComponent(true);
      setForm(false);
      setTimeout(() => {
        setServerComponent(false);
        setForm(true);
      }, 3000);
      
    } catch (error) {
      // Log any errors that occur
      console.log('Error:', error);
    }
  };











  return (
    <div className="overall-login-container container-fluid">
        <img className='water-background' src={waterImage} alt='water in lake'/>
      <div className="form-div-container">
        <h4 style={{ textAlign: 'center' }}>Sign in to your account</h4>
        <h6 style={{ textAlign: 'center' }}>Welcome back</h6>
        <div className='login-form-container'>
        {displayServerComponent && <div class="alert alert-info">
  <strong>{serverMessage}</strong>
</div>}
          {form && <form onSubmit={handlePost}>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <MdPermIdentity />
              </span>
              <input required onChange={updateCredentials} name='UserId' type="number" className="form-control" placeholder="Enter company ID" />
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
                name='Password'
                onChange={updateCredentials}
              />
              <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                {passwordShown ? <MdVisibilityOff /> : <MdVisibility />}
              </span>
            </div>
            <p style={{ float: 'right' }}>
              <a href='#' className='text-danger fs-8'>Forgot password</a>
            </p>
            <div style={{ width: 'max-content', margin: 'auto' }}>
              <button type='submit' className='btn btn-primary actual-signin-btn'>Sign in</button>
            </div>
          </form>}
        </div>
      </div>
    </div>
  );
}

export default Login;











// import React from 'react';
// import './Login.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { MdPermIdentity } from 'react-icons/md';
// import { RiLockPasswordFill } from "react-icons/ri";

// function Login() {
//   return (
//     <div className="overall-login-container container-fluid">
//       <div className="form-div-container">
//         <h4 style={{ textAlign: 'center' }}>Sign in to your account</h4>
//         <h6 style={{ textAlign: 'center' }}>Welcome back</h6>
//         <div className='login-form-container'>
//           <form>
//             <div className="input-group mb-3">
//               <span className="input-group-text">
//                 <MdPermIdentity />
//               </span>
//               <input type="number" className="form-control" placeholder="Enter company ID" />
//             </div>
//             <div className="input-group mb-3">
//               <span className="input-group-text">
//                 <RiLockPasswordFill />
//               </span>
//               <input type="password" className="form-control" placeholder="Enter password" />
//             </div>
//             <p style={{float:'right'}} ><a href='#'className='text-danger fs-8'>Forgot password</a></p>
//             <div style={{width:'max-content',margin:'auto'}}>
//             <button className='btn btn-primary actual-signin-btn'>Sign in</button>
//             </div>
            
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

