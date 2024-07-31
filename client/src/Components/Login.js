import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdPermIdentity } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import waterImage from '../images/yoann-boyer-i14h2xyPr18-unsplash.jpg'
function Login() {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="overall-login-container container-fluid">
        <img className='water-background' src={waterImage} alt='water in lake'/>
      <div className="form-div-container">
        <h4 style={{ textAlign: 'center' }}>Sign in to your account</h4>
        <h6 style={{ textAlign: 'center' }}>Welcome back</h6>
        <div className='login-form-container'>
          <form>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <MdPermIdentity />
              </span>
              <input type="number" className="form-control" placeholder="Enter company ID" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <RiLockPasswordFill />
              </span>
              <input
                type={passwordShown ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
              />
              <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                {passwordShown ? <MdVisibilityOff /> : <MdVisibility />}
              </span>
            </div>
            <p style={{ float: 'right' }}>
              <a href='#' className='text-danger fs-8'>Forgot password</a>
            </p>
            <div style={{ width: 'max-content', margin: 'auto' }}>
             <Link to='/Account/login'> <button className='btn btn-primary actual-signin-btn'>Sign in</button></Link>
            </div>
          </form>
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

