import React, { useState } from 'react'
import './SignUp.css'
import {useNavigate} from "react-router-dom"

const Post = () => {

    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [notif, setNotif] = useState(null)

    const navigate = useNavigate()

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
        // const form = new FormData()
        // form.append('text', text)
        // form.append('image', image)
        
       try {
           const postBtn = await fetch('http://localhost:4000/create/post', {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify({
                   text,
                   image
               }),
           })
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
                          name='image'
                          accept='image/*'
                          filename='postImage'
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