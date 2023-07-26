import React, {useEffect, useState} from 'react'
import './Posts.css'
import axios from 'axios'

const Posts = () => {

    const [posts, setPosts] = useState();

    const AllPosts = async () => {
        try {
            const allPosts = await fetch('http://localhost:4000/posts')
            const response = await allPosts.json()
            setPosts(response)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        AllPosts();
    }, [])

  return (
      <div className='all-posts'>
          {posts &&
              posts.map((post) => {
                  const { title, text, name, image, _id } = post
                  return <div key={_id}>
                      <h3 className="title">{ title}</h3>
                      <img src={`http://localhost:4000/public/images/` + image} alt='images'  className='img-div'/>
                      <h4 className="text-field">{text}</h4>
                      <h4 className="poster">posted by <span>{ name}</span></h4>
                  </div>
              })
          }
    </div>
  )
}

export default Posts