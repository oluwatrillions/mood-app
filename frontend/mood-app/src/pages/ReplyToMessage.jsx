import React, { useState } from 'react'
import './Posts.css'

const ReplyToMessage = ({replyAt, replyTo, onReply}) => {
  return (
      <div className='reply-div'>
          <form onSubmit={onReply}>
            <h5>{replyTo }</h5>
            <h5>Replying to @{replyAt}</h5>
            <input type="text" name='comment' />
            <button>Submit Comment</button>
          </form>
    </div>
  )
}

export default ReplyToMessage