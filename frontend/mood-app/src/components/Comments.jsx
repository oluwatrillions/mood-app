import React, { useContext } from 'react'
import '../pages/Posts.css'
import {BiMessageRoundedDots} from 'react-icons/bi'

const Comments = ({ replyRef, author, comment, count, postId }) => {

  return (
      <div className='comments'>
          <div className='comment-div' onClick={replyRef} >
                <BiMessageRoundedDots className='msg-img' />
              <h5>{count}</h5>
              <div className="comment-section">
                <h4>{author}</h4>
                <h5>{comment}</h5>
              </div>
          </div>
    </div>
  )
}

export default Comments