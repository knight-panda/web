import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import UserProtectedRoute from "./routes/UserProtectedRoute";
import UserPublicRoute from "./routes/UserPublicRoute";
import AppShimmer from "./components/shimmer/AppShimmer";

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
const PrivacyPolicyPage = lazy(() => import("./pages/user/policy/PrivacyPolicyPage"));
const RefundPolicyPage = lazy(() => import("./pages/user/policy/RefundPolicyPage"));
const ShippingPolicyPage = lazy(() => import("./pages/user/policy/ShippingPolicyPage"));
const TermsPage = lazy(() => import("./pages/user/policy/TermsPage"));
const CourseDetailsPage = lazy(() => import("./pages/user/course/CourseDetailsPage"));

/* admin */
const AdminDashboard = lazy(() => import("./pages/admin/dashboard/AdminDashboard"));
const OrdersAdmin = lazy(() => import("./pages/admin/orders/OrdersAdmin"));
const OrderDetailsAdmin = lazy(() => import("./pages/admin/orders/OrderDetailsAdmin"));
const StoreSettings = lazy(() => import("./pages/admin/storeSettings/StoreSettings"));
const StoreInformation = lazy(() => import("./pages/admin/storeInformation/StoreInformation"));
const CarouselAdmin = lazy(() => import("./pages/store/carousel/CarouselAdmin"));
const ProductsAdmin = lazy(() => import("./pages/admin/products/ProductsAdmin"));
const AddUpdateProduct = lazy(() => import("./pages/admin/products/AddUpdateProduct"));
const AdminProfile = lazy(() => import("./pages/admin/adminProfile/AdminProfile"));
const StoreDomain = lazy(() => import("./pages/admin/storeDomain/StoreDomain"));
const AdminBlogSection = lazy(() => import("./pages/admin/adminBlog/AdminBlogSection"));
const StoreReels = lazy(() => import("./pages/admin/storeReels/StoreReels"));

/* ai store */
const AiStoreLayout = lazy(() => import("./layouts/aiStore/AiStoreLayout"));

/* ========================= */

function getHostInfo() {
  let host = window.location.hostname.toLowerCase();

  // remove www safely
  host = host.replace(/^www\./, "");

  const parts = host.split(".");
  const MAIN_DOMAIN = "crazoweb.com";

  if (host.includes("localhost") || host === "127.0.0.1") {
    return {
      isMainDomain: parts.length === 1,
      storeName: parts.length > 1 ? parts[0] : null,
    };
  }

  // 2. MAIN DOMAIN
  if (host === MAIN_DOMAIN) {
    return {
      isMainDomain: true,
      storeName: null,
    };
  }

  // 3. SUBDOMAIN (abc.crazoweb.com)
  if (host.endsWith("." + MAIN_DOMAIN)) {
    const subdomain = host.replace("." + MAIN_DOMAIN, "");

    return {
      isMainDomain: false,
      storeName: subdomain,
    };
  }

  // 4. CUSTOM DOMAIN
  return {
    isMainDomain: false,
    storeName: host,
  };
}

function App() {
  const { isMainDomain, storeName } = getHostInfo();

  return (
    <BrowserRouter>
      <Suspense fallback={<AppShimmer />}>
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
                <Route path="profile" element={<AdminProfile />} />
                <Route path="orders" element={<OrdersAdmin />} />
                <Route path="orders/:orderId" element={<OrderDetailsAdmin />} />
                <Route path="store-settings" element={<StoreSettings />} />
                <Route path="store-information" element={<StoreInformation />} />
                <Route path="blogs" element={<AdminBlogSection />} />
                <Route path="reels" element={<StoreReels />} />
                <Route path="store-domain" element={<StoreDomain />} />
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
              <Route
                path="login"
                element={
                  <UserPublicRoute>
                    <LoginPage />
                  </UserPublicRoute>
                }
              />

              <Route
                path="register"
                element={
                  <UserPublicRoute>
                    <RegisterPage />
                  </UserPublicRoute>
                }
              />

              <Route
                path="verify-otp"
                element={
                  <UserPublicRoute>
                    <VerifyOtpPage />
                  </UserPublicRoute>
                }
              />
              <Route path="new-password" element={<NewPasswordPage />} />

              {/* pages */}
              <Route index element={<Home />} />
              <Route
                path="cart"
                element={
                  <UserProtectedRoute>
                    <CartPage />
                  </UserProtectedRoute>
                }
              />
              <Route path="product/:productId" element={<ProductDetailsPage />} />
              <Route path="course/:courseId" element={<CourseDetailsPage />} />

              {/* account */}
              <Route
                path="account"
                element={
                  <UserProtectedRoute>
                    <AccountPage />
                  </UserProtectedRoute>
                }
              >
                <Route index element={<MyProfile />} />
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="my-orders" element={<Orders />} />
                <Route path="my-orders/:orderId" element={<OrderDetails />} />
              </Route>
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="refund-policy" element={<RefundPolicyPage />} />
              <Route path="shipping-policy" element={<ShippingPolicyPage />} />
              <Route path="terms" element={<TermsPage />} />
            </Route>
          )}

          {/* ================= AI STORE ================= */}
          <Route path="/ai-store" element={<AiStoreLayout />}></Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;