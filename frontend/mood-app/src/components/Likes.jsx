import React, { useContext, useEffect } from 'react'
import '../pages//Posts.css'
import {FcLike} from 'react-icons/fc'
import AuthContext from '../Contexts/AuthContext'

const Likes = ({ postId, likeCount, username }) => {

    useEffect(() => {
        AllPosts()
    })

    const { user, posts, setPosts, AllPosts } = useContext(AuthContext)

     const likePost = async () => {
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
            setPosts(data.postToLike)
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