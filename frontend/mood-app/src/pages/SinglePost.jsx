import React, {useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router-dom'
import './SinglePost.css'
import { HiDotsHorizontal } from "react-icons/hi"


const SinglePost = () => {

    const [singlePost, setSinglePost] = useState({}) 
    const [isEdit, setIsEdit] = useState(false)
    const [iseDelete, setIsDelete] = useState(false)
    const btnRef = useRef(null)
    const deleteRef = useRef(null)
    const { _id } = useParams()

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
                        <img src="" alt="" />
                        <div className="poster-name">
                            <h2 className="name">{singlePost.name}</h2>
                            <h5 className="postime">{ singlePost.postedAt}</h5>
                        </div>
                      </div>
                      <div className="action">
                          <HiDotsHorizontal className='edit-icon' onClick={actionRef}/>  
                        <div className="action-btn" ref={ btnRef}>
                            <h3>Edit</h3>                          
                            <h3 className='' ref={deleteRef} onClick={deleteBtn}>Delete</h3>   
                          </div>
                          <div className="delete">
                              <h2>Are you sure you want to DELETE this post?</h2>
                              <div className="answer">
                                  <h2>YES</h2>
                                  <h2>NO</h2>
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