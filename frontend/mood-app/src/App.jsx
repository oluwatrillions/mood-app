import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Posts from './pages/Posts'
import Post from './pages/Post'

function App() {

  return (
      <div>
          <Layout>
              <Router>
                  <Routes>
                      <Route path='/' element={<Homepage />} />
                      <Route path='/signup' element={<SignUp/>} />
                      <Route path='/signin' element={<SignIn/>} />
                      <Route path='/create/post' element={<Post/>} />
                      <Route path='/posts' element={<Posts/>} />
                    </Routes>
                </Router>
          </Layout>
    </div>
  )
}

export default App
