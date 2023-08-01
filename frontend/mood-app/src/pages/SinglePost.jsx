import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import './SinglePost.css'

const SinglePost = () => {

    const[singlePost, setSinglePost] = useState({})

    const { _id } = useParams()
    console.log(_id);

    useEffect(() => {
        fetch(`http://localhost:4000/posts/${_id}`)
            .then((response) => response.json())
            .then((data) => {
                setSinglePost(data)
                console.log(data);
        })
    }, [_id])

  return (
      <div className='single-post'>
          <div className="featured-post">
              <div className="featured-img">
                  <img src={`http://localhost:4000/public/images/${singlePost.image}`} alt="" />
              </div>
              <div className="text-detail">
                  <h3 className="titled">{singlePost.title}</h3>
                  <h4 className="text">{singlePost.text}</h4>
                  <div className="poster-detail">
                      <img src="" alt="" />
                      <div className="poster-name">
                          <h2 className="name">{singlePost.name}</h2>
                          <h5 className="postime">{ singlePost.postedAt}</h5>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default SinglePost