import React, { useState, useContext, useEffect } from 'react'
import './Header.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
const Header = () => {

    const { user, handleLogout } = useContext(AuthContext)

  return (
      <div className='header'>
          {
              user ? 
                    <nav className='logged-in'>
                      <AiOutlineMenu className='header-menu' />
                        <Link to='/users'><h3 className='users-btn'>Most Recent Users</h3></Link>
                        <h3 className='welcome'>Welcome <span>{ user.name}</span></h3>
                        <h3 className='desc'>This is a social media app where users air out their moods</h3>
                        <h3><Link to='/posts'> View Posts</Link></h3>  
                        <h3><Link to="/post/create">Post a Message</Link></h3>
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                  :
                    <nav className='logged-out'>
                        <AiOutlineMenu className='header-menu' />
                        <h3 className='desc'>This is a social media app where users air out their moods</h3>
                        <button type='submit'> <Link to='/signin'>Login</Link></button>
                    </nav>
        }
    </div>
  )
}

export default Header