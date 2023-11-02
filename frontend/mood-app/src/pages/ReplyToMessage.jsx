import React, {useState} from 'react'

const ReplyToMessage = ({replyAt, replyTo}) => {
  return (
    <div>
        <h5>{replyTo }</h5>
        <h5>{replyAt }</h5>
        <button>Submit Comment</button>
    </div>
  )
}

export default ReplyToMessage