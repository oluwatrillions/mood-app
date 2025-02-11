import React, { useContext, useEffect, useState } from 'react'
import './SignUp.css'
import AuthContext from '../Contexts/AuthContext'
import {useGoogleLogin} from "@react-oauth/google"
import axios from "axios"
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import useAxios from '../utils/useAxios'
import dayjs from "dayjs";


const SignIn = () => {

    const { notif, setNotif, handleLogin, user, setUser, userToken, setUserToken } = useContext(AuthContext)
    const navigate = useNavigate()

    let api = useAxios()
  
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await api.post('http://localhost:4000/auth/google', 
      {code},
      {withCredentials: true},
      );   
      
      if(tokens.data.accessToken){  

        localStorage.setItem('accesstoken', JSON.stringify(tokens.data.accessToken))
        setUserToken(tokens.data.accessToken)            
        setUser(jwtDecode(tokens.data.accessToken))
        navigate('/posts')
      } 

      // const decodedToken = tokens.data.accessToken ? jwtDecode(tokens.data.accessToken) : null;
      
      //   const isExpired =
      //         decodedToken && dayjs.unix(decodedToken.exp).diff(dayjs()) < 0;
      //     console.log(isExpired);

      //     if (!isExpired) {

      //       const response = await api.post('http://localhost:4000/auth/refreshtoken', 
      //         {withCredentials: true},
      //       );
      //       console.log(response);
      //     }
    },
    flow: 'auth-code',

    // Another way to get user info using flow: implicit
    
    // const googleLogin = useGoogleLogin({
    //   onSuccess: async tokenResponse => {
    //     console.log(tokenResponse);
    //     // fetching userinfo can be done on the client or the server
    //     const userInfo = await axios
    //       .get('https://www.googleapis.com/oauth2/v3/userinfo', {
    //         headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
    //       })
    //       .then(res => res.data);
  
    //     console.log(userInfo);
    //   },
    // })  
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
          <button onClick={googleLogin} className='google-btn'>Sign in with Google</button>
    </div>
  )
}

export default SignIn