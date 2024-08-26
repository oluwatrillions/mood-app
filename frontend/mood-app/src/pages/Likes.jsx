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
      <div className="liked-post">
        <h2>Liked Posts</h2>
        {posts.some(post => post.likeCount.some(likes => likes.username === user.username)) ? (
          posts.map((post) => {
            const userLikes = post.likeCount.filter(likes => likes.username === user.username);
            if (userLikes.length > 0) {
              return userLikes.map((userLikedPost) => (
                <div className="all-liked-post" key={post._id}>
                  <h3>Post by <span>{post.username}</span></h3>
                  <img src={`http://localhost:4000/public/images/` + post.image} alt='images' />
                  <div className="liked-post-details">
                    <h2>{post.title}</h2>
                    <h4>{post.text}</h4>
                    <h3>Likes: <span>{post.likeCount.length}</span></h3>
                  </div>
                </div>
              ));
            } else {
              return null; 
            }
          })
        ) : (
          <h3>You have <span>0</span> liked posts</h3>
        )}
      </div>
      <div className="comments">
        <div className="liked-post">
          <h2>Comments</h2>
          {posts.some(post => post.comments.some(likes => likes.username === user.username)) ? (
            posts.map((post) => {
              const userLikes = post.comments.filter(likes => likes.username === user.username);
              if (userLikes.length > 0) {
                return userLikes.map((userLikedPost) => (
                  <div className="all-liked-post" key={post._id}>
                    <h3>Post by <span>{post.username}</span></h3>
                    <img src={`http://localhost:4000/public/images/` + post.image} alt='images' />
                    <div className="liked-post-details">
                      <h2>{post.title}</h2>
                      <h4>{post.text}</h4>
                      <h3>comments: <span>{post.comments.length}</span></h3>
                    </div>
                  </div>
                ));
              } else {
                return null; 
              }
            })
          ) : (
            <h3>You have <span>0</span> liked posts</h3>
          )}
      </div>
      </div>
    </div>
  )
}

export default Likes