import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import ProtectedRoutes from './Utils/ProtectedRoutes';
import Usergenarator from './Components/Usergenarator';
import Receiptgen from './Components/Receiptgen';
import Genwaterbill from './Components/Genwaterbill';
import Dashboard from './Pages/Dashboard';
import Admin from './Pages/Admin';
import AddUser from './Components/AddUser';
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
