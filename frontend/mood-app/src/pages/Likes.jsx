import React, { useContext, useEffect, useState } from 'react'
import "./Likes.css"
import {FcLike} from 'react-icons/fc'
import {BiMessageRoundedDots} from 'react-icons/bi'
import AuthContext from '../Contexts/AuthContext'
import useAxios from '../utils/useAxios'

const Likes = () => {

  const {user} = useContext(AuthContext)

  let api = useAxios()

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        api.get("/posts")
        .then((res)=> setPosts(res.data)
        )
    }, [])
    
  return (
    <div className='liked-posts'>
        <h2 className='likes-title'>Liked Posts</h2>
      <div className="liked-post">
        {posts.some(post => post.likeCount.some(likes => likes.username === user.username)) ? (
          posts.map((post) => {
            const userLikes = post.likeCount.filter(likes => likes.username === user.username);
            if (userLikes.length > 0) {
              return userLikes.map((userLikedPost) => (
                <div className="all-liked-post" key={post._id}>
                  <h3>Post by <span>{post.username}</span></h3>
                  <img src={`${import.meta.env.VITE_APP_BACKEND_URL}public/images/` + post.image} alt='images' />
                  <div className="liked-post-details">
                    <h2>{post.title}</h2>
                    <h4>{post.text}</h4>
                    <h3><FcLike className='likes-img'/> <span>{post.likeCount.length}</span></h3>
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
          <h2 className='comment-title'>Comments</h2>
        <div className="liked-post">
          {posts.some(post => post.comments.some(likes => likes.username === user.username)) ? (
            posts.map((post) => {
              const userLikes = post.comments.filter(likes => likes.username === user.username);
              if (userLikes.length > 0) {
                return userLikes.map((userLikedPost) => (
                  <div className="all-liked-post" key={post._id}>
                    <h3>Post by <span>{post.username}</span></h3>
                    <img src={`${import.meta.env.VITE_APP_BACKEND_URL}public/images/` + post.image} alt='images' />
                    <div className="liked-post-details">
                      <h2>{post.title}</h2>
                      <h4>{post.text}</h4>
                      <h3><BiMessageRoundedDots className='cmt-img'/> <span>{userLikedPost.comment}</span></h3>
                    </div>
                  </div>
                ));
              } else {
                return null; 
              }
            })
          ) : (
            <h3>You have <span>0</span> comments on posts</h3>
          )}
      </div>
      </div>
    </div>
  )
}

export default Likes