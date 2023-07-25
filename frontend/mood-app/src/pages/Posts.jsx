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
        } catch (error) {
            console.log(error);
        }
    }

    const getImage = async () => {
        // try {
        //     const image = await fetch('http://localhost:4000/posts')
        //     const imageBlob = await image.blob()
        //     const imageObjectURL = URL.createObjectURL(imageBlob)
        //     setImage(imageObjectURL)
        //     console.log(imageObjectURL);
        // } catch (error) {
        //     console.log(error);
        // }
        const image = await axios('http://localhost:4000/getImage')
            .then(res => setImage(res.data[0].image))
            
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
                      <img src={'http://localhost:4000/images/' + image} alt='images' />
                      <h4 className="text-field">{text}</h4>
                      <h4 className="poster">posted by <span>{ name}</span></h4>
                  </div>
              })
          }
    </div>
  )
}

export default Posts