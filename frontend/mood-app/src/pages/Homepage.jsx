import React, { useContext } from 'react'
import './Homepage.css'
import {Link} from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'

const Homepage = () => {

  // const {user} = useContext(AuthContext)
  // console.log(user);
  
  return (
      <div className='hero'>
          <div className='left-hero'></div>
          <section className='hero-page'>
              <img src="./images/moods.jpg" alt="" /> 
              <div className='hero-prompts'>
                  <h5>Care to tell us about your day? <Link to={'/signup'}>Sign Up</Link></h5>
                  <h5>Member? <Link to={'/signin'}>Sign In</Link></h5>
                </div>
          </section>
          <div className='right-hero'></div>
    </div>
  )
}

export default Homepage