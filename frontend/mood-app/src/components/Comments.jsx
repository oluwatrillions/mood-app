import React from 'react'
import '../pages/Posts.css'
import {BiMessageRoundedDots} from 'react-icons/bi'

const Comments = ({ replyRef, postAuthor, postReplies, count }) => {

  return (
      <div className='comments'>
          <div className='comment-div' onClick={replyRef} >
                <BiMessageRoundedDots className='msg-img' />
              <h5>{count}</h5>
              <div className="comment-section">
                <h5>{postAuthor}</h5>
                <h5>{postReplies}</h5>
              </div>
          </div>
    </div>
  )
}

export default Comments