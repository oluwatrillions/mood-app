import React, {useContext, useEffect, useRef, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './SinglePost.css'
import { HiDotsHorizontal } from "react-icons/hi"
import UserImage from '../components/UserImage'
import AuthContext from '../Contexts/AuthContext'


const SinglePost = () => {

    const [filterPost, setFilterPost] = useState()
    const [singlePost, setSinglePost] = useState({}) 
    const [isEdit, setIsEdit] = useState(false)
    const [iseDelete, setIsDelete] = useState(false)
    const btnRef = useRef(null)
    const deleteRef = useRef(null)
    const { _id } = useParams()
    const navigate = useNavigate()

    const {user, allUsers} = useContext(AuthContext)

    const Back = () => {
        navigate(-1)
    }

    const DeletePost = async () => {
        try {
            const response = await fetch(`http://localhost:4000/posts/${_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.json())
            .then((data)=> console.log(data))
               navigate('/posts')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        DeletePost()
    }, [_id])

    const actionRef = () => {
        btnRef.current.classList.toggle('show-action')
    }
    const deleteBtn = () => {
        deleteRef.current.classList.add('delete')
    }

    useEffect(() => {
        fetch(`http://localhost:4000/posts/${_id}`)
            .then((response) => response.json())
            .then((data) => {
                setSinglePost(data)
        })
    }, [_id])

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
                      <div className="action">
                          <HiDotsHorizontal className='edit-icon' onClick={actionRef}/>  
                        <div className="action-btn" ref={ btnRef}>
                            <h3>Edit</h3>                          
                            <h3 onClick={deleteBtn}>Delete</h3>   
                          </div>
                          <div className="confirm" ref={deleteRef}>
                              <h2>Are you sure you want to DELETE this post?</h2>
                              <div className="answer">
                                  <h2 onClick={DeletePost}>YES</h2>
                                  <h2 onClick={Back}>NO</h2>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default SinglePost