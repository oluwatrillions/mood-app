import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {GoogleOAuthProvider} from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='1017090253744-3lhf17dd38v83nd3n6finh7n37pg0m2a.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
