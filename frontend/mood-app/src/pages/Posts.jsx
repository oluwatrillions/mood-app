import React, { useContext, useEffect, useState } from 'react'
import './Posts.css'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import UserImage from '../components/UserImage'
import Likes from '../components/Likes'

const Posts = () => {

    const { user, allUsers, posts, AllPosts } = useContext(AuthContext)

    const [count, setCount] = useState(0)
    const [liked, setLiked] = useState(null)
    const [likes, setLikes] = useState(0)

    const handleLike = (id) => {
        setLikes((prevState) => ({
            ...prevState,
            [id]: (prevState[id] || 0) + 1
        }))     
    }  

     const likedPost = async () => {
        try {
            const allLikes = await fetch('http://localhost:4000/posts/likes')
            const data = allLikes.json()
            setLikes(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    // <div className="like-count">
    //           <FcLike onClick={onLike} />
    //           <h5>{likes}</h5>
    //       </div>

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
                        return <div key={post._id} className='posts'>
                            <Link to={`/posts/${post._id}`}>
                                <div className='split'>
                                    <div className='image-div'>
                                        <img src={`http://localhost:4000/public/images/` + post.image} alt='images' />
                                    </div>
                                    <div className="post-text">
                                        <h3 className="title">{post.title}</h3>
                                        <h4 className="text-field">{post.text}</h4>
                                    </div>
                                </div>
                            </Link>
                                    <div className='post-detail'>
                                        {
                                            allUsers.map((userImg) => {  
                                                if (userImg.username === post.username) {
                                                    const {username, _id, profileImage} = userImg
                                                    return <div key={_id} className='poster-image'>
                                                    <Link to={`/users/${_id}`}>
                                                        <UserImage
                                                            username = {username}
                                                            profileImage={`http://localhost:4000/public/avatar/` + profileImage}
                                                        />
                                                    </Link>
                                                </div>
                                                     
                                                }
                                            })
                                }
                                
                                        <div className="time">
                                            <h4 className="poster">{post.name}</h4>
                                            <h5 className='post-time'>{post.postedAt}</h5>
                                        </div>
                                    <div className="like-count">
                                        <Likes
                                        key={post._id}
                                        onLike={() => handleLike(post._id)}
                                        likes={ post.likeCount}
                                        />
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