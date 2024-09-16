import { redirect, Route, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import AuthContext from '../Contexts/AuthContext'

const PrivateRoute = ({ children, ...rest }) => {
    
    const navigate = useNavigate()
    let {user} = useContext(AuthContext)    
    
    return(
        <div {...rest}>
            {
                user.roles === 'admin' ? 
                    children
                :
                null 
            }
        </div>
    )
}

export default PrivateRoute;