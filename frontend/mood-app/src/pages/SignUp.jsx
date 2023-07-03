import React, { useState } from 'react'
import './SignUp.css'
import AllUsers from '../components/AllUsers'
import Data from '../components/Data'

const SignUp = () => {

    let usersLog = {}
    
    const [signup, setSignup] = useState({
        name: "",
        username: "",
        password: ""
    })

    const handleSignup = (e) => {
        e.preventDefault();
        const name = setSignup({[e.target.name]: e.target.value})
        const password = setSignup({[e.target.password]: e.target.value})
        const data = {
            name: name,
            username: username,
            password: password,
        }
        setSignup(data)
        console.log(data);
    }

  return (
      <div className='register'>
          <div className='signup'>
              <img src="./images/smiley.png" alt="" />
              <form onSubmit={handleSignup}>
                  <div className='inputs'>
                      <label htmlFor="name">Name:</label>
                      <input
                          type="text"
                          name='name'
                          value={signup.name}
                          required
                          onChange={ ((e)=> setSignup(e.target.value))} />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="username">Username:</label>
                      <input
                          type="text"
                          name='username'
                          value={signup.username}
                          required
                          onChange={ ((e)=> setSignup(e.target.value))} />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="password">Password:</label>
                      <input
                          type="password"
                          name='password'
                          value={signup.password}
                          required
                          onChange={((e) => setSignup(e.target.value))} />
                  </div>
                  <button className='signIn-btn' type='submit'>Sign Up</button>
              </form>
          </div>
    </div>
  )
}

export default SignUp