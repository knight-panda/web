import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import AdminDashboard from "./layouts/admin/AdminDashboard"
import OrdersAdmin from "./pages/admin/orders/OrdersAdmin"
import OrderDetailsAdmin from "./pages/admin/orders/OrderDetailsAdmin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          {/* Default page when visiting /admin
          <Route index element={<Orders />} /> 
          
          {/* Child routes */}
          {/* <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} /> */}

          <Route index element={<OrdersAdmin />} />
          <Route path="/admin-dashboard/orders/:orderId" element={<OrderDetailsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
