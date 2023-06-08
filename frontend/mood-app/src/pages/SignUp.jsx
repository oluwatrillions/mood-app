import React from 'react'
import './SignUp.css'

const SignUp = () => {
  return (
      <div className='register'>
          <div className='signup'>
              <img src="./images/smiley.png" alt="" />
              <form>
                  <div className='inputs'>
                      <label htmlFor="name">Name:</label>
                      <input type="text" name='name' required/>
                  </div>
                  <div className='inputs'>
                      <label htmlFor="password">Password:</label>
                      <input type="password" name='password' required/>
                  </div>
                  <button className='signIn-btn'>Sign Up</button>
              </form>
          </div>
    </div>
  )
}

export default SignUp