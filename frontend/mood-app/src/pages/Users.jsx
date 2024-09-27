import React, { useContext, useEffect, useState } from 'react'
import './Users.css'
import {Link} from 'react-router-dom'
import useAxios from '../utils/useAxios'
import AuthContext from '../Contexts/AuthContext'
import UserImage from '../components/UserImage'
import Loading from '../components/Loading'
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs'

dayjs.extend(relativeTime);


const Users = () => {

    const { deleteSuccess } = useContext(AuthContext)

    const [allUsers, setAllUsers] = useState([]) 
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(()=>{
            const getUsers = async () => {
                let response = await fetch('http://localhost:4000/users')
                let data = await response.json()
                setAllUsers(data)
                setIsLoading(false)
            }
            getUsers()
        }, 1000)
    }, [])

    const deleteUser = async (id) => {
        try {
            let response = await fetch(`http://localhost:4000/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=> res.json())
                .then((data)=> console.log(data.message)
            )
            deleteSuccess()
        } catch (error) {
            console.log(error);
            
        }
    }

    if(isLoading){
        return <Loading/>
    }
      
  return (
      <div className='users'>
          <div className="all-users">
              {
                  allUsers.map((user) => {
                      const { name, username, _id, profileImage, registeredAt } = user
                      return (
                          <div className="user" key={_id}>
                              <UserImage
                                  username={username}
                                  profileImage={user.scope === 'local' ? 'http://localhost:4000/public/avatar/' + profileImage : profileImage} /> 
                              <div className="user-info">
                                  <Link to={`/users/${_id}`}>
                                    <h2>{name}</h2>
                                    <h3>{username}</h3>
                                  </Link>
                              </div>
                              <h5>{dayjs(registeredAt).fromNow()}</h5>
                              <button onClick={()=> deleteUser(_id)}>Delete User</button>
                          </div>
                      )
                  }).reverse()
              }
          </div>
    </div>
  )
}

export default Users