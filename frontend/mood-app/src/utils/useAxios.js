import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'

const baseURL = 'http://localhost:4000'

const useAxios = () => {

    const { userToken, setUserToken, setUser } = useContext(AuthContext)
    console.log(userToken);
    
    const axiosConfig = axios.create({
        baseURL,
        headers: { Authorization : ` Bearer ${userToken}` }
    })

    axiosConfig.interceptors.request.use(async req => {

        const user = jwt_decode(userToken)
        const isExpired = dayjs.unix(user.exp).diff(dayjs) < 1

        if (!isExpired) return req

        const response = await axios.post(`${baseURL}${user}`, {
            userToken
        });

        localStorage.setItem('accesstoken', JSON.stringify(response.data))
        console.log(response.data);
        setUserToken(response.data)
        setUser(jwt_decode(response.data).name)

        req.headers.Authorization = `Bearer ${response.data}`
        return req
    })

    return axiosConfig
}

export default useAxios