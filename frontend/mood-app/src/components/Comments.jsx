import React, { useRef } from 'react'
import '../pages/Posts.css'
import {BiMessageRoundedDots} from 'react-icons/bi'

const Comments = ({ replyRef, postReplies, count }) => {
    console.log(postReplies);

  return (
      <div className='comments'>
          <div className='comment-div'>
                <BiMessageRoundedDots className='msg-img' onClick={replyRef} />
              <h5>{count}</h5>
              <h5>{ postReplies}</h5>
          </div>
    </div>
  )
}

export default Comments