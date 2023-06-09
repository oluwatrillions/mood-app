import React, { useState } from 'react'
import './SignUp.css'
import AllUsers from '../components/AllUsers'

const SignUp = () => {

    const [signup, setSignup] = useState({
        name: ' ',
        password: '',
    })

    const handleSignup = (e) => {
        e.preventDefault();
        setSignup({ ...signup})
        setSignup()
        console.log(signup);
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
                          value={signup.name}
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
                  <button className='signIn-btn'>Sign Up</button>
              </form>
          </div>
    </div>
  )
}

export default SignUp