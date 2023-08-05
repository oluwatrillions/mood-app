import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()
    

        
export default AuthContext

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(()=> localStorage.getItem('accesstoken') ? jwt_decode(localStorage.getItem('accesstoken')).name : null)
    const [userToken, setUserToken] = useState(()=> localStorage.getItem('accesstoken') ? localStorage.getItem('accesstoken') : null)
    const [notif, setNotif] = useState(null)

    useEffect(() => {
          try {
        const token = localStorage.getItem('accesstoken');
          if (token) {
            let decodedToken = jwt_decode(token);
        setUserToken(token)
        setUser(decodedToken.name)
    } else {
        navigate('/')
    }
    } catch (error) {
        console.log(error);
    }
    }, [])

    const loginSuccess = () => {
        const timer = setTimeout(() => {
            navigate(`/userprofile`)
            const clear = () => {
                clearTimeout(timer)
            }
        }, 3000)
    }   

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const logout = await fetch('http://localhost:4000/logout', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            localStorage.removeItem('accesstoken')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    

    const handleLogin = async (e) => {
        e.preventDefault()
       try {
         const loginBtn = await fetch('http://localhost:4000/login', {
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
         }).then((response) => {
             console.log(response);
             if (response.ok) {
                loginSuccess();
             }
            return response.json()
         }).then((data) => {
             console.log(data);
             setUser(jwt_decode(data.accessToken).name)
             setUserToken(data.accessToken)
            localStorage.setItem('accesstoken', JSON.stringify(data.accessToken))
            setNotif(data.message)
            console.log('login work');
        })
       } catch (error) {
            console.log(error);
       }
    }

    const UserContext = {
        user: user,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        loginSuccess: loginSuccess,
        notif: notif,
        setNotif: setNotif
    }
    

    return(
        <AuthContext.Provider value={UserContext}>
            {children}
        </AuthContext.Provider>
        )
}