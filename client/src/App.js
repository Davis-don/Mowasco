import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './User/pages/Auth/Login';
import ProtectedRoutes from './Utils/ProtectedRoutes';
import Usergenarator from './User/pages/User_Generator/Usergenarator';
import Receiptgen from './User/pages/Receipt/Receiptgen'
import Genwaterbill from './User/pages/Bill/Genwaterbill';
import Dashboard from './Admin/Components/Dashboard';
import Admin from './Admin/Components/Admin';
import AddUser from '../src/User/pages/Create_User/AddUser';
import Cookies from 'js-cookie';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoutes/>}>
            <Route path="/Admin/Dashboard" element={<Admin />} />
            <Route path="/Account/login" element={<Dashboard />} />
            </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
