import React, { useContext, useEffect, useState } from 'react'
import './UserPosts.css'
import { useParams } from 'react-router-dom'
import UserImage from '../components/UserImage'
import AuthContext from '../Contexts/AuthContext'

const UserPosts = () => {

    const { posts } = useContext(AuthContext)
    console.log(posts);
    const { _id } = useParams()
    const [clickedUser, setClickedUser] = useState([])

    useEffect(() => {
            fetch(`http://localhost:4000/users/${_id}`)
            .then((response) => response.json())
            .then((data) => {
                setClickedUser(data)
                console.log(data)
        })
    }, [])

  return (
      <div className='users-post'>
          <div className='users-dashboard'>
              <UserImage
                  profileImage={`http://localhost:4000/public/avatar/` + clickedUser.profileImage}
              />
              <div className='users-details'>
                  <h2>{ clickedUser.name}</h2>
                  <h3>@{ clickedUser.username}</h3>
              </div>
          </div>
          <div className='user-posts'>
              {
                  posts.map((post) => {
                      if (post.username === clickedUser.username) {
                          return <div key={post._id} className='posters-div'>
                              <div className='posts-divide'>
                                  <img src={`http://localhost:4000/public/images/${post.image}`} alt={post.title} />
                                  <div className='posters-detail'>
                                      <h3>{post.title}</h3>
                                      <h4>{post.text}</h4>
                                      <h5>{ post.postedAt}</h5>
                                  </div>
                              </div>
                          </div>
                      }
                  }).reverse()
              }
          </div>
      </div>
  )
}

export default UserPosts