import React from 'react'
import '../pages/Posts.css'
import {BiMessageRoundedDots} from 'react-icons/bi'

const Comments = ({ replyRef, postReplies, count }) => {

    console.log(postReplies);

  return (
      <div className='comments'>
          <div className='comment-div' onClick={replyRef}>
                <BiMessageRoundedDots className='msg-img' />
              <h5>{count}</h5>
              <h5>{ postReplies}</h5>
          </div>
    </div>
  )
}

export default Comments