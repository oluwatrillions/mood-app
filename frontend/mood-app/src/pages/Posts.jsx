import React, {useEffect, useState} from 'react'
import './Posts.css'
import axios from 'axios'

const Posts = () => {

    const [posts, setPosts] = useState();
    const [image, setImage] = useState();

    const AllPosts = async () => {
        try {
            const allPosts = await fetch('http://localhost:4000/posts')
            const response = await allPosts.json()
            setPosts(response)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    const getImage = async () => {
        try {
            const image = await fetch('http://localhost:4000/posts')
            // const imageBlob = await image.blob()
            // const imageObjectURL = URL.createObjectURL(imageBlob)
            // setImage(imageObjectURL)
            // console.log(imageObjectURL);
            const feedback = await image.json()
            console.log(feedback)
            const imgFeed = await feedback[1].image
            console.log(imgFeed)
            setImage(imgFeed)
        } catch (error) {
            console.log(error);
        }            
    }


    useEffect(() => {
        AllPosts();
        getImage();
    }, [])

  return (
      <div className='all-posts'>
          {posts &&
              posts.map((post) => {
                  const { title, text, name, _id } = post
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