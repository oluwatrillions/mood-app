import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()
    

        
export default AuthContext

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(()=> localStorage.getItem('accesstoken') ? jwt_decode(localStorage.getItem('accesstoken')) : null)
    const [userToken, setUserToken] = useState(()=> localStorage.getItem('accesstoken') ? localStorage.getItem('accesstoken') : null)
    const [notif, setNotif] = useState(null)
    const [allUsers, setAllUsers] = useState([])

       let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // console.log(cookieValue);

     const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({
                    'user': e.target.username.value,
                    'pwd': e.target.password.value,
                })
            })
            const data = await response.json()
            if (data?.accessToken) {
                localStorage.setItem('accesstoken', JSON.stringify(data.accessToken))
                setUserToken(data.accessToken)
                setUser(jwt_decode(data.accessToken))
                setNotif(data.message)
                loginSuccess()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loginSuccess = () => {
        const timer = setTimeout(() => {
            navigate(`/userprofile`)
            const clear = () => {
                clearTimeout(timer)
            }
        }, 3000)
    }  

    const handleLogout = async () => {
        try {
            const logout = await fetch('http://localhost:4000/logout', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            localStorage.removeItem('accesstoken')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    
    const UserContext = {
        user: user,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        loginSuccess: loginSuccess,
        notif: notif,
        setNotif: setNotif,
        userToken: userToken,
        setUserToken: setUserToken
    }
    

    return(
        <AuthContext.Provider value={UserContext}>
            {children}
        </AuthContext.Provider>
        )
}