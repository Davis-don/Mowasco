import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './User/pages/Auth/Login';
import ProtectedRoutes from './Utils/ProtectedRoutes';
import Usergenarator from './User/pages/User_Generator/Usergenarator';
import Receiptgen from './User/pages/Receipt/Receiptgen'
import Genwaterbill from './User/pages/Bill/Genwaterbill';
import Dashboard from './Admin/Components/Dashboard';
import Admin from './Admin/Components/Admin';
import CreateMeters from './Admin/Pages/Meters/CreateMeters';
import AddUser from '../src/User/pages/Create_User/AddUser';
import Cookies from 'js-cookie';
import Water_reading from './User/pages/Water_readings/Water_reading';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoutes/>}>
            <Route path="/Admin/Dashboard" element={<Admin />} />
            <Route path="/Account/login" element={<Dashboard />} />
            <Route path='/customer/meter/:id' element={<Genwaterbill/>}/>
            <Route path='/customer/current-reading/:id' element={<Water_reading/>}/>
            <Route path='/customer/meter/receipt/:id' element={<Receiptgen/>}/>
            <Route path='/:cust_id/create-meter' element={<CreateMeters/>} />

            </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
