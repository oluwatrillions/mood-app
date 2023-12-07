import React, { useContext, useEffect, useState, useRef } from 'react'
import './Posts.css'
import { Link } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import UserImage from '../components/UserImage'
import Likes from '../components/Likes'
import Comments from '../components/Comments'
import ReplyToMessage from './ReplyToMessage'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

const Posts = () => {

    const { user, allUsers, posts, setPosts, AllPosts, commentOnMessage, userComment, setUserComment } = useContext(AuthContext)
    
    // Function that is called a user likes a post. It saves the user's username and the post_id of the post
    useEffect(() => {
        AllPosts();
    }, [])

    dayjs.extend(relativeTime);
    
    const formattedDate = dayjs(posts.map(post=> post.postedAt)).fromNow();

    // creating a ref to display the message being commented on 
    const commmentRef = useRef({})

    const replyRef = (id) => {
        commmentRef.current[id].classList.add('show-cmt') 
        console.log(id);
    }

    // Update the posts state with the new like count for the specific post

    const handleLikeUpdate = (postId, newLikeCount) => {
        setPosts((posts) =>
            posts.map((post) =>
            post._id === postId ? { ...post, likeCount: newLikeCount } : post
            )
        );
    };


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
                                        <h6>{ formattedDate}</h6>
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
                                                    postId={post._id}
                                                    onLike={(newLikeCount)=> handleLikeUpdate(post._id, newLikeCount)}
                                                    likeCount={post.likeCount.length}
                                                    username={post.username}
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