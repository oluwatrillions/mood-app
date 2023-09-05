import React, { useState } from 'react'

const UserImage = ({profileImage, username}) => {

  return (
      <img
          username={username}
          src={profileImage}
          alt=''
      />
  )
}

export default UserImage