import React, { useState } from 'react'

const UserImage = ({profileImage}) => {

    const [avatar, setAvatar] = useState(null)

    // const userImg = () => {
    //     const userAvi = async ({userId}) => {
    //         try {
    //             const response = await fetch('http://localhost:4000/users')
    //             const data = await response.json()
    //             console.log(data);
    //             setAvatar(data)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     userAvi()
    // }

    // userImg()

  return (
      <img
          src={profileImage}
          alt=''
      />
  )
}

export default UserImage