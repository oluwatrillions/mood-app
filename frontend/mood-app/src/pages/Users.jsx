import React, { useContext, useEffect, useState } from 'react'
import './Users.css'
import {Link} from 'react-router-dom'
import useAxios from '../utils/useAxios'
import AuthContext from '../Contexts/AuthContext'
import UserImage from '../components/UserImage'
const Users = () => {

    let api = useAxios()

    const { userToken } = useContext(AuthContext)

    const [allUsers, setAllUsers] = useState([])    

    const getUsers = async () => {
        let response = await fetch('http://localhost:4000/users')
        let data = await response.json()
        setAllUsers(data)
    }

    useEffect(() => {
        getUsers()
    }, [])
      
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
                                  profileImage={`http://localhost:4000/public/avatar/` + profileImage} /> 
                              <div className="user-info">
                                  <Link to={'/userprofile'}>
                                    <h2>{name}</h2>
                                    <h3>{username}</h3>
                                  </Link>
                              </div>
                              <h5>{registeredAt}</h5>
                          </div>
                      )
                  })
              }
          </div>
    </div>
  )
}

export default Users