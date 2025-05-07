import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './Connexion.css'
import { PostProvider } from './components/PostContext.jsx'   

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>
      <App />
    </PostProvider>
  </StrictMode>,
)
