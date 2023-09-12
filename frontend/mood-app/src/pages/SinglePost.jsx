import React, {useContext, useEffect, useRef, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './SinglePost.css'
import { HiDotsHorizontal } from "react-icons/hi"
import UserImage from '../components/UserImage'
import AuthContext from '../Contexts/AuthContext'


const SinglePost = () => {

    const [editedPost, setEditedPost] = useState()
    const [singlePost, setSinglePost] = useState({}) 
    const [isEdit, setIsEdit] = useState(false)
    const [notif, setNotif] = useState(null)
    const btnRef = useRef(null)
    const deleteRef = useRef(null)
    const editRef = useRef(null)
    const { _id } = useParams()
    const navigate = useNavigate()

    const imageRef = useRef()

    const {user, allUsers, deleteSuccess} = useContext(AuthContext)

    const Back = () => {
        navigate(-1)
    }

    const deletePost = async () => {
        try {
            const response = await fetch(`http://localhost:4000/posts/${_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json()
                    .then((data) => console.log(data.message))
            )
            deleteSuccess()
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async () => {
        setIsEdit(true);
        try {
            const updatePost = await fetch(`http://localhost:4000/posts/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedPost)
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setSinglePost(data)
                })
            console.log('i am running');
        } catch (error) {
            console.log(error);
        }
    }

    const isEditPost = async () => {
        setIsEdit(true)
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

    useEffect(() => {
        fetch(`http://localhost:4000/posts/${_id}`)
            .then((response) => response.json())
            .then((data) => {
                setSinglePost(data)
                setEditedPost(data)
        })
    }, [])

  return (
      <div className='single-post'>
        <div className="featured-post">
        <div className="featured-img">
            <img src={`http://localhost:4000/public/images/${singlePost.image}`} alt="" />
        </div>
        <div className="text-detail">
            <h3 className="titled">{singlePost.title}</h3>
            <h4 className="text">{singlePost.text}</h4>
            <div className="poster-detail">
                <div className="post-action">
                    <div>
                        {
                            allUsers.map((users) => {
                                if (users.username === singlePost.username) {
                                    return <div key={users._id} className='poster-image'>
                                                <UserImage
                                                    username = {users.username}
                                                    profileImage={`http://localhost:4000/public/avatar/` + users.profileImage} />
                                            </div> 
                                }
                            })
                        }
                    </div>
                    <div className="poster-name">
                        <h2 className="name">{singlePost.name}</h2>
                        <h5 className="postime">{ singlePost.postedAt}</h5>
                    </div>
                </div>
                {
                    user.username === singlePost.username ? 
                        <div className="action">
                            <HiDotsHorizontal className='edit-icon' onClick={actionRef}/>  
                            <div className="action-btn" ref={btnRef}>
                                <h3 onClick={editBtn}>Edit</h3>                          
                                <h3 onClick={deleteBtn}>Delete</h3>   
                                </div>
                             <div className='editing-post' ref={editRef}>
                                <div className='signup'>
                                    <h3 className='notif'>{ notif }</h3>
                                    <form encType='multipart/form-data' > 
                                        <div className='edit-inputs'>
                                            <label htmlFor="title" id='title'>Title:</label>
                                                  <input type="text"
                                                        name='title'
                                                        value={editedPost.title}
                                                        onChange={(e) => setEditedPost({
                                                            ...editedPost, 
                                                            title: e.target.value
                                                        })}
                                                    />
                                        </div>
                                        <div className='edit-inputs'>
                                            <label htmlFor="text" id='text'>Text:</label>
                                                  <input type="text"
                                                        name='text'
                                                        value={editedPost.text}
                                                        onChange={(e) => setEditedPost({
                                                            ...editedPost, 
                                                            text: e.target.value
                                                        })}
                                                    />
                                        </div>
                                        <div className='edit-inputs'>
                                            <label htmlFor="image" id='image'>Image:</label>
                                            <input
                                                type="file"
                                                name='image'
                                                accept='image/jpg, image/jpeg, image/png, image/gif'
                                                filename='images'
                                                ref={imageRef}
                                                    onChange={(e) => setEditedPost({
                                                        ...editedPost,
                                                        image: e.target.files[0]
                                                    })}
                                                />
                                        </div>
                                              <button className='signIn-btn' type='submit'>{ isEdit ? <span onClick={handleEdit}>Save Edit</span> : <span onClick={Back}>Cancel</span>}</button>
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
        </div>
        </div>    
      </div>
  )
}

export default SinglePost