import React, {useContext, useEffect, useRef, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import './SinglePost.css'
import { HiDotsHorizontal } from "react-icons/hi"
import UserImage from '../components/UserImage'
import AuthContext from '../Contexts/AuthContext'
import {FcLike} from 'react-icons/fc'
import Likes from '../components/Likes'
import Comments from '../components/Comments'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import Loading from "../components/Loading"
import useAxios from '../utils/useAxios'



const SinglePost = ({likes, count}) => {

    const { user, allUsers, deleteSuccess } = useContext(AuthContext)
    const { _id } = useParams()
    // const filteredPost = posts.filter((post) => post._id === _id)

    const [singlePost, setSinglePost] = useState({}) 
    const [isEdit, setIsEdit] = useState(false)
    const [notif, setNotif] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const btnRef = useRef(null)
    const deleteRef = useRef(null)
    const editRef = useRef(null)
    const navigate = useNavigate()
    
    const imageRef = useRef()        
    
    dayjs.extend(relativeTime);
    
    const formattedDate = dayjs(singlePost.postedAt).fromNow();

    let api = useAxios()

    const Back = () => {
        navigate(-1)
    }

    useEffect(() => {
        setTimeout(() => {
           const post = api.get(`/posts/${_id}`)
            .then((response) => {
                setSinglePost(response.data)
                setIsLoading(false)
            })
            clearTimeout(post)
        }, 1000)
    }, [])

    if (isLoading){
        return <Loading/>
    }

    const handleEdit = async () => {

        const formEdit = new FormData()
            formEdit.append('_method', 'put')
            formEdit.append('title', singlePost.title)
            formEdit.append('text', singlePost.text)
            formEdit.append('images', singlePost.image)
        
        try {
            const updatePost = await api.put(`/posts/${_id}`, formEdit,{
                'Content-Type': 'multipart/form-data'
            })
            .then((res) =>  {
                console.log(res);
                    setSinglePost(res.data)
                    setNotif(res.data.message)
                })
            } catch (error) {
                console.log(error);
            }
    }

    const deletePost = async () => {
        try {
            const response = await api(`/posts/${_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => setNotif(res.data.message)
            )
            deleteSuccess()
        } catch (error) {
            console.log(error);
        }
    }

    const actionRef = () => {
        btnRef.current.classList.toggle('show-action')
    }
    const deleteBtn = () => {
        deleteRef.current.classList.add('delete')
    }
    const editBtn = () => {
        editRef.current.classList.add('edit-post')
    }

   
    

  return (
      <div className='single-post' key={singlePost._id}>
        <h3 className='notif'>{notif}</h3>
        <div className={singlePost.commentCount > 0 ? 'see-comments' : 'featured-post'}>
        <div className="featured-img">
            <img src={`${import.meta.env.VITE_APP_BACKEND_URL}public/images/${singlePost.image}`} alt="" />
        </div>
        <div className={singlePost.commentCount > 0 ? 'see-all-comments' : 'text-detail'} key={singlePost._id}>
            <h3 className="titled">{singlePost.title}</h3>
            <h4 className="text">{singlePost.text}</h4>
            <div className="poster-detail">
                <div className="post-action">                              
                    <div>
                              {/* Displaying the users image */}
                              
                        {
                            allUsers.map((users) => {
                                if (users.username === singlePost.username) {
                                    return <div key={users._id} className='poster-image'>
                                        <Link to={`/users/${users._id}`}>
                                                <UserImage
                                                    postId={users._id}
                                                    username = {users.username}
                                                    profileImage={users.scope === 'local' ? `${import.meta.env.VITE_APP_BACKEND_URL}public/avatar/` + users.profileImage : users.profileImage}
                                                />
                                        </Link>    
                                    </div> 
                                }
                            })
                        }
                    </div>
                    <div className="poster-name">
                        <h2 className="name">{singlePost.name}</h2>
                        <h5 className="postime">{ formattedDate}</h5>
                          </div>
                    <div className="post-likes">
                              <Likes
                                postId={singlePost._id}
                                likeCount={singlePost.count}
                                username={singlePost.username}    
                              />
                              <Comments
                                postId={singlePost._id}
                                count={singlePost.commentCount}
                              />      
                    </div>
                    
                </div>
                {
                    user.username === singlePost.username ? 
                        <div className="action">
                            <HiDotsHorizontal className='edit-icon' onClick={actionRef}/>  
                            <div className="action-btn" ref={btnRef}>
                                <h3 onClick={editBtn}>Edit</h3>                          
                                <h3 onClick={deleteBtn}>Delete</h3>
                                <h3 onClick={Back}>Back</h3>   
                                </div>
                             <div className='editing-post' ref={editRef}>
                                <div className='signup'>
                                    <form encType='multipart/form-data' > 
                                        <div className='edit-inputs'>
                                            <label htmlFor="title" id='title'>Title:</label>
                                                  <input type="text"
                                                        name='title'
                                                        value={singlePost.title}
                                                        onChange={(e) => setSinglePost({
                                                            ...singlePost,
                                                            title: e.target.value
                                                        })}
                                                    />
                                        </div>
                                        <div className='edit-inputs'>
                                            <label htmlFor="text" id='text'>Text:</label>
                                                  <input type="text"
                                                        name='text'
                                                        value={singlePost.text}
                                                        onChange={(e) => setSinglePost({
                                                            ...singlePost,
                                                            text: e.target.value
                                                        })}
                                                    />
                                        </div>
                                        <div className='edit-inputs'>
                                            <label htmlFor="images" id='images'>Image:</label>
                                                  <input
                                                      type="file"
                                                      name='images'
                                                      accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
                                                      filename='images'
                                                      ref={imageRef}
                                                      onChange={(e)=> setSinglePost({
                                                        ...singlePost,
                                                        image: e.target.files[0]
                                                      })}
                                                />
                                        </div>
                                              <button className='signIn-btn' type='submit' onClick={handleEdit}>Save Edit</button>
                                    </form>
                                </div>
                            </div>          
                            <div className="confirm" ref={deleteRef}>
                                <h2>Are you sure you want to DELETE this post?</h2>
                                <div className="answer">
                                    <h2 onClick={deletePost}>YES</h2>
                                    <h2 onClick={Back}>NO</h2>
                                </div>
                            </div>
                        </div>
                        :
                        <h2 onClick={Back} className='go-back'>Back</h2>
                } 
                  </div>
                  { singlePost.commentCount > 0 && <hr />}
                  {
                      
                      //   This is where the comments are displayed on the singlePost component
                      
                      singlePost.comments && singlePost.comments.map((singlecomment) => (
                          <div className="commenters" key={singlecomment._id}>
                              <Comments
                                  postId={singlecomment._id}
                                  author={singlecomment.username}
                                  comment={singlecomment.comment}
                                  profileImage={singlecomment.profileImage}
                              />
                          </div>
                     )).reverse()
                  }
            </div>
        </div>    
    </div>
  )
}

export default SinglePost