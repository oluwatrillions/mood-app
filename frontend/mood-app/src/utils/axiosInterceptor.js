import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'
import axios from 'axios'

const baseURL = 'http://localhost:4000'
    
    const axiosConfig = axios.create({
        baseURL,
        headers: { 'Content-Type': 'application/json' },
    })

    axiosConfig.interceptors.request.use(
        (config)=> {

            const token = localStorage.getItem('accesstoken')
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            } 
            return config;
        },

        (error) => {
            console.log(error);
            
        return Promise.reject(error)
    });


export default axiosConfig
