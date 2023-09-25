import React, { useContext, useState } from 'react'
import '../pages//Posts.css'
import {FcLike} from 'react-icons/fc'
import AuthContext from '../Contexts/AuthContext'

const Likes = ({likes, liked, likeCount}) => {

    const {posts} = useContext(AuthContext)
    
  return (
      <div className='likes-div'>
          <div className="like-count">
              <FcLike onClick={likeCount} liked={ liked} />
              <h5>{likes}</h5>
          </div>
    </div>
  )
}

export default Likes