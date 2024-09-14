import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Admin = () => {

  const {user} = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  
  useEffect(()=>{
    fetch('http://localhost:4000/users')
    .then((res)=> res.json())
    .then((data)=> setUsers(data.find(currentUser => currentUser.email === user.email))
)
}, [users])

console.log(users);


  return (
    <div className='admin-page'>
      <h5>ADMIN PAGE MY PEOPLE</h5>
      {
        users.roles === 'admin' ? 
        <div className="admin">
          This is the admin page
        </div>
        : 
        useEffect(()=>{
          navigate('posts')
        })
      }
    </div>
  )
}

export default Admin