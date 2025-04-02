import React, {useContext, useEffect, useState} from 'react'
import './UserProfile.css'
import AuthContext from '../Contexts/AuthContext'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom'


const UserProfile = () => {

    const { user } = useContext(AuthContext)  
    const [users, setUsers] = useState([])  
    const navigate = useNavigate()
    
    useEffect(()=>{
      try {
        fetch(`http://localhost:4000/users/`)
        .then((res)=> res.json())
        .then(response=> setUsers(response.filter((item)=> item.email === user.email)))
        const timeout = setTimeout(()=>{
          navigate('/posts')
        }, 2000)
    } catch (error) {
        console.log(error);
    }
    }, [])
  
    dayjs.extend(relativeTime);

  return (
      <div className='profile'>
          <div className="dashboard">
              <img src={`http://localhost:4000/public/avatar/${users.map(item=> item.profileImage)}`} alt="" />
              <h2><span>name: </span>{users.map(item=> item.name)}</h2>
              <h4><span>username: </span> @{ users.map(item=> item.username)}</h4>
              <h4><span>email: </span> @{ users.map(item=> item.email)}</h4>
              <h5> <span>joined: </span> { dayjs(users.map(item=> item.registeredAt)).fromNow()}</h5>
          </div>
    </div>
  )
}

export default UserProfile