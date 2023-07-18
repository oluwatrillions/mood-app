import React, { useState, useContext } from 'react'
import './Header.css'
import { AiOutlineMenu } from 'react-icons/ai'

const Header = () => {

    const [isSignedIn, setIsSignedIn] = useState(false)

  return (
      <div className='header'>
        <nav>
            <AiOutlineMenu className='header-menu'/>
            <h3>This is a social media app where users air out their moods</h3>
            <button>{ isSignedIn ? 'Logout' : 'Login'}</button>
        </nav>
    </div>
  )
}

export default Header