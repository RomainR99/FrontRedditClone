import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PostProvider } from './components/PostContext.jsx'
import './index.css'
import './Connexion.css'
import { CommentProvider } from './components/CommentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>
      <CommentProvider>
        <App />
      </CommentProvider>
    </PostProvider>
  </StrictMode>,
)
