import React, { useContext, useEffect, useState } from 'react'
import './Admin.css'
import AuthContext from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Admin = () => {

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  
  return (
    <div className='admin-page'>
        <h5>ADMIN PAGE MY PEOPLE</h5>
    </div>
  )
}

export default Admin