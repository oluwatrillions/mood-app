import React, { useContext, useEffect, useState } from 'react'
import './SignUp.css'
import AuthContext from '../Contexts/AuthContext'
// import {useGoogleLogin} from "@react-oauth/google"
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios"

const SignIn = () => {

    const { notif, handleLogin, loginSuccess } = useContext(AuthContext)

  //   const [googleUser, setGoogleUser] = useState()
  //   const [profile, setProfile] = useState()

  //   const login = useGoogleLogin({
  //     onSuccess: (codeResponse) => setGoogleUser(codeResponse),
  //     onError: (error) => console.log('Login Failed:', error)
  // })



//   useEffect(() => {
//         if (googleUser) {
//             axios(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${googleUser.access_token}`,
//                         Accept: 'application/json',
//                         'Cross-Origin-Embedder-Policy': 'unsafe-none'
//                     }
//                 })
//                 .then((res) => {
//                   console.log(res.data);
                  
//                     setProfile(res.data);
//                     loginSuccess()
//                 })
//                 .catch((err) => console.log(err));
//         }
//     },
//     [ googleUser ]
// );

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
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />;
    </div>
  )
}

export default SignIn