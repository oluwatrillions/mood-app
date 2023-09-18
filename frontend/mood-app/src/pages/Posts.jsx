import React, { useContext, useEffect, useState } from 'react'
import './Posts.css'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import UserImage from '../components/UserImage'
import {FcLike} from 'react-icons/fc'

const Posts = () => {

    const { user, allUsers, posts, AllPosts } = useContext(AuthContext)

    const [count, setCount] = useState(0)

    const likeCount = () => {
        setCount(prevState=> prevState + 1)
    }
   

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
                        const { title, text, name, image, _id, postedAt, username, likes } = post
                        return <div key={_id} className='posts'>
                            <Link to={`/posts/${_id}`}>
                                <div className='split'>
                                    <div className='image-div'>
                                        <img src={`http://localhost:4000/public/images/` + image} alt='images' />
                                    </div>
                                    <div className="post-text">
                                        <h3 className="title">{title}</h3>
                                        <h4 className="text-field">{text}</h4>
                                    </div>
                                </div>
                            </Link>
                                    <div className='post-detail'>
                                        {
                                            allUsers.map((userImg) => {  
                                                if (userImg.username === username) {
                                                    const {username, _id, profileImage} = userImg
                                                return <Link to={`/users/${_id}`}><div key={_id} className='poster-image'>
                                                    <UserImage
                                                        username = {username}
                                                        profileImage={`http://localhost:4000/public/avatar/` + profileImage} />
                                                </div>
                                                     </Link>
                                                }
                                            })
                                }
                                
                                        <div className="time">
                                            <h4 className="poster">{name}</h4>
                                            <h5 className='post-time'>{postedAt}</h5>
                                        </div>
                               
                                        <div className='like-count'>
                                            <FcLike onClick={likeCount}/>
                                            <h5>{likes === null ? 0 : count}</h5>
                                        </div>
                                    </div>
                            </div>
                    }).reverse()
                }
            </div>
        </div>
    )
}

export default Posts