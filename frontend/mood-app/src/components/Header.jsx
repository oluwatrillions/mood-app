import React, { useState, useContext } from 'react'
import './Header.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
const Header = () => {

    const {user, handleLogout} = useContext(AuthContext)

    const [isSignedIn, setIsSignedIn] = useState(false)

  return (
      <div className='header'>
          {
              user ? 
                    <nav>
                        <AiOutlineMenu className='header-menu' />
                        <h3>Welcome { user}</h3>
                        <h3>This is a social media app where users air out their moods</h3>
                        <h3><Link to='/posts'>Posts</Link></h3>  
                        <h3><Link to="/post/create">Post a Message</Link></h3>
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                  :
                    <nav>
                        <AiOutlineMenu className='header-menu' />
                        <h3>Welcome { user}</h3>
                        <h3>This is a social media app where users air out their moods</h3>
                        <h3><Link to='/posts'>Posts</Link></h3>  
                        <h3><Link to="/post/create">Post a Message</Link></h3>
                        <button>Login</button>
                    </nav>
        }
    </div>
  )
}

export default Header