import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext'


let baseURL = 'http://localhost:4000/'

let originalRequest = async (url, config) => {
    url = `${baseURL}${url}`
    let response = await fetch(url, config)
    console.log(response);
    let data = await response.json()
    console.log(data);
    console.log('before or after', response);
    return { response, data }
}

const refreshToken = async (refresh) => {
   try {
        let response = await fetch('http://localhost:4000/refreshtoken', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(refresh)
        })
       let data = await response.json()
       console.log(data)
       localStorage.setItem('accesstoken')
   } catch (error) {
    console.log(error);
   }
}

let customFetch = async (url, config={}) => {
    let token = localStorage.getItem('accesstoken') ? JSON.parse(localStorage.getItem('accesstoken')) : null
    const user = jwt_decode(token).name
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (isExpired) {
        token = await refreshToken(token)
        console.log(token);
    }

    config['headeers'] = {
        Authorization: `Bearer ${token}`
    }

    let { response, data } = await originalRequest(url, config)
    
    return { response, data }
    console.log('after', data, response);
}

customFetch()

export default customFetch