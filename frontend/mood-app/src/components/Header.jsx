import React, { useState, useContext, useEffect, useRef } from 'react'
import './Header.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import { IoIosClose } from "react-icons/io";

const Header = () => {

    const { user, handleLogout } = useContext(AuthContext)

    const collapsedRef = useRef()

    const sidebar = () => {
        collapsedRef.current.classList.toggle('show-sidebar')
    }

  return (
      <div className='header'>
          {
              user ? 
                  <nav className='logged-in'>
                      <div className="collapse">
                        <AiOutlineMenu className='header-menu' onClick={sidebar}/>
                      </div>
                      <div className="show-links" ref={collapsedRef}>
                          <div className="close-btn">
                            <IoIosClose/>
                          </div>
                            <Link to='/users'><h3 className='users-btn'>Most Recent Users</h3></Link>
                            <Link to='/posts'><h3> View Posts</h3></Link> 
                            <Link to="/post/create"><h3>Post a Message</h3> </Link>
                      </div>
                        <h3 className='desc'>This is a social media app where users air out their moods</h3>
                        <h3 className='welcome'>Welcome <span>{ user.name}</span></h3>
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                  :
                    <nav className='logged-out'>
                        <h3 className='desc'>This is a social media app where users air out their moods</h3>
                        <button type='submit'> <Link to='/signin'>Login</Link></button>
                    </nav>
        }
    </div>
  )
}

export default Header