import React, { useRef, useState } from 'react'
import './SignUp.css'
import { useNavigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'


const Post = () => {

    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [notif, setNotif] = useState(null)

    const navigate = useNavigate()
    const imageRef = useRef()

    const token = localStorage.getItem('userToken');
            let decodedToken = jwt_decode(token);


     const loginSuccess = () => {
            const timer = setTimeout(() => {
                navigate('/posts')
                const clear = () => {
                    clearTimeout(timer)
            }
            }, 3000)
        }
    

    const handlePost = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', decodedToken.name)
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
           loginSuccess()
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
                      <label htmlFor="tite">Title:</label>
                      <input
                          type="text"
                          name='title'
                          value={title}
                          onChange={(e)=> setTitle(e.target.value)}
                        />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="text">Text:</label>
                      <input
                          type="text"
                          name='text'
                          value={text}
                          onChange={(e)=> setText(e.target.value)}
                        />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="image">Image:</label>
                      <input
                          type="file"
                          name='images'
                          accept='image/*'
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