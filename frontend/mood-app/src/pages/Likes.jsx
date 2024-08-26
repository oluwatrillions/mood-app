import React, { useContext, useEffect, useState } from 'react'
import "./Likes.css"
import AuthContext from '../Contexts/AuthContext'

const Likes = () => {

  const {user} = useContext(AuthContext)

    const [likes, setLikes] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        fetch("http://localhost:4000/posts")
        .then((res)=> res.json())
        .then((data)=> setPosts(data)
        )
    })

    console.log();
    
  return (
    <div className='liked-posts'>
      <div className="liked-post">{posts.map((post)=>{
        const userLikes = post.likeCount.filter(likes=> likes.username === user.username)
        if(userLikes.length > 0){
          return userLikes.map((userLikedPost)=> (            
            <div className="all-liked-post" key={post._id}>
              <h3>Post by <span>{post.username}</span></h3>
              <img src={`http://localhost:4000/public/images/` + post.image} alt='images' />
              <div className="liked-post-details">
                <h2>{post.title}</h2>
                <h4>{post.text}</h4>
                <h3>Likes: <span>{userLikes.length}</span></h3>
              </div>
            </div>
          ))
        }
        
      })}</div>
      <div className="comments">

      </div>
    </div>
  )
}

export default Likes