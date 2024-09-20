import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './User/pages/Auth/Login';
import ProtectedRoutes from './Utils/ProtectedRoutes';
import Receiptgen from './User/pages/Receipt/Receiptgen'
import Genwaterbill from './User/pages/Bill/Genwaterbill';
import Dashboard from './Admin/Components/Dashboard';
import Admin from './Admin/Components/Admin';
import CreateMeters from './Admin/Pages/Meters/CreateMeters';
import Water_reading from './User/pages/Water_readings/Water_reading';
import Billing_payment from './Admin/Pages/Billing_Payments/Billing_payment';
import Navigation from './Admin/Components/Navigation';
import WaterReading from './Admin/Pages/Water_Readings/WaterReading';
import AdminDashboard from './Admin/Pages/AdminDashboard/AdminDashboard';
import SideNav from './Admin/Components/SideNav';
import Customers from './Admin/Pages/New_customer/Customers';
import AddNewCustomers from './Admin/Pages/New_customer/AddNewCustomers';
import ViewCustomer from './Admin/Pages/New_customer/ViewCustomer';
import UpdateCustomer from './Admin/Pages/New_customer/UpdateCustomer';
import AboutMeter from './Admin/Pages/Meters/AboutMeter';
import ViewBill from './Admin/Pages/Billing_Payments/ViewBill';
import MeterReadingHistory from './Admin/Pages/Water_Readings/MeterReadingHistory';
import RegisterMeters from './Admin/Pages/Meters/RegisterMeters';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoutes/>}>
            <Route path="/Admin/Dashboard" element={<Admin />} />
            <Route path='/customer/meter/:id' element={<Genwaterbill/>}/>
            <Route path='/customer/current-reading/:id' element={<Water_reading/>}/>
            <Route path='/customer/meter/receipt/:id' element={<Receiptgen/>}/>
            <Route path="/Account/login" element={<Dashboard />} />
            {/* <Route path='/:cust_id/create-meter' element={<CreateMeters/>} /> */}
            </Route>
      </Routes>
      <div className='dis'>
        <Admin/>
        <Navigation/>
        <SideNav/>
        <div className='content'>
          <Routes>
            <Route path='/manage-customers' element={<Customers/>}/>
            <Route path='/billing-payment' element={<Billing_payment/>}/>
            <Route path='/dashboard' element={<AdminDashboard/>}/>
            <Route path='/manage-meters' element={<CreateMeters/>}/>
            <Route path='/manage-water-readings' element={<WaterReading/>}/>
            <Route path='/add-new-customer' element={<AddNewCustomers/>}/>
            <Route path='/customer-details/:cust_id' element={<ViewCustomer/>}/>
            <Route path='/update-customer/:cust_id' element={<UpdateCustomer/>}/>
            <Route path='/:meter_id/meter-history' element={<AboutMeter/>}/>
            <Route path='/customer-bill/:bill_id' element={<ViewBill/>}/>
            <Route path='/meter-readings-history' element={<MeterReadingHistory/>}/>
            <Route path='/customer/:cust_id/assign-meter' element={<RegisterMeters/>}/>
        </Routes>

        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
