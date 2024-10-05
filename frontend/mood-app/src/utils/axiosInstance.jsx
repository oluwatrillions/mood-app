import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'

const baseURL = 'http://localhost:4000'

const {userToken} = useContext(AuthContext)

console.log(userToken);

const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${userToken}` }
});

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axiosInstance.interceptors.request.use(async req => {
    if (!userToken) {
        token = localStorage.getItem('accesstoken') ? JSON.parse(localStorage.getItem('accesstoken')) : null
        
        console.log(userToken);
        req.headers.Authorization = `Bearer ${userToken}`
    }

    const user = jwt_decode(userToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    console.log('isExpired', isExpired);

    if (!isExpired) return req

     const response = await axios.post(`http://localhost:4000/refreshtoken`, null, {
            withCredentials: true,
            credentials: 'include',
        });
        console.log(response);
        localStorage.setItem('accesstoken', JSON.stringify(response.data))
        req.headers.Authorization = `Bearer ${response.data}`
        console.log(response.data);
        return req
},
    error => {
    Promise.reject(error)
}) 


export default axiosInstance