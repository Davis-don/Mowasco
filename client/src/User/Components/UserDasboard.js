import React from 'react'
import './Homecomponent.css'
import Usergenarator from '../pages/User_Generator/Usergenarator'
import store from '../../store/dataStore'
function UserDasboard() {
  const user= store((state) => state.user)
  return (
    <div className='overall-home-component'>
        {<Usergenarator/>}
        </div>
  )
}

export default UserDasboard