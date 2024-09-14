import React, { useState, useContext, useEffect, useRef } from 'react'
import './Header.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import { IoIosClose } from "react-icons/io";

const Header = () => {

    const { user, handleLogout } = useContext(AuthContext)
    console.log();
    

    const [users, setUsers] = useState([])

    const collapsedRef = useRef()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
      fetch('http://localhost:4000/users')
      .then((res)=> res.json())
      .then((data)=> setUsers(data.find(currentUser => currentUser.email === user.email))
  )
}, [users])  

    if(!users) {
      handleLogout()
    }

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
                          {
                            users.roles === 'admin' ?
                            <>
                              <Link to='/admin'><h3 className={location.pathname.endsWith("/admin") ? "users-btn active" : "users-btn"}>Admin</h3></Link>
                              {/* <Link to='/users'><h3 className={location.pathname.endsWith("/users") ? "users-btn active" : "users-btn"}>Most Recent Users</h3></Link> */}
                              <Link to='/posts'><h3 className={location.pathname.endsWith("/posts") ? "users-btn active" : "users-btn"}> View Posts</h3></Link> 
                              <Link to="/post/create"><h3 className={location.pathname.endsWith("/post/create") ? "users-btn active" : "users-btn"}>Post a Message</h3> </Link>
                              <Link to="/posts/likes"><h3 className={location.pathname.endsWith("/posts/likes") ? "users-btn active" : "users-btn"}>Likes and Comments</h3> </Link>
                            </>
                            :
                            <>
                            <Link to='/posts'><h3 className={location.pathname.endsWith("/posts") ? "users-btn active" : "users-btn"}> View Posts</h3></Link> 
                            <Link to="/post/create"><h3 className={location.pathname.endsWith("/post/create") ? "users-btn active" : "users-btn"}>Post a Message</h3> </Link>
                            <Link to="/posts/likes"><h3 className={location.pathname.endsWith("/posts/likes") ? "users-btn active" : "users-btn"}>Likes and Comments</h3> </Link>
                            </>
                          } 
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