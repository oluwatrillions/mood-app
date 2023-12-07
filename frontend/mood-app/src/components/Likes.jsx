import React, { useContext } from 'react'
import '../pages//Posts.css'
import {FcLike} from 'react-icons/fc'
import AuthContext from '../Contexts/AuthContext'

const Likes = ({ postId, onLike, likeCount, username }) => {

    const { user, posts } = useContext(AuthContext)

     const likePost = async (username) => {
        try {
            const response = await fetch(`http://localhost:4000/posts/like/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({postId, username: user.username})
            })
            const data = await response.json()
            console.log(data);
            if (onLike) {
                onLike(data.likeCount);
            }
        } catch (error) {
            console.log(error);
        }
    }
     
  return (
      <div className='likes-div'>
          <div className="like-count">
              <FcLike onClick={user.username !== username ? likePost : null} />
              <h5>{likeCount}</h5>
          </div>
    </div>
  )
}

export default Likes