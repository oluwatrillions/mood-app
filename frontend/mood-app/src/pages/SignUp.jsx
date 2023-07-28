import React, { useState } from 'react'
import './SignUp.css'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState("")
    const [notif, setNotif] = useState(null)

    const navigate = useNavigate()

     const signupSuccess = () => {
            const timer = setTimeout(() => {
                navigate('/signin')
                const clear = () => {
                    clearTimeout(timer)
            }
            }, 3000)
        }

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const signupData = new FormData()
            signupData.append('name', name)
            signupData.append('username', username)
            signupData.append('password', password)
            signupData.append('avatar', avatar)

           const userDetails = await fetch('http://localhost:4000/signup', {
               method: 'POST',
               body: signupData,
           }).then(res => {
               if (res.ok) {
                   setName('')
                   setUsername('')
                   setPassword('')
                   signupSuccess()
               } else {
                    setName('')
                    setUsername('')
                    setPassword('')
               }
               return res.json();
           }).then(data => {
               console.log(data);
               setNotif(data.message)
           })
       } catch (error) {
        console.log(error);
       }
    }

  return (
      <div className='register'>
          <div className='signup'>
              <img src="./images/smiley.png" alt="" />
              <h3 className='notif'>{ notif }</h3>
              <form onSubmit={handleSignup}>
                  <div className='inputs'>
                      <label htmlFor="name" id='name'>Name:</label>
                      <input
                          type="text"
                          name='name'
                          value={name}
                          required
                          onChange={ ((e)=> setName(e.target.value))} />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="username" id='username'>Username:</label>
                      <input
                          type="text"
                          name='username'
                          value={username}
                          required
                          onChange={ ((e)=> setUsername(e.target.value))} />
                  </div>
                  <div className='inputs'>
                      <label htmlFor="password" id='password'>Password:</label>
                      <input
                          type="password"
                          name='password'
                          value={password}
                          required
                          onChange={((e) => setPassword(e.target.value))} />
                  </div>
                  <div className='avatar'>
                      <label htmlFor="avatar" id='avatar'>Profile Avatar:</label>
                      <input
                          type="file"
                          accept='image/png, image/jpeg, image/jpg, image/gif'
                          name='avatar'
                          filename='avatar'
                          onChange={((e) => setAvatar(e.target.files[0]))} />
                  </div>
                  <button className='signIn-btn' type='submit'>Sign Up</button>
              </form>
          </div>
    </div>
  )
}

export default SignUp