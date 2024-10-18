import React, { useContext, useEffect } from 'react'
import '../pages//Posts.css'
import {FcLike} from 'react-icons/fc'
import AuthContext from '../Contexts/AuthContext'
import useAxios from '../utils/useAxios'

const Likes = ({ postId, likeCount, username }) => {

    
    const { user, posts, setPosts } = useContext(AuthContext)

    let api = useAxios()
    
    // Function that is called when a user likes a post. It saves the user's username and the post_id of the post
    
    const likePost = async () => {
        try {
            const response = await api(`/posts/like/${postId}`, {
                method: 'POST',
                body: JSON.stringify({postId, username: user.username})
            })
            const data = await response.data.message
            console.log(data);
            console.log(response);
            console.log(response.data.message);
            console.log(response.data.postToLike);            
            

            // Check if the post id(from the database) is equal to the clicked post(postId), then increment the number of likes in real time

                const updatedPosts = posts.map((post) => {
                    console.log(post._id);
                    console.log(postId);
                    
                    if ( post._id === postId ) {
                    return { ...post, count: data.postToLike.count };
                }
                return post;
            });

            setPosts(updatedPosts);
            
        } catch (error) {
            console.log(error.message);
        }
    }
    
  return (
      <div className='likes-div'>
          <div className="like-count">
              <FcLike onClick={user.username !== username ? likePost : null} />
              <h5>{likeCount}</h5>
          </div>
    </div>
  )
}

export default Likes