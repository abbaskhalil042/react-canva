import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CanvaPage from './components/CanvaPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/canva" element={<CanvaPage />} />
    </Routes>
  </Router>,

  </StrictMode>,
)

