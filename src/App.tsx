import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import AdminDashboard from "./layouts/admin/AdminDashboard"
import OrdersAdmin from "./pages/admin/orders/OrdersAdmin"
import OrderDetailsAdmin from "./pages/admin/orders/OrderDetailsAdmin"
import ProductsAdmin from "./pages/admin/products/ProductsAdmin"
import AddUpdateProduct from "./pages/admin/products/AddUpdateProduct"
import MainLayout from "./layouts/user/MainLayout"
import AccountPage from "./pages/user/account/AccountPage"
import Orders from "./pages/user/order/Orders"
import Home from "./pages/user/home/Home"
import OrderDetails from "./pages/user/order/OrderDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="account" element={<AccountPage />}>

            <Route path="/account/my-orders" element={<Orders />} />
            <Route path="/account/my-orders/:orderId" element={<OrderDetails />} />
          </Route>
        </Route>

        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          {/* Default page when visiting /admin
          <Route index element={<Orders />} /> 
          
          {/* Child routes */}
          <Route path="orders" element={<OrdersAdmin />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="/admin-dashboard/products/:productsId" element={<AddUpdateProduct />} />

          <Route index element={<OrdersAdmin />} />
          <Route path="/admin-dashboard/orders/:orderId" element={<OrderDetailsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
