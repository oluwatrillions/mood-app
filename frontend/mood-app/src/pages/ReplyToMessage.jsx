import React, { useEffect, useState } from 'react'
import './Posts.css'
import { useNavigate } from 'react-router-dom'

const ReplyToMessage = ({replyAt, replyTo, onReply, userComment, setUserComment, post}) => {      

  const navigate = useNavigate()
  const handleBack = (e)=> {
    e.preventDefault();
    navigate('/posts')
    navigate(0)
  }
  
  const handleSubmit = (e)=> {
    e.preventDefault();
    onReply()
    navigate(`/posts/${post}`)
  }

  return (
      <div className='reply-div'>
          <form onSubmit={handleSubmit} >
            <h5 className='reply-msg'>{replyTo }</h5>
            <h5 className='reply-to'>reply to <span>@{replyAt}</span></h5>
              <input type="text"
                  maxLength="100"
                  name='comment'
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)} 
              />
              {userComment.length > 0 ? (
                  <button type="submit">Submit</button>
                ) 
                : 
                (
                  <button type="button" onClick={handleBack}>Back</button>
                )}
          </form>
    </div>
  )
}

export default ReplyToMessage