import React, { useState } from 'react'
import './SignUp.css'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notif, setNotif] = useState(null)

    const navigate = useNavigate()

     const AccountSuccess = () => {
            const timer = setTimeout(() => {
                navigate('/signin')
                const clear = () => {
                    clearTimeout(timer)
            }
            }, 3000)
        }

    const handleSignup = async (e) => {
        e.preventDefault();
       try {
           const userDetails = await fetch('http://localhost:4000/signup', {
               method: 'POST',
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify({
                   name,
                   username,
                   password
               })
           }).then(res => {
               if (res.ok) {
                   setName('')
                   setUsername('')
                   setPassword('')
                   AccountSuccess()
               } else {
                    setName('')
                    setUsername('')
                    setPassword('')
               }
               return res.json();
           }).then(data => {
               console.log(name, username, password);
               setNotif(data.message)
           })
       } catch (error) {
        console.log(error);
       }
    }

  return (
      <div className='register'>
          <div className='signup'>
              <img src="./images/smiley.png" alt="" />
              <h3 className='notif'>{ notif }</h3>
              <form onSubmit={handleSignup}>
                  <div className='inputs'>
                      <label htmlFor="name">Name:</label>
                      <input
                          type="text"
                          name='name'
                          value={name}
                          required
                          onChange={ ((e)=> setName(e.target.value))} />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="username">Username:</label>
                      <input
                          type="text"
                          name='username'
                          value={username}
                          required
                          onChange={ ((e)=> setUsername(e.target.value))} />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="password">Password:</label>
                      <input
                          type="password"
                          name='password'
                          value={password}
                          required
                          onChange={((e) => setPassword(e.target.value))} />
                  </div>
                  <button className='signIn-btn' type='submit'>Sign Up</button>
              </form>
          </div>
    </div>
  )
}

export default SignUp