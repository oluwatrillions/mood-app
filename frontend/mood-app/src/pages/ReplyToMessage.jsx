import React, { useEffect, useState } from 'react'
import './Posts.css'
import { useNavigate } from 'react-router-dom'

const ReplyToMessage = ({ post, replyAt, replyTo, onReply, userComment, setUserComment, replyRef}) => {

  // const back = ()=> {
  //   navigate('/posts')
  // }

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
              <button>{ userComment.length > 0 ? <h3>Submit Comment</h3> : <h3>Back</h3>}</button>
          </form>
    </div>
  )
}

export default ReplyToMessage