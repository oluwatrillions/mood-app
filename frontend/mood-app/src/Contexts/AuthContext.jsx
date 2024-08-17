import { createContext, useEffect, useRef, useState } from "react";
import jwt_decode from 'jwt-decode'
import { useNavigate, useParams } from "react-router-dom";


export const AuthContext = createContext()




export default AuthContext

export const AuthProvider = ({ children }) => {
    
    const navigate = useNavigate()
    
    const [user, setUser] = useState(()=> localStorage.getItem('accesstoken') ? jwt_decode(localStorage.getItem('accesstoken')) : null)
    const [userToken, setUserToken] = useState(()=> localStorage.getItem('accesstoken') ? localStorage.getItem('accesstoken') : null)
    const [notif, setNotif] = useState(null)
    const [allUsers, setAllUsers] = useState([])
    const [posts, setPosts] = useState([])

    //    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    //     // console.log(cookieValue);

     const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({
                    'user': e.target.username.value,
                    'pwd': e.target.password.value,
                })
            })
            const data = await response.json()
            console.log(data);
            if (data?.accessToken) {
                localStorage.setItem('accesstoken', JSON.stringify(data.accessToken))
                setUserToken(data.accessToken)
                setUser(jwt_decode(data.accessToken))
                setNotif(data.message)
                loginSuccess()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loginSuccess = () => {
        const timer = setTimeout(() => {
            setNotif('')
            navigate('/userprofile/')
            const clear = () => {
                clearTimeout(timer)
            }
        }, 3000)
    }  
    const postSuccess = () => {
        const timer = setTimeout(() => {
            navigate('/posts')
            const clear = () => {
                clearTimeout(timer)
            }
        }, 3000)
    } 
    const deleteSuccess = () => {
        const timer = setTimeout(() => {
            navigate('/posts')
            const clear = () => {
                clearTimeout(timer)
            }
        }, 2000)
    } 
    
    const handleUserImage = async () => {
        const userImage = await fetch('http://localhost:4000/users')
        const response = await userImage.json()
        setAllUsers(response)
    }

    useEffect(() => {
        AllPosts()
        handleUserImage()   
    },[])


    const handleLogout = async () => {
        try {
            const logout = await fetch('http://localhost:4000/logout', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            localStorage.removeItem('accesstoken')
            setUser('')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

     const AllPosts = async () => {
        try {
            const allPosts = await fetch('http://localhost:4000/posts')
            const response = await allPosts.json();
            setPosts(response)
        } catch (error) {
            console.log(error);
        }
    }

    const [userComment, setUserComment] = useState([])

    const commentOnMessage = async (postId, username, comment) => {        
        try {
            const response = await fetch(`http://localhost:4000/posts/comment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postId, username, comment })
            })
            
            const data = await response.json()
            console.log(data);

            console.log(posts);

            const updatedPosts = posts.map((post) => {
                if (post._id === data.postId) {
                    console.log(post._id);
                    console.log(data.postId);
                return { ...post, commentCount: data.commentCount };
            }
                return post;
            });
            
            setPosts(updatedPosts);
            setUserComment('');
        } catch (error) {
            console.log(error);
        }
    }

     // creating a ref to display the message being commented on 
    const commmentRef = useRef({})
    
    const replyRef = (id) => {
        commmentRef.current[id].classList.add('show-cmt') 
    }

    
    const UserContext = {
        user: user,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        loginSuccess: loginSuccess,
        notif: notif,
        setNotif: setNotif,
        userToken: userToken,
        setUserToken: setUserToken,
        postSuccess: postSuccess,
        allUsers: allUsers,
        deleteSuccess: deleteSuccess,
        posts: posts,
        setPosts: setPosts,
        AllPosts: AllPosts,
        commentOnMessage: commentOnMessage,
        userComment: userComment,
        setUserComment: setUserComment,
        commmentRef: commmentRef,
        replyRef: replyRef
    }
    

    return(
        <AuthContext.Provider value={UserContext}>
            {children}
        </AuthContext.Provider>
        )
}