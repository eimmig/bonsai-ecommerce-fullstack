import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth-store';
import { ROUTES } from '@/constants/routes';

// Lazy load pages for code splitting
const HomePage = lazy(() =>
  import('@/features/home').then((module) => ({ default: module.HomePage }))
);
const ProductsPage = lazy(() =>
  import('@/features/products').then((module) => ({
    default: module.ProductsPage,
  }))
);
const ProductDetailPage = lazy(() =>
  import('@/features/products').then((module) => ({
    default: module.ProductDetailPage,
  }))
);
const AboutPage = lazy(() =>
  import('@/features/about').then((module) => ({ default: module.AboutPage }))
);
const LoginPage = lazy(() =>
  import('@/features/auth').then((module) => ({ default: module.LoginPage }))
);
const CartPage = lazy(() =>
  import('@/features/cart').then((module) => ({ default: module.CartPage }))
);
const CheckoutPage = lazy(() =>
  import('@/features/checkout').then((module) => ({
    default: module.CheckoutPage,
  }))
);
const OrdersPage = lazy(() =>
  import('@/features/orders').then((module) => ({
    default: module.OrdersPage,
  }))
);
const OrderDetailPage = lazy(() =>
  import('@/features/orders/pages/OrderDetailPage').then((module) => ({
    default: module.OrderDetailPage,
  }))
);
const ProfilePage = lazy(() =>
  import('@/features/profile').then((module) => ({
    default: module.ProfilePage,
  }))
);

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.LOGIN} />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path={ROUTES.CART}
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.CHECKOUT}
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ORDERS}
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  );
};
