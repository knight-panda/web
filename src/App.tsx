import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

/* =========================
   Lazy Imports
========================= */

/* layouts */
const MainLayout = lazy(() => import("./layouts/user/MainLayout"));
const AdminLayout = lazy(() => import("./layouts/admin/AdminLayout"));
const AdminDashboardLayout = lazy(() => import("./layouts/admin/AdminDashboardLayout"));
const AdminStoreLayout = lazy(() => import("./layouts/admin/AdminStoreLayout"));

/* auth */
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const VerifyOtpPage = lazy(() => import("./pages/auth/VerifyOtpPage"));
const NewPasswordPage = lazy(() => import("./pages/auth/NewPasswordPage"));

/* user */
const Home = lazy(() => import("./pages/user/home/Home"));
const CartPage = lazy(() => import("./pages/user/cartPage/CartPage"));
const ProductDetailsPage = lazy(() => import("./pages/user/products/ProductDetailsPage"));
const AccountPage = lazy(() => import("./pages/user/account/AccountPage"));
const Orders = lazy(() => import("./pages/user/order/Orders"));
const OrderDetails = lazy(() => import("./pages/user/order/OrderDetails"));
const MyProfile = lazy(() => import("./pages/user/profile/MyProfile"));

/* admin */
const AdminDashboard = lazy(() => import("./pages/admin/dashboard/AdminDashboard"));
const OrdersAdmin = lazy(() => import("./pages/admin/orders/OrdersAdmin"));
const OrderDetailsAdmin = lazy(() => import("./pages/admin/orders/OrderDetailsAdmin"));
const CarouselAdmin = lazy(() => import("./pages/store/carousel/CarouselAdmin"));
const ProductsAdmin = lazy(() => import("./pages/admin/products/ProductsAdmin"));
const AddUpdateProduct = lazy(() => import("./pages/admin/products/AddUpdateProduct"));

/* ========================= */

function getHostInfo() {
  const host = window.location.hostname;
  const cleanHost = host.replace("www.", "");
  const parts = cleanHost.split(".");

  const MAIN_DOMAIN = "crazoweb.com";

  // localhost
  if (host.includes("localhost")) {
    return {
      isMainDomain: parts.length === 1,
      storeName: parts.length > 1 ? parts[0] : null,
    };
  }

  // MAIN DOMAIN (admin / landing)
  if (cleanHost === MAIN_DOMAIN) {
    return {
      isMainDomain: true,
      storeName: null,
    };
  }

  // SUBDOMAIN → abc.crazoweb.com
  if (cleanHost.endsWith("." + MAIN_DOMAIN)) {
    return {
      isMainDomain: false,
      storeName: parts[0],
    };
  }

  // CUSTOM DOMAIN → knightpanda.in
  return {
    isMainDomain: false,
    storeName: cleanHost,
  };
}

function App() {
  const { isMainDomain, storeName } = getHostInfo();

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="app-loader">Loading...</div>}>
        <Routes>

          {/* ================= MAIN DOMAIN (xyz.com) ================= */}
          {isMainDomain && (
            <>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <AdminLayout />
                  </PublicRoute>
                }
              />

              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<OrdersAdmin />} />
                <Route path="orders/:orderId" element={<OrderDetailsAdmin />} />
                <Route path="carousels" element={<CarouselAdmin />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="products/:productId" element={<AddUpdateProduct />} />
              </Route>

              <Route
                path="/edit-store"
                element={
                  <ProtectedRoute>
                    <AdminStoreLayout />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {/* ================= SUBDOMAIN (storename.xyz.com) ================= */}
          {storeName && (
            <Route path="/" element={<MainLayout />}>
              {/* auth */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="verify-otp" element={<VerifyOtpPage />} />
              <Route path="new-password" element={<NewPasswordPage />} />

              {/* pages */}
              <Route index element={<Home />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="product/:productId" element={<ProductDetailsPage />} />

              {/* account */}
              <Route path="account" element={<AccountPage />}>
                <Route index element={<MyProfile />} />
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="my-orders" element={<Orders />} />
                <Route path="my-orders/:orderId" element={<OrderDetails />} />
              </Route>
            </Route>
          )}

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;