import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const baseURL = 'http://localhost:4000'

let token = localStorage.getItem('accesstoken') ? JSON.parse(localStorage.getItem('accesstoken')) : null

const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}` }
});

axiosInstance.interceptors.request.use(async req => {
    if (!token) {
        token = localStorage.getItem('accesstoken') ? JSON.parse(localStorage.getItem('accesstoken')) : null
        req.headers.Authorization = `Bearer ${token}`
    }

    const user = jwt_decode(token)
    console.log(user);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    console.log('isExpired', isExpired);
    if (!isExpired) return req
    
    const response = await axios.post(`${baseURL}/refreshtoken`, {
        token
    })
    localStorage.setItem('accesstoken', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data}`
    console.log(response);
    console.log(response.data);
    return req
}) 

export default axiosInstance