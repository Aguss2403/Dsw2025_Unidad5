import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';

function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, roles: userRoles } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (roles && roles.length > 0) {
    const hasRole = roles.some(role => userRoles.includes(role));
    if (!hasRole) {
      return <Navigate to='/login' />;
    }
  }

  return children;
};

export default ProtectedRoute;
