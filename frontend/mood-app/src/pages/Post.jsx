import React, { useContext, useRef, useState } from 'react'
import './SignUp.css'
import { useNavigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'
import AuthContext from '../Contexts/AuthContext'


const Post = () => {

    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [avatar, setAvatar] = useState()
    const [title, setTitle] = useState('')
    const [notif, setNotif] = useState(null)

    const {postSuccess, user} = useContext(AuthContext)

    const navigate = useNavigate()
    const imageRef = useRef()
    

    const handlePost = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', user.name)
        formData.append('username', user.username)
        formData.append('avatar', user.avatar)
        formData.append('title', title)
        formData.append('text', text)
        formData.append('images', image)
        
       try {
           const postBtn = await fetch('http://localhost:4000/post/create', {
               method: 'POST',
               body: formData,
           }).then((res) => {
               return res.json()
           }).then((data) => {
               console.log(data);
           })
           setTitle("")
           setText("")
           imageRef.current.value = ''
           postSuccess()
       } catch (error) {
            console.log(error);
       }
    }

  return (
    <div className='register'>
          <div className='signup'>
              <h3 className='notif'>{ notif }</h3>
              <form onSubmit={handlePost} encType='multipart/form-data'> 
                  <div className='inputs'>
                      <label htmlFor="tite" id='title'>Title:</label>
                      <input
                          type="text"
                          name='title'
                          value={title}
                          onChange={(e)=> setTitle(e.target.value)}
                        />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="text" id='text'>Text:</label>
                      <input
                          type="text"
                          name='text'
                          value={text}
                          onChange={(e)=> setText(e.target.value)}
                        />
                  </div>
                    {/* <div className='inputs'>
                      <label htmlFor="avatar" id='avatar'>Avatar:</label>
                      <input
                          type="file"
                        //   name='images'
                          accept='image/jpg, image/jpeg, image/png, image/gif'
                          filename='avatar'
                          onChange={(e)=> setAvatar(e.target.files[0])}
                        />
                  </div> */}
                  <div className='inputs'>
                      <label htmlFor="image" id='image'>Image:</label>
                      <input
                          type="file"
                        //   name='images'
                          accept='image/jpg, image/jpeg, image/png, image/gif'
                          filename='images'
                          ref={imageRef}
                          onChange={(e)=> setImage(e.target.files[0])}
                        />
                  </div>
                  <button className='signIn-btn' type='submit'>Send Post</button>
              </form>
          </div>
    </div>
  )
}

export default Post