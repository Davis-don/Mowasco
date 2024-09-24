import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutes = () => {
    // const Token = Cookies.get('userToken');
    const Token = sessionStorage.getItem('userToken');
    
    return Token || Token == null || Token == undefined ? <Outlet/> : <Navigate to='/' />;
}

export default ProtectedRoutes;
