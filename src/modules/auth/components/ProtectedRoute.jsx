import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';

function ProtectedRoute({ children, roles }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.length > 0) {
    const hasRole = roles.some((role) => localStorage.getItem('role') == role);

    if (!hasRole) {
      return <Navigate to="/login" />;
    }
  }

  return children;
}

export default ProtectedRoute;
