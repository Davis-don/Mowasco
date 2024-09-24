import React from 'react'
import { IoMenuSharp } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FaHome, FaUserTie,FaMoneyBillWave } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import './Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Usergenarator from '../../User/pages/User_Generator/Usergenarator';
import Genwaterbill from '../../User/pages/Bill/Genwaterbill';
import Receiptgen from '../../User/pages/Receipt/Receiptgen';
import Homecomponent from '../../User/Components/UserDasboard'
import CreateMeters from '../Pages/Meters/CreateMeters';
import Navigation from './Navigation';

function Dashboard() {
const [sidebar,setSidebar]=useState(false);
const [Home,setHome]=useState(true);
const [Customer,setCustomer]=useState(false);
const [Bill,setBill]=useState(false);
const [receipt,setReceipt]=useState(false);
let component;
if(Home==true){
component=<Homecomponent/>
}
else if(Customer==true){
  component=<Usergenarator/>
}
else if(Bill==true){
  component=<Genwaterbill/>
}
else if(receipt==true){
  component=<Receiptgen/>

}

  return (
    <div className='overall-dashboard-container header'>
       <div className='small-phone-display'>
        <header className='dashboard-header-small'>
           <div className='left-side-small-screen-content'>

           </div>
           <div className='right-side-small-screen-content'>
              <div onClick={()=>{setSidebar(true)}}><IoMenuSharp className='fs-1 text-light'/></div>
            </div>
        </header>
        {sidebar && <div className='sidebar-small-screen'>
             <h2 style={{display:"flex",gap:'10px'}}><span><MdOutlineDashboard className='fs-1 text-light'/></span><span className='text-light'>Dashboard</span></h2>
             <div className='close-btn-small'onClick={()=>{setSidebar(false)}}><IoMdClose className='fs-1 text-dark'/></div>
             <ul className='list-unstyled p-3' >
              <li className={Home ? "active-link-css" : ""} onClick={()=>{setSidebar(false);setHome(true);setCustomer(false);setBill(false);setReceipt(false)}} style={{display:"flex",gap:'10px'}}><span><FaHome className='text-light fs-2'/></span><span className='fs-5 text-light'>Home</span></li>
              <li className={Customer ? "active-link-css" : ""} onClick={()=>{setSidebar(false);setHome(false);setCustomer(true);setBill(false);setReceipt(false)}} style={{display:"flex",gap:'10px'}}><span><FaUserTie className='text-light fs-2'/></span><span className='fs-5 text-light'>Customer</span></li>
              <li className={Bill ? "active-link-css" : ""} onClick={()=>{setSidebar(false);setHome(false);setCustomer(false);setBill(true);setReceipt(false)}} style={{display:"flex",gap:'10px'}}><span><FaMoneyBillWave className='text-light fs-2'/></span><span className='fs-5 text-light'>Bill</span></li>
              <li className={receipt ? "active-link-css" : ""} onClick={()=>{setSidebar(false);setHome(false);setCustomer(false);setBill(false);setReceipt(true)}} style={{display:"flex",gap:'10px'}}><span><FaReceipt className='text-light fs-2'/></span><span className='fs-5 text-light'>Receipt</span></li>
             </ul>
        </div>}
        <div className='component-dash-display'>
          {component}
        </div>
       </div>
    </div>
  )
}

export default Dashboard