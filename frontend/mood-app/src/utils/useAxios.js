import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'
import axios from 'axios'

const baseURL = 'http://localhost:4000'

const useAxios = () => {

    const { userToken, setUserToken } = useContext(AuthContext)
    
    const axiosConfig = axios.create({
        baseURL,
        headers: { 'Content-Type': 'application/json' },
    })

    axiosConfig.interceptors.request.use(async req => {

        // const user = jwt_decode(userToken)
        // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

        // console.log('isExpired', isExpired);

        // if (!isExpired) return req

        // const response = await axios.post(`http://localhost:4000/refreshtoken`, null, {
        //     withCredentials: true,
        //     credentials: 'include',
        // });
        // console.log(response);
        // localStorage.setItem('accesstoken', JSON.stringify(response.data))
        // setUserToken(response.data)
        function (config) {
            const token = userToken
            if(token){
                req.headers.Authorization = `Bearer ${userToken}`
            }
            return req
        }

    }, function (error) {
        return Promise.reject(error)
    });

        return axiosConfig
}

export default useAxios
