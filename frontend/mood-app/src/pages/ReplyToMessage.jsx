import React, { useState } from 'react'
import './Posts.css'

const ReplyToMessage = ({ replyAt, replyTo, onReply }) => {
    
    const [userComment, setUserComment] = useState()

    const comment = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/posts/comment/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userComment)
            })
            const data = await response.json()
            console.log(data);
            setUserComment(data)
        } catch (error) {
            console.log(error);
        }
    }
    comment()
  return (
      <div className='reply-div'>
          <form onSubmit={comment}>
            <h5>{replyTo }</h5>
            <h5>Replying to @{replyAt}</h5>
            <input type="text" name='comment' value={userComment} onChange={(e)=> setUserComment(e.target.value)}/>
            <button>Submit Comment</button>
          </form>
    </div>
  )
}

export default ReplyToMessage