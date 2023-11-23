import React, { useContext } from 'react'
import '../pages/Posts.css'
import {BiMessageRoundedDots} from 'react-icons/bi'
import AuthContext from '../Contexts/AuthContext'

const Comments = ({ replyRef, author, comment, count, postId }) => {

    const { userComment } = useContext(AuthContext)

  return (
      <div className='comments'>
          <div className='comment-div' onClick={replyRef} key={postId}>
                <BiMessageRoundedDots className='msg-img' />
              <h5>{count}</h5>
              <div className="comment-section">
                <h5>{author}</h5>
                <h5>{comment}</h5>
              </div>
          </div>
    </div>
  )
}

export default Comments