import React, { useContext, useEffect, useState } from 'react'
import './SignUp.css'
import AuthContext from '../Contexts/AuthContext'
import {useGoogleLogin} from "@react-oauth/google"
import axios from "axios"
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const SignIn = () => {

    const { notif, setNotif, handleLogin, user, setUser, setUserToken } = useContext(AuthContext)
    const navigate = useNavigate()
  
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post('http://localhost:4000/auth/google', {code,
      });      
      
      if(tokens?.data?.accessToken){        
        localStorage.setItem('accesstoken', JSON.stringify(tokens.data?.accessToken))
        setUserToken(tokens.data?.accessToken)            
        setUser(jwtDecode(tokens.data?.accessToken))
        navigate('/posts')
      } else {
        console.log(tokens.data.message);
      }
    },
    flow: 'auth-code',
  })  

  return (
    <div className='register'>
          <div className='signup'>
              <img src="./images/signin.jpg" alt="" className='sign-in-img'/>
              <h3 className='notif'>{ notif }</h3>
              <form onSubmit={handleLogin}>
                  <div className='inputs'>
                      <label htmlFor="email" id='email'>Email:</label>
                      <input
                          type="email"
                          name='email'
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
          <button onClick={googleLogin} className='google-btn'>Sign in with Google 🚀</button>
    </div>
  )
}

export default SignIn