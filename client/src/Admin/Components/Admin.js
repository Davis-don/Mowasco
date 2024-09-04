import React from 'react'
import './Admin.css'
import AddUser from '../../User/pages/Create_User/AddUser';
import NewCustomer from '../Pages/New_customer/NewCustomer';
import { useState } from 'react';
import { IoMenuSharp } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FaHome, FaUserTie,FaMoneyBillWave } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";

function Admin() {
    function AdminDashDisplay(){
        return(
            <h1>Admin Dashboard</h1>
        )
     }
    const [sidebar,setSidebar]=useState(false);
    const [Home,setHome]=useState(true);
    const [User,setUser]=useState(false);
    const [Bill,setBill]=useState(false);
    const [receipt,setReceipt]=useState(false);
    const [newCustomer, setNewCustomer] = useState(false)
    let component;
    if(Home==true){
    component=<AdminDashDisplay/>
    }
    else if(User==true){
      component=<AddUser/>
    }
    else if(Bill==true){
      component=''
    } else if(newCustomer == true){
      component=<NewCustomer/>
    }
    else if(receipt==true){
      component=''
    
    }


  return (
    <div className='admin-overall-container'>
         <div className='small-phone-display'>
        <header className='dashboard-header-small'>
           <div className='left-side-small-screen-content'>

           </div>
           <div className='right-side-small-screen-content'>
              {/* <div>
                <div ></div>
              </div> */}
              <div onClick={()=>{setSidebar(true)}}><IoMenuSharp className='fs-1 text-light'/></div>
            </div>
        </header>
        {sidebar && <div className='sidebar-small-screen'>
             <h2 style={{display:"flex",gap:'10px'}}><span><MdOutlineDashboard className='fs-1 text-light'/></span><span className='text-light'>Dashboard</span></h2>
             <div className='close-btn-small'onClick={()=>{setSidebar(false)}}><IoMdClose className='fs-1 text-dark'/></div>
             <ul className='list-unstyled p-3' >
              <li className={Home ? "active-link-css" : ""} onClick={()=>{setSidebar(false);setHome(true);setUser(false); setNewCustomer(false);setBill(false);setReceipt(false)}} style={{display:"flex",gap:'10px'}}><span><FaHome className='text-light fs-2'/></span><span className='fs-5 text-light'>Home</span></li>
              <li className={User ? "active-link-css" : ""} onClick={()=>{setSidebar(false);setHome(false);setUser(true); setNewCustomer(false);setBill(false);setReceipt(false)}} style={{display:"flex",gap:'10px'}}><span><FaUserTie className='text-light fs-2'/></span><span className='fs-5 text-light'>User</span></li>
              <li className={newCustomer ? "active-link-css" : ""} onClick={()=>{setSidebar(false);setHome(false);setNewCustomer(true);setUser(false);setBill(false);setReceipt(false)}} style={{display:"flex",gap:'10px'}}><span><IoMdPersonAdd className='text-light fs-2'/></span><span className='fs-5 text-light'>Create new Customer</span></li>

              <li className={Bill ? "active-link-css" : ""} onClick={()=>{setSidebar(false);setHome(false); setNewCustomer(false);setUser(false);setBill(true);setReceipt(false)}} style={{display:"flex",gap:'10px'}}><span><FaMoneyBillWave className='text-light fs-2'/></span><span className='fs-5 text-light'>Bill</span></li>
              <li className={receipt ? "active-link-css" : ""} onClick={()=>{setSidebar(false);setHome(false);setUser(false);setNewCustomer(false);setBill(false);setReceipt(true)}} style={{display:"flex",gap:'10px'}}><span><FaReceipt className='text-light fs-2'/></span><span className='fs-5 text-light'>Receipt</span></li>
             </ul>
        </div>}
        <div className='component-dash-display'>
          {component}
        </div>
       </div>
        </div>
  )
}

export default Admin