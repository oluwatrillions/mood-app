import { redirect, Route, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import AuthContext from '../Contexts/AuthContext'

const PrivateRoute = ({ children, ...rest }) => {
    
    const navigate = useNavigate()
    let {user} = useContext(AuthContext)   
    
    useEffect(() => {
        if (!user || user.roles !== 'admin') {
            navigate('/')
        }
    }, [user, navigate])
    
    return(
        <div {...rest}>
            {children}
        </div>
    )
}

export default PrivateRoute;