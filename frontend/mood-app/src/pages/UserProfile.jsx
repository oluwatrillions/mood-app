import React, {useEffect, useState} from 'react'
import './UserProfile.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useParams } from 'react-router-dom'


const UserProfile = () => {

    const [user, setUser] = useState()
    const { params } = useParams()

    // const userInfo = async () => {
    //     try {
    //         const profile = await fetch(`http://localhost:4000/users`)
    //             .then((response) => {
    //                 console.log(response)
    //                 return response.json()  
    //             }).then((data) => {
    //                 console.log(data)
    //                 setUser(data)
    //             })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     userInfo()
    // }, [ ])

        const token = localStorage.getItem('userToken');
            let decodedToken = jwt_decode(token);
            console.log(decodedToken);

  return (
      <div className='profile'>
          <div className="dashboard">
              <img src={`http://localhost:4000/` + decodedToken.avatar} alt="" />
              <h2>{ decodedToken.name}</h2>
          </div>
          <div className="user-content"></div>
    </div>
  )
}

export default UserProfile