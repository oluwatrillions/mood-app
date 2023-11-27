import React, { useEffect, useState } from 'react'
import './Posts.css'

const ReplyToMessage = ({ post, replyAt, replyTo, onReply, userComment, setUserComment, replyRef}) => {

  return (
      <div className='reply-div'>
          <form onSubmit={onReply} >
            <h5>{replyTo }</h5>
            <h5>Replying to @{replyAt}</h5>
              <input type="text"
                  maxLength="100"
                  name='comment'
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)} 
                  />
            <button>Submit Comment</button>
          </form>
    </div>
  )
}

export default ReplyToMessage