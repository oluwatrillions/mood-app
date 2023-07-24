import React, { useState } from 'react'
import './SignUp.css'
import { useNavigate, useParams } from "react-router-dom"

const SignIn = () => {

    const {userId} = useParams()



    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notif, setNotif] = useState(null)

    const navigate = useNavigate()

    const loginSuccess = () => {
        const timer = setTimeout(() => {
            navigate('/userprofile')
            const clear = () => {
                clearTimeout(timer)
            }
        }, 3000)
    }   

    const handleLogin = async (e) => {
        e.preventDefault()
       try {
         const loginBtn = await fetch('http://localhost:4000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: username,
                pwd: password,
            })
         }).then((response) => {
             console.log(response);
             if (response.ok) {
                 setUsername('')
                 setPassword('')
                 loginSuccess();
             } else {
                 setUsername('')
                 setPassword('')
             }
            return response.json()
         }).then((data) => {
             console.log(data);
             localStorage.setItem('userToken', data.accessToken)
            setNotif(data.message)
        })
       } catch (error) {
            console.log(error);
       }
      
}

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
                          value={username}
                          onChange={(e)=> setUsername(e.target.value)}
                        />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="password" id='password'>Password:</label>
                      <input
                          type="password"
                          name='password'
                          value={password}
                          onChange={(e)=> setPassword(e.target.value)}
                        />
                  </div>
                  <button className='signIn-btn' type='submit'>Sign In</button>
              </form>
          </div>
    </div>
  )
}

export default SignIn