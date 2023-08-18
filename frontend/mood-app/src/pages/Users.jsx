import React, { useContext, useEffect, useState } from 'react'
import useAxios from '../utils/useAxios'
import AuthContext from '../Contexts/AuthContext'
const Users = () => {

    let api = useAxios()

    const { userToken } = useContext(AuthContext)

    const [allUsers, setAllUsers] = useState([])

    console.log(allUsers);
    

    const getUsers = async () => {
        let response = await api.get('/users')
        console.log(response);
       try {
           if (response.statusCode === 200) {
               setAllUsers(response.data)
               console.log(response);
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