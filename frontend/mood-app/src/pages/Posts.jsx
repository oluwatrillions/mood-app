import React, { useContext, useEffect, useState, useRef } from 'react'
import './Posts.css'
import { Link } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import UserImage from '../components/UserImage'
import Likes from '../components/Likes'
import Comments from '../components/Comments'
import ReplyToMessage from './ReplyToMessage'

const Posts = () => {

    const { user, allUsers, posts, AllPosts, commentOnMessage, userComment, setUserComment } = useContext(AuthContext)
    
    const likePost = async (postId, username) => {
        try {
            const response = await fetch(`http://localhost:4000/posts/like/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({postId, username})
            })
            const data = await response.json()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        AllPosts();
    }, [])

    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    // creating a ref to display the message being commented on 
    const commmentRef = useRef({})

    const replyRef = (id) => {
        commmentRef.current[id].classList.add('show-cmt') 
        console.log(id);
    }


    return (
        <div className='posts-div'>
            <div className='all-posts'>
                {user &&
                    posts.map((post, index) => {
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
                                            <h5 className='post-time'>@{post.username}</h5>
                                        </div>
                                        <div className='reactions'>
                                            <div className="like-count">
                                                <Likes
                                                    key={post._id}
                                                    onLike={user.username !== post.username ? ()=> likePost(post._id, user.username) : null}
                                                    likeCount={post.count}
                                                />
                                            </div>
                                            <div className='replies'>
                                                <div className="user-cmt" ref={(el) => (commmentRef.current[post._id] = el)}>
                                                    <ReplyToMessage
                                                        post={post._id}
                                                        replyTo={post.text}
                                                        replyAt={post.username}
                                                        userComment={userComment}
                                                        setUserComment={setUserComment}
                                                        onReply={() => commentOnMessage(post._id, user.username, userComment)}
                                                    />
                                                </div>
                                                <div className="users-comments">
                                                    <div className="single-comments">
                                                        <Comments
                                                            postId={post._id}
                                                            replyRef={()=> replyRef(post._id)}
                                                            count={post.commentCount}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
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