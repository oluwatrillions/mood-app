import Cookies from 'js-cookie';
import dayjs from 'dayjs'

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
            console.log(data);
            return data
        } catch (error) {
            console.log(error);
        }
    }
    
    const fetcher = async (url, config={}) => {
        let token = localStorage.getItem('accesstoken') ? JSON.parse(localStorage.getItem('accesstoken')) : null
        console.log(token);
        config['headers'] = {
            Authorization: `Bearer ${token}`
        }

        console.log('before');
        let { response, data } = originalRequest(url, config)
        console.log('after', data);
        
        if (response.statusText === 'Unauthorized') {
            token = await refreshToken(refresh)

                config['headers'] = {
                Authorization: `Bearer ${token}`
            }

            let recentResponse = await originalRequest(url, config)
            response = recentResponse.response
            data = recentResponse.data
        }

        return { response, data }
}

export default fetcher;