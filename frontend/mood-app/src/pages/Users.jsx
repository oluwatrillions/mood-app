import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Contexts/AuthContext'
import useFetcher from '../utils/useFetcher'

const Users = () => {


    const api = useFetcher()
    const [allUsers, setAllUsers] = useState([])

    const { userToken } = useContext(AuthContext)
    
    useEffect(() => {
        getUsers()
    })

    const getUsers = async () => {

        try {
            
            let { response, data } = await api('/users')
            if (response.statusText === 200) {
                
                setAllUsers(data)
                console.log(data);
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