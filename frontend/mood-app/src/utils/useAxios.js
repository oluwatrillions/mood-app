import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'
import axios from 'axios'

    const baseURL = 'http://localhost:4000'    
        
    let token = localStorage.getItem('accesstoken') ? JSON.parse(localStorage.getItem('accesstoken')) : null

    console.log(token);
    

        const axiosConfig = axios.create({
            baseURL,
            withCredentials: 'true',
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
             },
        })
    
        axiosConfig.interceptors.request.use(async req => {
            console.log('intercepted');
            if(!token){
                token = localStorage.getItem('accesstoken') ? JSON.parse(localStorage.getItem('accesstoken')) : null
                req.headers.Authorization = `Bearer ${token}`
            }
            const user = jwt_decode(token)
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
            console.log(isExpired);
            
            if(!isExpired) return req

            const response = await fetch(`${baseURL}/refreshtoken`, {
                method: 'POST',
                withCredentials: true,
                credentials: 'include',
            })
            const newAccess = await response.json();
            localStorage.setItem('accesstoken', JSON.stringify(newAccess))
            req.headers.Authorization = `Bearer ${newAccess}`
            return req
            
        });
    
        
    export default axiosConfig
