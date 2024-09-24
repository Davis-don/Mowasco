import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import store from '../store/dataStore';

const ProtectedRoutes = () => {
    const user = store((state) => state.user)

    console.log('user', typeof(user))
    // const Token = Cookies.get('userToken');
    const Token = sessionStorage.getItem('userToken');
    
    // return Token || Token == null || Token == undefined ? <Outlet/> : <Navigate to='/' />;
    if(user != null){
        <Outlet/>
    } else{
        <Navigate to={'/'}/>
    }
    // return user !== null ? <Outlet/> : Navigate('/')
    return user != null? <Outlet/> : <Navigate to={'/'}/>
}

export default ProtectedRoutes;
