import React from 'react'
import { AiOutlineCopyright } from 'react-icons/ai'
import './Footer.css'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear()

  return (
      <div className='footer'>
          <h5> Copyright <AiOutlineCopyright className='copyrights'/> {year} @oluwatrillions </h5>
          <h6 className='rights'>All rights reserved</h6>
    </div>
  )
}

export default Footer