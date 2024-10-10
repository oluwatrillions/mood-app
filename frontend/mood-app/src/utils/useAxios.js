import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'
import axios from 'axios'

    const baseURL = 'http://localhost:4000'    

    const useAxios = ()=> {
        const {userToken, setUserToken, user, setUser, handleLogout} = useContext(AuthContext)

        const axiosInstance = axios.create({
            baseURL,
            credentials: 'include',
            withCredentials: true,
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${userToken}`
             },
        })        

        axiosInstance.interceptors.request.use(async req => {
    
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
            console.log(isExpired);            
            
            if(!isExpired) return req
    
            const response = await fetch(`${baseURL}/refreshtoken`, {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
            })
            const newAccess = await response.json();
            
            localStorage.setItem('accesstoken', JSON.stringify(newAccess))
            setUserToken(newAccess)
            setUser(jwt_decode(localStorage.getItem('accesstoken')))
            
            req.headers.Authorization = `Bearer ${newAccess}`
            return req
        });

        return axiosInstance
    } 
        
    export default useAxios
