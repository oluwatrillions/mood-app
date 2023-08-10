import { Route, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'

const PrivateRoute = ({ children, ...rest }) => {
    
    const navigate = useNavigate()
    let {user} = useContext(AuthContext)
    return(
        <div {...rest}>{!user ? navigate('/login') : children}</div>
    )
}

export default PrivateRoute;