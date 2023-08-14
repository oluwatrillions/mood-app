import React, { useContext, useState } from 'react'
import './SignUp.css'
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from '../Contexts/AuthContext'

const SignIn = () => {

    const navigate = useNavigate()

    const { notif, handleLogin } = useContext(AuthContext)

    

  return (
    <div className='register'>
          <div className='signup'>
              <img src="./images/signin.jpg" alt="" />
              <h3 className='notif'>{ notif }</h3>
              <form onSubmit={handleLogin}>
                  <div className='inputs'>
                      <label htmlFor="name" id='username'>Username:</label>
                      <input
                          type="text"
                          name='username'
                        />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="password" id='password'>Password:</label>
                      <input
                          type="password"
                          name='password'
                        />
                  </div>
                  <button className='signIn-btn' type='submit'>Sign In</button>
              </form>
          </div>
    </div>
  )
}

export default SignIn