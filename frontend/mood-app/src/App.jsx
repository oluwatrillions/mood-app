import {useState} from 'react'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Posts from './pages/Posts'
import Post from './pages/Post'
import UserProfile from './pages/UserProfile'
import {authContext} from './Contexts/LoginContext'
import SinglePost from './pages/SinglePost'

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
      <div>
          <Router>
              <Layout>
                   <authContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
                        <Routes>
                            <Route path='/' element={<Homepage />} />
                            <Route path='/signup' element={<SignUp/>} />
                            <Route path='/signin' element={<SignIn/>} />
                            <Route path='/post/create' element={<Post/>} />
                            <Route path='/posts' element={<Posts/>} />
                            <Route path='/posts/:_id' element={<SinglePost/>} />
                            <Route path='/userprofile' element={<UserProfile/>} />
                        </Routes>
                  </authContext.Provider>
                </Layout>
            </Router>
    </div>
  )
}

export default App
