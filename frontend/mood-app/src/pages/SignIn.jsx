import React from 'react'
import './SignUp.css'

const SignIn = () => {
  return (
    <div className='register'>
          <div className='signup'>
              <img src="./images/signin.jpg" alt="" />
              <form >
                  <div className='inputs'>
                      <label htmlFor="name">Name:</label>
                      <input
                          type="text"
                          name='name'
                        />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="password">Password:</label>
                      <input
                          type="password"
                          name='password'
                        />
                  </div>
                  <button className='signIn-btn' type='submit'>Sign In</button>
              </form>
          </div>
    </div>
  )
}

export default SignIn