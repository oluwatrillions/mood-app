import React, { useState, useContext } from 'react'
import './Header.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Header = () => {

    const [isSignedIn, setIsSignedIn] = useState(false)
    const [user, setUser] = useState('')

  return (
      <div className='header'>
        <nav>
            <AiOutlineMenu className='header-menu'/>
            <h3>This is a social media app where users air out their moods</h3>
            <h3><Link to="/create/post">Post a Message</Link></h3>
            <button>Logout</button>
        </nav>
    </div>
  )
}

export default Header