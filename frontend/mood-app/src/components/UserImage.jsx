import React, { useState } from 'react'

const UserImage = () => {

    const [avatar, setAvatar] = useState(null)

    const userImg = () => {
        const userAvi = async ({userId}) => {
            try {
                const response = await fetch('http://localhost:4000/users')
                const data = await response.json()
                setAvatar(data)
            } catch (error) {
                console.log(error);
            }
        }
        userAvi()
    }

  return (
      <img
          src={avatar.avatar}
          alt={avatar.name}
      />
  )
}

export default UserImage