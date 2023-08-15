import React, { useContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import AuthContext from '../Contexts/AuthContext'
import useAxios from '../utils/useAxios'
import axiosInstance from '../utils/axiosInstance'

const Users = () => {

    // let api = useAxios()

    const [allUsers, setAllUsers] = useState([])

    const { userToken } = useContext(AuthContext)
    
    // useEffect(() => {
    //     getUsers()
    // }, [userToken])

    

    const getUsers = async () => {
        let response = await axiosInstance.get('/users')
        console.log(response);
        console.log(response.data);
       try {
           if (response.statusCode === 200) {
               setAllUsers(response.data)
               console.log(response.data);
        }

       } catch (error) {
            console.log(error);
       }    
    }

    getUsers()

  return (
      <div className='users'>
          <div className="all-users">
              {
                  allUsers.map((user) => {
                      const { name, username, _id, profileImage, registeredAt } = user
                      return (
                          <div className="user" key={_id}>
                              <img src={profileImage} alt="" />
                              <h2>{name}</h2>
                              <h3>{username}</h3>
                              <h5>{ registeredAt}</h5>
                              <div className="individuals">
                                  <input type="button" placeholder='edit'/>
                                  <input type="button" placeholder='Delete'/>
                              </div>
                          </div>
                      )
                  })
              }
          </div>
    </div>
  )
}

export default Users