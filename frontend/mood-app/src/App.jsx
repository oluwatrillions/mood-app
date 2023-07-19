import {useState} from 'react'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Posts from './pages/Posts'
import Post from './pages/Post'
import UserProfile from './pages/UserProfile'
import {LoginContext} from './Contexts/LoginContext'

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
      <div>
          <Layout>
              <LoginContext.Provider value={{
                  isLoggedIn, setIsLoggedIn
              }}>
                <Router>
                    <Routes>
                        <Route path='/' element={<Homepage />} />
                        <Route path='/signup' element={<SignUp/>} />
                        <Route path='/signin' element={<SignIn/>} />
                        <Route path='/create/post' element={<Post/>} />
                        <Route path='/posts' element={<Posts/>} />
                        <Route path='/userprofile/:id' element={<UserProfile/>} />
                    </Routes>
                </Router>
                </LoginContext.Provider>
          </Layout>
    </div>
  )
}

export default App
