import React, { useContext, useEffect, useState } from 'react'
import './Admin.css'
import AuthContext from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Users from './Users'

const Admin = () => {

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  
  return (
    <div className='admin-page'>
        <section>
          <Users/>
        </section>
    </div>
  )
}

export default Admin