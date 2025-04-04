import React, { useContext } from 'react'
import '../pages/Posts.css'
import {BiMessageRoundedDots} from 'react-icons/bi'
import AuthContext from '../Contexts/AuthContext'
import UserImage from './UserImage'


const Comments = ({ replyRef, author, comment, count, profileImage }) => {

    const { allUsers } = useContext(AuthContext)

  return (
      <div className='comments'>
          <div className='comment-div' onClick={replyRef} >
                <BiMessageRoundedDots className='msg-img' />
              <h5>{count}</h5>
              <div className="comment-section">
                  <div className="comment-avatar">
                      {
                        allUsers.map((user) => user.username === author ? 
                            <UserImage
                                key={user._id}
                                username={author}
                                profileImage={user.scope === 'local' ? `${import.meta.env.VITE_APP_BACKEND_URL}/public/avatar/` + user.profileImage : user.profileImage}
                            />
                            : null                            
                        )
                    }
                  </div>
                  <div className="each-cmt">
                    <h4>{author}</h4>
                    <h5>{comment}</h5>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Comments