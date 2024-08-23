import React, { useEffect, useState } from 'react'

const Likes = () => {

    const [likes, setLikes] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        fetch("http://localhost:4000/posts")
        .then((res)=> res.json())
        .then((data)=> setPosts(data)
        )
    })
  return (
    <div>{posts.map((post)=> {
        
    })}</div>
  )
}

export default Likes