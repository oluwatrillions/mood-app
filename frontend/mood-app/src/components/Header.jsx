import React, { useState, useContext, useEffect, useRef } from 'react'
import './Header.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import { IoIosClose } from "react-icons/io";

const Header = () => {

    const { user, handleLogout } = useContext(AuthContext)            

    const collapsedRef = useRef()
    const location = useLocation()

    const sidebar = () => {
        collapsedRef.current.classList.toggle('show-sidebar')
    }

    const closeSidebar = () => {
        collapsedRef.current.classList.remove('show-sidebar')
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
                            <IoIosClose onClick={closeSidebar}/>
                          </div>
                          <h3 className='welcome'>Welcome <span>{ user.name}</span></h3>
                          {
                            user.roles === 'admin' ?
                            <ul>
                              <Link to='/admin'><li className={location.pathname.endsWith("/admin") ? "users-btn active" : "users-btn"}>Admin Page</li></Link>
                              {/* <Link to='/users'><h3 className={location.pathname.endsWith("/users") ? "users-btn active" : "users-btn"}>Most Recent Users</h3></Link> */}
                              <Link to='/posts'><li className={location.pathname.endsWith("/posts") ? "users-btn active" : "users-btn"}> View Posts</li></Link> 
                              <Link to="/post/create"><li className={location.pathname.endsWith("/post/create") ? "users-btn active" : "users-btn"}>Post a Message</li> </Link>
                              <Link to="/posts/likes"><li className={location.pathname.endsWith("/posts/likes") ? "users-btn active" : "users-btn"}>Likes and Comments</li> </Link>
                            </ul>
                            :
                            <ul>
                            <Link to='/posts'><li className={location.pathname.endsWith("/posts") ? "users-btn active" : "users-btn"}> View Posts</li></Link> 
                            <Link to="/post/create"><li className={location.pathname.endsWith("/post/create") ? "users-btn active" : "users-btn"}>Post a Message</li> </Link>
                            <Link to="/posts/likes"><li className={location.pathname.endsWith("/posts/likes") ? "users-btn active" : "users-btn"}>Likes and Comments</li> </Link>
                            </ul>
                          } 
                      </div>
                      {
                        user ? 
                          <h3 className='desc'>Tell us about your mood</h3>
                        : 
                          <h3 className='desc'>Want to air out your mood?</h3>
                      }
                        <button onClick={handleLogout}>Logout</button>
                  </nav>
                  :
                    <nav className='logged-out'>
                        <h3 className='desc'>Want to air out your mood?</h3>
                        <Link to='/signin'>Login</Link>
                    </nav>
        }
    </div>
  )
}

export default Header