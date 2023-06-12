import React, { useState } from 'react'
import './SignUp.css'
import AllUsers from '../components/AllUsers'

const SignUp = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState()

    const handleSignup = (e) => {
        e.preventDefault();
        console.log(name, password);
    }

  return (
      <div className='register'>
          <div className='signup'>
              <img src="./images/smiley.png" alt="" />
              <form onClick={handleSignup}>
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