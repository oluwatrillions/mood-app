import React, { useContext, useEffect, useState, useRef } from 'react'
import './Posts.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'
import UserImage from '../components/UserImage'
import Likes from '../components/Likes'
import Comments from '../components/Comments'
import ReplyToMessage from './ReplyToMessage'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import Loading from '../components/Loading'
import useAxios from '../utils/useAxios'

const Posts = () => {

    const { user, allUsers, userComment, setUserComment, commmentRef, replyRef, setUserToken, handleLogout} = useContext(AuthContext)
    
   const [isLoading, setIsLoading] = useState(true)
   const [posts, setPosts] = useState([])
   
   
   let api = useAxios()   

   const navigate = useNavigate()   
   
   useEffect(()=>{
       setIsLoading(true)
       const fetchPosts = async ()=> {
           try {
            const post = await api.get('/posts')
            
                const data = post.data
                
                if(post.status === 200){
                    setPosts(data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error.message);
                if(error.message === 'access expired'){
                    handleLogout();
                }
            }
        }
        
        fetchPosts()
        
        const interval = setInterval(()=>{
            fetchPosts();
        }, 10000)
        
        return ()=> clearInterval(interval)
    }, [])
    
    if(isLoading){
 
     return <Loading/>
 
    } 

    const deletePost = async (id) => {
        try {
            setIsLoading(true)
            
            setTimeout(async ()=> {
                const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/posts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                    const data = await response.json()
                    console.log(data.message);
                    
                    setIsLoading(false)
                }, 1000)
                navigate('/users')
            } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }
   
    
    dayjs.extend(relativeTime);
    // const formattedDate = dayjs(posts.map(post=> post.postedAt)).fromNow(); 

    // const refresh = async ()=> {
    //     const resp = await fetch('http://localhost:4000/refreshtoken', {
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     const data = await resp.json()
    //     setUserToken(data)
    //    }

       const commentOnMessage = async (postId, username, comment) => { 
               
        try {
            const response = await api.post(`/posts/comment/${postId}`, {
                 postId, 
                 username, 
                 comment 
            })
            
            const data = response.data
            
                const updatedPosts = posts.map((post) => {
                    if (post._id === data.postId) {

                    return { ...post, commentCount: data.commentCount };
                }
                return post;
            });
            
            setPosts(updatedPosts);
            setUserComment('');
        } catch (error) {
            console.log(error);
        }
    }    

    return (
        <div className='posts-div'>
            <div className='all-posts'>
                {user &&
                    posts.map((post) => {
                        return <div key={post._id} className='posts'>
                            <Link to={`/posts/${post._id}`}>
                                <div className='split'>
                                    <div className='image-div'>
                                        <img src={`${import.meta.env.VITE_APP_BACKEND_URL}/public/images/` + post.image} alt='images'  />
                                    </div>
                                    <div className="post-text">
                                        <h3 className="title">{post.title}</h3>
                                        <h4 className="text-field">
                                            {post.text.length > 90 ? 
                                                <>
                                                    {post.text.slice(0, 90) + "..."}
                                                    <span className='text-span'>read more</span>
                                                </>
                                             : 
                                                post.text
                                            }
                                        </h4>
                                        <h6>{ dayjs(post.postedAt).fromNow()}</h6>
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
                                                            profileImage={userImg.scope === 'local' ? `${import.meta.env.VITE_APP_BACKEND_URL}/public/avatar/` + profileImage : profileImage}
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
                                                    likeCount={post.count}
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
                                                            profileImage={post.comments.profileImage}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            user.roles === 'admin' && 
                                            <button type="button" onClick={()=> deletePost(post._id)}>delete</button>
                                        }
                                </div>
                            </div>
                    }).reverse()
                }
            </div>
        </div>
    )
}

export default Posts