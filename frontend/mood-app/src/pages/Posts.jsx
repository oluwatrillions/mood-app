import React, {useEffect, useState} from 'react'
import './Posts.css'

const Posts = () => {

    const [posts, setPosts] = useState();

    const AllPosts = async () => {
        try {
            const allPosts = await fetch('http://localhost:4000/posts')
            const response = await allPosts.json()
            setPosts(response)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        AllPosts()
    }, [])

  return (
      <div className='all-posts'>
          {posts &&
              posts.map((post) => {
                  const { title, image, text, name, _id } = post
                  return <div key={_id}>
                      <h3 className="title">{ title}</h3>
                      <div className="posts">{image}</div>
                      <h4 className="text-field">{text}</h4>
                      <h4 className="poster">posted by <span>{ name}</span></h4>
                  </div>
              })
          }
    </div>
  )
}

export default Posts