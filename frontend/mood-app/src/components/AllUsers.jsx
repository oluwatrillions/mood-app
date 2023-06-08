import React from 'react'
import allUsersData from './Data'
import './AllUsers.css'

const AllUsers = () => {
  return (
      <div className='all-users'>
          {allUsersData.map((users) => {
              return <div key={users.id}>
                  <section className='allUsers'>
                      <img src={users.avatar} alt="avatar" />
                      <h4>{users.name }</h4>
                    </section>
              </div>
          })
          }
    </div>
  )
}

export default AllUsers