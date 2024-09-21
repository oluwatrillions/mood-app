import { redirect, Route, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import AuthContext from '../Contexts/AuthContext'

const PrivateRoute = ({ children, ...rest }) => {
    
    const navigate = useNavigate()
    let {user} = useContext(AuthContext)    
    
    return(
        <div {...rest}>
            {
                useEffect(()=>{
                    user.roles === 'admin' ? 
                    children
                :
                    navigate('/posts') 
                })
            }
        </div>
    )
}

export default PrivateRoute;