import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'
import axios from 'axios'

const baseURL = 'http://localhost:4000'

    const {userToken} = useContext(AuthContext)
    console.log(userToken);
    
    
    const axiosConfig = axios.create({
        baseURL,
        withCredentials: 'true',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
    })

    axiosConfig.interceptors.request.use(
        (config)=> {

            const token = localStorage.getItem('accesstoken')
            if(token){
                const tokenData = JSON.parse(atob(token.split('.')[1]));
                const isExpired = tokenData.exp * 1000 < Date.now();
                console.log(isExpired);
    
                config.headers.Authorization = `Bearer ${token}`
            } 
            return config;
        },

        (error) => {
            console.log(error);
            
        return Promise.reject(error)
    });


export default axiosConfig
