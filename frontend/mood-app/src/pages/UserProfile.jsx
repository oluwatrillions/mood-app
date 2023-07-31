import React, {useEffect, useState} from 'react'
import './UserProfile.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


const UserProfile = () => {


        const token = localStorage.getItem('userToken');
            let decodedToken = jwt_decode(token);
            console.log(decodedToken);

  return (
      <div className='profile'>
          <div className="dashboard">
              <img src={`http://localhost:4000/public/avatar/${decodedToken.avatar}`} alt="" />
              <h2>{decodedToken.name}</h2>
              <h4> @{ decodedToken.username}</h4>
          </div>
    </div>
  )
}

export default UserProfile