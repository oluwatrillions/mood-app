import React, { useContext, useEffect, useRef, useState } from 'react'
import './SignUp.css'
import AuthContext from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


const Post = () => {

    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [avatar, setAvatar] = useState()
    const [title, setTitle] = useState('')
    const [notif, setNotif] = useState(null)
    const [likes, setLikes] = useState([])

    const { postSuccess, user } = useContext(AuthContext)

    const navigate = useNavigate()

    const back = (e) => {
        e.preventDefault()
        navigate('/posts')
    }

    const imageRef = useRef()
    

    const handlePost = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', user.name)
        formData.append('username', user.username)
        formData.append('posterImage', user.avatar)
        formData.append('title', title)
        formData.append('text', text)
        formData.append('images', image)
        formData.append('likes', likes)
        
       try {
           const postBtn = await fetch('http://localhost:4000/post/create', {
               method: 'POST',
               body: formData,
           }).then((res) => {
               return res.json()
           }).then((data) => {
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
              <form encType='multipart/form-data'> 
                  <div className='inputs'>
                      <label htmlFor="tite" id='title'>Title:</label>
                      <input
                          type="text"
                          name='title'
                          value={title}
                          required
                          onChange={(e)=> setTitle(e.target.value)}
                        />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="text" id='text'>Text:</label>
                      <input
                          type="text"
                          name='text'
                          value={text}
                          required
                          onChange={(e)=> setText(e.target.value)}
                        />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="image" id='image'>Image:</label>
                      <input
                          type="file"
                          name='images'
                          accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
                          filename='images'
                          required
                          ref={imageRef}
                          onChange={(e)=> setImage(e.target.files[0])}
                        />
                  </div>
                  <button className='signIn-btn' type='submit' onClick={handlePost}>{ title.length > 0 ? <h3>Send Post</h3> : <h3 onClick={back}>Go Back</h3>}</button>
              </form>
          </div>
    </div>
  )
}

export default Post