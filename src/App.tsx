import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import AdminDashboard from "./pages/admin/AdminDashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
