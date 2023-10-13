import React, { useContext, useEffect, useState } from 'react'
import './Posts.css'
import { Link } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import UserImage from '../components/UserImage'
import Likes from '../components/Likes'

const Posts = () => {

    const { user, allUsers, posts, AllPosts } = useContext(AuthContext)

    const [postLike, setPostLike] = useState([])
    const [likedBy, setLikedBy] = useState([])
    const [likes, setLikes] = useState([])
    const [numberOfLikes, setNumberOfLikes] = useState(0)

    const handleLike = (id) => {
        setLikes((prevState) => ({
            ...prevState,
            [id]: (prevState[id] || 0) + 1
        }))     
    }  

    const allLikes = async () => {
        try {
            const allTheLikes = await fetch('http://localhost:4000/posts/likes')
              .then((response) => response.json())
                .then((data) => setLikes(data))
            console.log(data);  
            console.log('yo');  
        } catch (error) {
            console.log(error);
        }
        allTheLikes()
    }

//     useEffect(() => {
//     allLikes()
// }, [])

    const addLike = async (postId, username) => {
        try {
            const response = await fetch('http://localhost:4000/posts/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({postId, username})
            })
            const data = await response.json()
            console.log(data)
            setPostLike(data)
        } catch (error) {
            console.log(error);
        }
    }

    const likePost = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/posts/like/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
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
                                            onLike={() => addLike(post._id, post.username)}
                        
                                    />
                                    <h3 onClick={()=> likePost(post._id)}>{ post.likeCount}</h3>
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