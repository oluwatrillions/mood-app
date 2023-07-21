import React from 'react'
import './UserProfile.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useParams } from 'react-router-dom'


const UserProfile = () => {

    const { params } = useParams()

    // const userInfo = async () => {
    //     try {
    //         const profile = await axios.get(`http://localhost:4000/${params}`)
    //             .then(response => {
    //             console.log(response.data);
    //         })
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
          <div className="dashboard">{ decodedToken.name}</div>
          <div className="user-content">content page</div>
    </div>
  )
}

export default UserProfile