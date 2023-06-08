import React from 'react'
import NewUsers from './NewUsers'
import AllUsers from './AllUsers'

const Hero = () => {
  return (
      <div>
          <NewUsers
              avatar={avatar}
              username={username} />
          {/* <AllUsers /> */}
    </div>
  )
}

export default Hero