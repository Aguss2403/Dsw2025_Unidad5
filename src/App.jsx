import { createBrowserRouter, Outlet, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './modules/auth/context/AuthProvider';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import Dashboard from './modules/templates/components/Dashboard';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import ListOrdersPage from './modules/orders/pages/ListOrdersPage';
import Home from './modules/home/pages/Home';
import ListProductsPage from './modules/products/pages/ListProductsPage';
import CreateProductPage from './modules/products/pages/CreateProductPage';
import StorePage from './modules/store/pages/StorePage';
import CartPage from './modules/cart/pages/CartPage';
import { CartProvider } from './modules/cart/context/CartContext'; 


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <StorePage />,
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
          element: <Navigate to="/admin/home" replace />,
        },
        {
          path: 'home',
          element: <Home />,
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
