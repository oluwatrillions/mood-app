import Footer from './components/Footer'
import Header from './components/Header'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {

  return (
      <div>
          <Layout>
              <Homepage />
          </Layout>
    </div>
  )
}

export default App
