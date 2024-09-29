import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Posts from './pages/Posts'
import Post from './pages/Post'
import UserProfile from './pages/UserProfile'
import {AuthProvider} from './Contexts/AuthContext'
import SinglePost from './pages/SinglePost'
import Users from './pages/Users'
import PrivateRoute from './pages/PrivateRoute'
import UserPosts from './pages/UserPosts'
import Likes from './pages/Likes'
import Admin from './pages/Admin'

function App() {


  return (
      <div>
          <Router>
              <AuthProvider>
                    <Layout>
                        <Routes>
                            <Route path='/users/:_id' element={<UserPosts/>} />
                            <Route path='/' element={<Homepage />} exact/>
                            <Route path='/signup' element={<SignUp/>} />
                            <Route path='/signin' element={<SignIn/>} />
                            <Route path='/users' element={<PrivateRoute><Users/></PrivateRoute>} />
                            <Route path='/admin' element={<PrivateRoute><Admin/></PrivateRoute>} />
                            <Route path='/post/create' element={<Post/>} />
                            <Route path='/posts' element={<Posts/>} />
                            <Route path='/posts/:_id' element={<SinglePost/>} />
                            <Route path='/posts/likes' element={<Likes/>} />
                            <Route path='/userprofile' element={<UserProfile />} />
                        </Routes>
                    </Layout>
                </AuthProvider>
            </Router>
    </div>
  )
}

export default App
