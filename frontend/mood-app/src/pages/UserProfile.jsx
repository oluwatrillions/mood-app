import React, { useEffect } from 'react'
import './UserProfile.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


const UserProfile = () => {

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            let decodedToken = jwt_decode(token);
            console.log(decodedToken);
        }
    }, [])

  return (
      <div className='profile'>
          <div className="dashboard">dashboard</div>
          <div className="user-content">content page</div>
    </div>
  )
}

export default UserProfile