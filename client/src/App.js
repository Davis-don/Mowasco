import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Usergenarator from './Components/Usergenarator';
import Receiptgen from './Components/Receiptgen';
import Genwaterbill from './Components/Genwaterbill';
import Dashboard from './Pages/Dashboard';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Account/login" element={<Dashboard />} />
      </Routes>
    </Router>
  
    </div>
  );
}

export default App;
