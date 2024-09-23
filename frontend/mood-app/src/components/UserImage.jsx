import React, { useState } from 'react'

const UserImage = ({profileImage, username, postId}) => {

  return (
      <img
          key={postId}
          username={username}
          src={profileImage}
          alt=''
          referrerPolicy='no-referrer'
      />
  )
}

export default UserImage