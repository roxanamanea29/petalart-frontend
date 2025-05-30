import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import emailjs from "@emailjs/browser";

emailjs.init('CI45b8UMxUYMyNhFT')
console.log('EmailJS ready:', emailjs);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
