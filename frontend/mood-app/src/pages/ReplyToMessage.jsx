import React, { useEffect, useState } from 'react'
import './Posts.css'

const ReplyToMessage = ({ replyAt, replyTo, onReply, userComment, setUserComment}) => {

  return (
      <div className='reply-div'>
          <form onSubmit={onReply} >
            <h5>{replyTo }</h5>
            <h5>Replying to @{replyAt}</h5>
            <input type="text" name='comment' value={userComment} onChange={(e)=> setUserComment(e.target.value)}/>
            <button>Submit Comment</button>
          </form>
    </div>
  )
}

export default ReplyToMessage