import React, { useContext, useEffect, useState } from 'react'
import './SignUp.css'
import AuthContext from '../Contexts/AuthContext'
import {useGoogleLogin, GoogleLogin} from "@react-oauth/google"
import axios from "axios"

const SignIn = () => {

    const { notif, handleLogin, loginSuccess } = useContext(AuthContext)

    const [googleUser, setGoogleUser] = useState([])
    const [profile, setProfile] = useState([])

    const login = useGoogleLogin({
      onSuccess: (codeResponse) => setGoogleUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  })

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post('http://localhost:4000/auth/google', {
        code,
      });
  
      console.log(tokens);
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