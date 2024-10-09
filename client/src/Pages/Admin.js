import React from 'react'
import './Admin.css'
import AddUser from '../Components/AddUser';
import { GrUserWorker } from "react-icons/gr";
import { useState } from 'react';
import { IoMenuSharp, IoWaterOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { MdOutlineDashboard } from "react-icons/md";
import { FaHome, FaUserTie,FaMoneyBillWave,FaRegUser,FaTachometerAlt,FaRegCopyright } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { SiMockserviceworker } from "react-icons/si";
import { TbSum } from "react-icons/tb";
import 'bootstrap/dist/css/bootstrap.min.css'
function Admin() {
  const [sidebar,setSidebar]=useState(false);
  const [dashboard,setDashboard]=useState(true);
  const [user,setUser]=useState(false);
  var component;

//Admin dashboard component
function Admindashboard() {

  return(
    <div className='overall-admin-dashboard-component'>
      <div className='admin-dashboard-header'>
       <h3 style={{textAlign:"center"}}>General Statistics</h3>
      </div>



      <div className='admin-dashboard-body'>
      <div className='general-information-summary-container'>
        <div className='employees-statistics'>
      <div className='active-employees card container-fluid'>
        <div className='employees-active-left'>
          <div>
          <p><small style={{fontWeight:"bold"}} className='text-secondary'>Active employees</small></p>
          </div>
        <div>
        <p className='active-summation-container text-light'><span><TbSum/></span><span>200</span> </p>
        </div>
        </div>
        <div className='employees-active-right rounded'>
          <p className='employee-active-icon '><span><GrUserWorker className='fs-1 text-light' /></span></p>
        </div>
         
      </div>
      <div className='inactive-employees card container-fluid'>
      <div className='employees-inactive-left'>
          <div>
          <p><small style={{fontWeight:"bold"}} className='text-secondary'>Inactive employees</small></p>
          </div>
        <div>
        <p className='Inactive-summation-container text-light'><span><TbSum/></span><span>200</span> </p>
        </div>
        </div>
        <div className='employees-inactive-right rounded'>
          <p className='employee-inactive-icon '><span><SiMockserviceworker className='fs-1 text-light' /></span></p>
        </div>
        </div>
        </div>





        <div className='client-statistics'>
      <div className='admin-active-clients card container-fluid'>
          <div className='clients-active-left'>
           <div>
           <p><small style={{fontWeight:"bold"}} className='text-secondary'>Active Clients</small></p>
           </div>
           <div>
           <p className='admin-clients-active-summation-container text-light'><span><TbSum/></span><span>200</span> </p>
           </div>
          </div>
          <div className='clients-active-right'>
          <p className='admin-client-active-icon '><span><FaTachometerAlt className='fs-1 text-light' /></span></p>
          </div>
      </div>




      <div className='admin-inactive-clients card container-fluid'>
      <div className='clients-inactive-left'>
           <div>
           <p><small style={{fontWeight:"bold"}} className='text-secondary'>Inactive Clients</small></p>
           </div>
           <div>
           <p className='admin-clients-inactive-summation-container text-light'><span><TbSum/></span><span>200</span> </p>
           </div>
          </div>
          <div className='clients-inactive-right'>
          <p className='admin-client-inactive-icon '><span><ImCross className='fs-1 text-light' /></span></p>
          </div>
      </div>
        </div>
       </div>


       <div className='general-clients-details-on-zones '>
        <div className='clients-by-zone-container card container-fluid'>
        <div className='card-header'>
        <p><small style={{fontWeight:"bold"}} className='text-light fs-4'>Clients by zones</small></p>

        <table>
    <thead>
        <tr className='text-light'>
            <th>Zone</th>
            <th>Active</th>
            <th>Inactive</th>
            <th>All</th>
        </tr>
    </thead>
    <tbody>
        <tr className='text-light'>
            <td>Zone 1</td>
            <td>50</td>
            <td>30</td>
            <td>80</td>
        </tr>
        <tr className='text-light'>
            <td>Zone 2</td>
            <td>70</td>
            <td>20</td>
            <td>90</td>
        </tr>
        <tr className='text-light'>
            <td>Zone 3</td>
            <td>60</td>
            <td>40</td>
            <td>100</td>
        </tr>
    </tbody>
</table>


        </div>
        </div>
        
       
       </div>

      </div>
      <div className='admin-dashboard-footer'>
      <p style={{textAlign:"center"}}><FaRegCopyright className='text-dark'/>2024,made by winkywebus developers</p>
      </div>
    </div>
  )
}
//Admin user component
function AdminUser() {

  return(
    <div className='overall-admin-user-component'>
      <AddUser/>
    </div>
  )
}

//if else to handle display logic of component
if(dashboard == true){
component=<Admindashboard/>
}
else if(user == true){
component=<AdminUser/>
}





  return (
    <div className='overall-admin-page-container'>
      <div className='small-screen-all-body'>
      <div className='admin-page-header'>
        <div className='admin-page-header-content-holder'>
        <div className='admin-name'>
          <h3 className='text-light'>Welcome Davis Ikou (Administrator)</h3>
         </div>
         <div className='admin-interacting-icons'>
          <IoMenuSharp className='fs-1 text-light' onClick={()=>setSidebar(!sidebar)}/>
         </div>
        </div>
         
      </div>
   
      { sidebar && <div className='admin-page-side-bar'>
        <div className='admin-sidebar-header'>
         <h4 style={{textAlign:'center'}} className='text-light'><span ><IoWaterOutline className='fs-1'/></span><span>Muwasco</span></h4>
        </div>
        <div className='admin-sidebar-body'>
            <div className='admin-links-page-list-container'>
             <ul className='list-unstyled admin-link-ul'>
             <li onClick={()=>{setDashboard(true);setUser(false);setSidebar(false)}} style={dashboard ? { backgroundColor: "black",padding:"10px" } : {}} className='text-light'><span className='p-1 admin-link-icon rounded-circle'><MdOutlineDashboard className='fs-4'/></span><span className='admin-link-name'>Dashboard</span></li>
              <li onClick={()=>{setDashboard(false);setUser(true);setSidebar(false)}} className='text-light' style={user ? { backgroundColor: "black",padding:"10px" } : {}}  ><span className='p-1 admin-link-icon rounded-circle'><FaRegUser className='fs-4'/></span><span className='admin-link-name'>Users</span></li>
             </ul>
            </div>
        </div>
        <div className='admin-sidebar-footer'>

        </div>
      </div>}
      <div className='admin-page-body'>
        {component}
      </div>
      <div className='admin-page-footer'>

      </div>
      </div>
      <div className='large-screen-all-body'>
      </div>














    </div>
  )
}

export default Admin