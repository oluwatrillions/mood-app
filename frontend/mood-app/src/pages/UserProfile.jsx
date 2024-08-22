import React, {useContext, useEffect, useState} from 'react'
import './UserProfile.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import AuthContext from '../Contexts/AuthContext'
import UserImage from '../components/UserImage'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';


const UserProfile = () => {

    const { user } = useContext(AuthContext)  
    const [posts, setPosts] = useState([])
    
    useEffect(()=>{
      try {
        fetch('http://localhost:4000/posts')
        .then((res)=> res.json())
        .then(response=> setPosts(response))
    } catch (error) {
        console.log(error);
    }
    })
  
    dayjs.extend(relativeTime);

  return (
      <div className='profile'>
          <div className="dashboard">
              <img src={`http://localhost:4000/public/avatar/${user.avatar}`} alt="" />
              <h2>{user.name}</h2>
              <h4> @{ user.username}</h4>
          </div>
          <div className="other-activities">
            <div className="liked-posts">
                <h1>Liked Posts</h1>
                <div className="liked-items">
                {posts.map((post)=> post.likeCount.filter(likes=> likes.username === user.username).map((allLikes)=> {
                  return <div key={post._id} className='liked-post'>
                  <Link to={`/posts/${post._id}`}>
                  <div className='post-section'>
                      <img src={`http://localhost:4000/public/images/${post.image}`} alt={post.title} />
                      <div className='liked-detail'>
                          <h3>{post.title}</h3>
                          <h4>{post.text.length > 50 ? 
                                                <>
                                                    {post.text.slice(0, 50) + "..."}
                                                    <span className='text-span'>read more</span>
                                                </>
                                             : 
                                                post.text
                                            }</h4>
                          <h5>{dayjs(post.postedAt).fromNow()}</h5>
                      </div>
                      </div>
                    </Link>
              </div>
                }))}
                </div>
            </div>
            <div className="comments">
                <h1>Their comments</h1>

            </div>
          </div>
    </div>
  )
}

export default UserProfile