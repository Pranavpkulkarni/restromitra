import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app'
// import RestroMitra from './restromitra (1)'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <RestroMitra /> */}
    <App/>
  </StrictMode>,
)