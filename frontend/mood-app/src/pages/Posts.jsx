import React, {useEffect, useState} from 'react'
import './Posts.css'
import jwt_decode from 'jwt-decode'

const Posts = () => {

    const [posts, setPosts] = useState();

    const AllPosts = async () => {
        try {
            const allPosts = await fetch('http://localhost:4000/posts')
            const response = await allPosts.json()
            const posts = setPosts(response)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const posts = AllPosts();
    }, [])

    const token = localStorage.getItem('userToken');
            let decodedToken = jwt_decode(token);
            console.log(decodedToken);

    return (
        <div className='posts-div'>
            <div className='all-posts'>
                {posts &&
                    posts.map((post) => {
                        const { title, text, name, image, _id, postedAt, avatar } = post
                        return <div key={_id} className='posts'>
                                <div className='image-div'>
                                    <img src={`http://localhost:4000/public/images/` + image} alt='images'  className='img-div'/>
                                </div>
                                <div className="post-text">
                                    <h3 className="title">{title}</h3>
                                    <h4 className="text-field">{text}</h4>
                                    <div className='post-detail'>
                                        <img src={ `http://localhost:4000/public/avatar/` + avatar} alt="" className='poster-image' />
                                        <div className="time">
                                            <h4 className="poster">{name}</h4>
                                            <h5 className='post-time'>{ postedAt}</h5>
                                        </div>
                                    </div>
                                </div>                         
                            </div>
                    }).reverse()
                }
            </div>
        </div>
  )
}

export default Posts