import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './modules/auth/context/AuthProvider';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import Dashboard from './modules/templates/components/Dashboard';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import ListOrdersPage from './modules/orders/pages/ListOrdersPage';
import DashboardPage from './modules/home/pages/DashboardPage';
import ListProductsPage from './modules/products/pages/ListProductsPage';
import CreateProductPage from './modules/products/pages/CreateProductPage';
<<<<<<< HEAD
import CatalogPage from './modules/shop/pages/CatalogPage';
=======
import StorePage from './modules/store/pages/StorePage';
import CartPage from './modules/cart/pages/CartPage';
import { CartProvider } from './modules/cart/context/CartContext';
>>>>>>> 3ce98c12c468710d559cd7d63c889f5a5c3c99c7

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
<<<<<<< HEAD
      element: <><Outlet /></>,
      children: [
        {
          index: true,
          element: <CatalogPage />,
        },
        {
          path: '/cart',
          element: <>Carrito de compras</>,
        },
      ],
=======
      element: <StorePage />,
>>>>>>> 3ce98c12c468710d559cd7d63c889f5a5c3c99c7
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute roles={['admin']}>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/admin/dashboard" replace />,
        },
        {
          path: 'dashboard',
          element: <DashboardPage />,
        },
        {
          path: 'products',
          element: <ListProductsPage />,
        },
        {
          path: 'products/create',
          element: <CreateProductPage />,
        },
        {
          path: 'orders',
          element: <ListOrdersPage />,
        },
      ],
    },
    {
      path: '/cart',
      element: <CartPage />,
    },
  ]);


  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
