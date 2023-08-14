import React, {useContext, useEffect, useState} from 'react'
import './UserProfile.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import AuthContext from '../Contexts/AuthContext'


const UserProfile = () => {

    const { user } = useContext(AuthContext)
  

  return (
      <div className='profile'>
          <div className="dashboard">
              <img src={`http://localhost:4000/public/avatar/${user.avatar}`} alt="" />
              <h2>{user.name}</h2>
              <h4> @{ user.username}</h4>
          </div>
    </div>
  )
}

export default UserProfile