import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const baseURL = 'http://localhost:4000'

let token = localStorage.getItem('accesstoken') ? JSON.parse(localStorage.getItem('accesstoken')) : null
// console.log(token);

//    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//         // console.log(cookieValue);

const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}` }
});

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axiosInstance.interceptors.request.use(async req => {
    if (!token) {
        token = localStorage.getItem('accesstoken') ? JSON.parse(localStorage.getItem('accesstoken')) : null
        
        console.log(token);
        req.headers.Authorization = `Bearer ${token}`
    }

    try {
        const user = jwt_decode(token)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
        
        if (!isExpired) return req
        
        const response = await axios.post(`${baseURL}/refreshtoken`, {
            'refreshToken': token,
        })
        console.log(response);
        localStorage.setItem('access-token', JSON.stringify(response.data))
        req.headers.Authorization = `Bearer ${response.data}`
        console.log(response.data);
        return req
    } catch (error) {
        console.log(error);
    }
}) 

export default axiosInstance