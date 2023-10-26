import React from 'react'
import '../pages/Posts.css'
import {BiMessageRoundedDots} from 'react-icons/bi'

const Comments = () => {
  return (
      <div className='comments'>
          <div className='comment-div'>
            <BiMessageRoundedDots className='msg-img' />
            <h5>0</h5>
          </div>
    </div>
  )
}

export default Comments