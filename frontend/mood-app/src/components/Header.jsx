import React from 'react'
import './Header.css'
import {AiOutlineMenu} from 'react-icons/ai'

const Header = () => {
  return (
      <div className='header'>
          <nav>
              <AiOutlineMenu className='header-menu'/>
              <h3>This is a social media app where users air out their moods</h3>
          </nav>
    </div>
  )
}

export default Header