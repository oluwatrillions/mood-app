import React, { useRef } from 'react'
import '../pages/Posts.css'
import {BiMessageRoundedDots} from 'react-icons/bi'

const Comments = ({replyRef, replyTo, replyAt}) => {

  return (
      <div className='comments'>
          <div className='comment-div'>
              <BiMessageRoundedDots className='msg-img' onClick={replyRef} />
              <h4>{replyTo}</h4>
              <h6>{ replyAt}</h6>
            <h5>0</h5>
          </div>
    </div>
  )
}

export default Comments