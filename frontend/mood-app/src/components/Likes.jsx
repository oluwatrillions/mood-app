import React, { useContext, useState } from 'react'
import '../pages//Posts.css'
import {FcLike} from 'react-icons/fc'
import AuthContext from '../Contexts/AuthContext'

const Likes = () => {

    const { posts, allUsers } = useContext(AuthContext)
    
    const [likes, setLikes] = useState(0)
    const [liked, setLiked] = useState([])
    const [likedBy, setLikedBy] = useState([])

    const handleLike = (id) => {
        const likedPost = posts.filter((post) => post._id !== id)
        if (likedPost) {
            setLikes((prevState) => ({
            ...prevState,
            [id]: (prevState[id] || 0) + 1
        }))
        }
    }    
  return (
      <div className='likes-div'>
          <div className="like-count">
              <FcLike onClick={()=> handleLike(id)} />
              <h5>{likes}</h5>
          </div>
    </div>
  )
}

export default Likes