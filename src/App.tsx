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
import MyProfile from "./pages/user/profile/MyProfile"
import ProductDetailsPage from "./pages/user/products/ProductDetailsPage"
import CartPage from "./pages/user/cartPage/CartPage"
import AuthLayout from "./layouts/auth/AuthLayout"
import RegisterPage from "./pages/auth/RegisterPage"
import LoginPage from "./pages/auth/LoginPage"
import VerifyOtpPage from "./pages/auth/VerifyOtpPage"
import NewPasswordPage from "./pages/auth/NewPasswordPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Home />} />

        </Route>
        <Route path="/:store-name" element={<MainLayout />}>
          <Route path="/:store-name/login" element={<LoginPage />} />
          <Route path="/:store-name/register" element={<RegisterPage />} />
          <Route path="/:store-name/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/:store-name/new-password" element={<NewPasswordPage />} />

          <Route index element={<Home />} />
          <Route path="/:store-name/cart" element={<CartPage />} />
          <Route path="/:store-name/product/:productId" element={<ProductDetailsPage />} />

          <Route path="/:store-name/account" element={<AccountPage />}>

            <Route path="/:store-name/account/my-orders" element={<Orders />} />
            <Route path="/:store-name/account/my-orders/:orderId" element={<OrderDetails />} />

            <Route path="/:store-name/account/my-profile" element={<MyProfile />} />
            <Route index element={<MyProfile />} />
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
