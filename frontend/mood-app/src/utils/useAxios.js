import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'
import axios from 'axios'

const baseURL = 'http://localhost:4000'

const useAxios = () => {

    const { userToken, setUserToken, setUser } = useContext(AuthContext)
    
    const axiosConfig = axios.create({
        baseURL,
        headers: { Authorization : ` Bearer ${userToken}` }
    })

    axiosConfig.interceptors.request.use(async req => {

        const user = jwt_decode(userToken)
        const isExpired = dayjs.unix(user.exp).diff(dayjs) < 1

        if (!isExpired) return req

        const response = await axios.post(`${baseURL}/refreshtoken`, {
            refreshToken: userToken
        });

        localStorage.setItem('accesstoken', JSON.stringify(response.data))
        console.log(response.data);
        setUserToken(response.data)
        setUser(jwt_decode(response.data).name)

        req.headers.Authorization = `Bearer ${response.data}`
        return req

    }, function (error) {
        return Promise.reject(error)
    });

    axiosConfig.interceptors.response.use((response) => {
        return response
        }, async function (error) {
            const originalRequest = error.req
            if (error.response.status === 403) {
                
                const response = await axios.post(`${baseURL}/refreshtoken`, {
                    refreshToken: userToken,
                })
                console.log(response);
                localStorage.setItem('access-token', JSON.stringify(response.data))
                req.headers.Authorization = `Bearer ${response.data}`
                console.log(response.data);
                return axiosInstance(originalRequest)
            }
            return Promise.reject(error)
        })

    return axiosConfig
}

export default useAxios
