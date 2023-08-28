import React, {useContext, useEffect, useState} from 'react'
import './Posts.css'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext'

const Posts = () => {

    const { user, allUsers } = useContext(AuthContext)

    const [posts, setPosts] = useState([]);
    const [userImage, setUserImage] = useState([])

    const AllPosts = async () => {
        try {
            const allPosts = await fetch('http://localhost:4000/posts')
            const response = await allPosts.json()
            setPosts(response)
            console.log(posts);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        AllPosts();
    }, [])


    return (
        <div className='posts-div'>
            <div className='all-posts'>
                {user &&
                    posts.map((post) => {
                        const { title, text, name, image, _id, postedAt, username, avatar } = post
                        console.log(avatar);
                        return <div key={_id} className='posts'>
                            <Link to={`/posts/${_id}`}>
                                <div className='image-div'>
                                    <img src={`http://localhost:4000/public/images/` + image} alt='images'  className='img-div'/>
                                </div>
                                <div className="post-text">
                                    <h3 className="title">{title}</h3>
                                    <h4 className="text-field">{text}</h4>
                                    <div className='post-detail'>
                                        <img src={`http://localhost:4000/public/avatar/` +  avatar } alt="avatar" className='poster-image' />
                                        <div className="time">
                                            <h4 className="poster">{name}</h4>
                                            <h5 className='post-time'>{ postedAt}</h5>
                                        </div>
                                    </div>
                                </div> 
                                </Link>
                            </div>
                    }).reverse()
                }
            </div>
        </div>
  )
}

export default Posts