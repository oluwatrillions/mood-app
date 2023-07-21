import React from 'react'
import axios from 'axios'

const Posts = () => {

    const posts = async () => {
        try {
            const allPosts = await fetch('http://localhost:4000/posts')
                .then((response) => console.log(response.json()))
            .then((data)=> console.log('you dude', data))
        } catch (error) {
            console.log(error);
        }
    }

  return (
      <div>
          <div></div>
    </div>
  )
}

export default Posts