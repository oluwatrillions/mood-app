import { useContext } from 'react'
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import dayjs from 'dayjs'
import AuthContext from '../Contexts/AuthContext';

let useFetcher = () => {
    const { user, setUser, userToken, setUserToken } = useContext(AuthContext)

    let baseURL = 'http://localhost:4000'
    
    let originalRequest = async (url, config) => {
        url = `${baseURL}/${url}`    
        let response = await fetch(url, config)
        let data = await response.json()
        console.log('originalRequest', data);
        return { response, data }
    }

     const refreshToken = async (refresh) => {
        try {
            const response = await fetch('http://localhost:4000/refreshtoken', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(refresh)
            })
            const data = await response.json()
            localStorage.setItem('accesstoken', JSON.stringify(data))
            setUserToken(data)
            setUser(jwt_decode(data))
            console.log(data);
            return data
        } catch (error) {
            console.log(error);
        }
    }

     let callFetch = async (url) => {
        const user = jwt_decode(userToken)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if(isExpired){
            userToken = await refreshToken(userToken)
        }

        
        config['headers'] = {
            Authorization:`Bearer ${token}`
        }

        let {response, data} = await originalRequest(url, config)
        return {response, data}
    }

    return callFetch
}

export default useFetcher;