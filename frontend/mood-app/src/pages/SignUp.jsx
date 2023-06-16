import React, { useState } from 'react'
import './SignUp.css'
import AllUsers from '../components/AllUsers'
import Data from '../components/Data'

const SignUp = () => {

    const [signup, setSignup] = useState({
        name: '',
        password: '',
    })

    const handleSignup = (e) => {
        e.preventDefault();

        let usersLog = {}
        let userInput = {
            username: setSignup(e.target.name),
            userPassword: setSignup(e.target.password)
            console.log(username);
        }

        usersLog.users = Data
        setSignup([...usersLog.users, userInput])
        console.log(userInput);
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