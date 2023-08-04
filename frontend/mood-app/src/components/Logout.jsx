import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const logout = await fetch('http://localhost:4000/logout', {
                method: 'POST'
            })
            localStorage.removeItem('userToken')
            localStorage.setItem('userToken', '')
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div onClick={handleLogout}>Logout</div>
  )
}

export default Logout