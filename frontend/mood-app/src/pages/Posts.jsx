import React, { useContext, useEffect, useState } from 'react'
import './Posts.css'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import UserImage from '../components/UserImage'
import {FcLike} from 'react-icons/fc'

const Posts = () => {

    const { user, allUsers, posts, AllPosts } = useContext(AuthContext)
   

    useEffect(() => {
        AllPosts();
    }, [])

    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;


    return (
        <div className='posts-div'>
            <div className='all-posts'>
                {user &&
                    posts.map((post) => {
                        const { title, text, name, image, _id, postedAt, username } = post
                        return <div key={_id} className='posts'>
                            <Link to={`/posts/${_id}`}>
                                <div className='image-div'>
                                    <img src={`http://localhost:4000/public/images/` + image} alt='images' className='img-div' />
                                </div>
                                <div className="post-text">
                                    <h3 className="title">{title}</h3>
                                    <h4 className="text-field">{text}</h4>
                                    <div className='post-detail'>
                                        {
                                            allUsers.map((userImg) => {  
                                                if (userImg.username === username) {
                                                return <div key={userImg._id} className='poster-image'>
                                                    <UserImage
                                                        username = {userImg.username}
                                                        profileImage={`http://localhost:4000/public/avatar/` + userImg.profileImage} />
                                                </div>
                                                }
                                            })
                                        }
                                        <div className="time">
                                            <h4 className="poster">{name}</h4>
                                            <h5 className='post-time'>{postedAt}</h5>
                                        </div>
                                        <FcLike/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    }).reverse()
                }
            </div>
        </div>
    )
}

export default Posts