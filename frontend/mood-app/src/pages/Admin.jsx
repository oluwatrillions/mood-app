import React, { useContext, useEffect, useState } from 'react'
import './Admin.css'
import AuthContext from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Users from './Users'
import Posts from './Posts'

const Admin = () => {

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  
  return (
    <div className='admin-page'>
        <section className='users-section'>
          <h1>Users</h1>
          <Users/>
        </section>
    </div>
  )
}

export default Admin