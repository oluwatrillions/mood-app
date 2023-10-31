import React, { useRef } from 'react'
import '../pages/Posts.css'
import {BiMessageRoundedDots} from 'react-icons/bi'

const Comments = () => {

    const commmentRef = useRef()

    const replyRef = () => {
        
    }
  return (
      <div className='comments'>
          <div className="comment-form" ref={commmentRef}>
              <form>
                  <input type="text" name='comment' />
                  <button>Submit Comment</button>
              </form>
          </div>
          <div className='comment-div'>
            <BiMessageRoundedDots className='msg-img' />
            <h5>0</h5>
          </div>
    </div>
  )
}

export default Comments