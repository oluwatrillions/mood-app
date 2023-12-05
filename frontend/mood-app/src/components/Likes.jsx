import React, { useContext } from 'react'
import '../pages//Posts.css'
import {FcLike} from 'react-icons/fc'
import AuthContext from '../Contexts/AuthContext'

const Likes = ({ onLike, likeCount, likes }) => {

    const {user, posts} = useContext(AuthContext)
    console.log(likes);
     
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