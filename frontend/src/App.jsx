import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('wanas-theme') === 'dark'
  })

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
    localStorage.setItem('wanas-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <BrowserRouter>
      <Navbar dark={dark} setDark={setDark} />
      <Routes>
        <Route path="/" element={<Home dark={dark} />} />
        <Route path="/login" element={<Login dark={dark} />} />
        <Route path="/register" element={<Register dark={dark} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App