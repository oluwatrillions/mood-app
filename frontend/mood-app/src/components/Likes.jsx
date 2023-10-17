import React from 'react'
import '../pages//Posts.css'
import {FcLike} from 'react-icons/fc'

const Likes = ({onLike, likeCount}) => {
     
  return (
      <div className='likes-div'>
          <div className="like-count">
              <FcLike onClick={onLike} />
              <h5>{likeCount}</h5>
          </div>
    </div>
  )
}

export default Likes