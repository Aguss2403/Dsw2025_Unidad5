import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login } from '../services/login';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return Boolean(token);
  });

  const [roles, setRoles] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const roleClaim = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role;
        return Array.isArray(roleClaim) ? roleClaim : [roleClaim];
      } catch (error) {
        console.error('Invalid token:', error);
        return [];
      }
    }
    return [];
  });

  const singout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRoles([]);
  };

  const singin = async (username, password) => {
    const { data, error } = await login(username, password);

    if (error) {
      return { error };
    }

    localStorage.setItem('token', data);
    setIsAuthenticated(true);

    try {
      const decoded = jwtDecode(data);
      const roleClaim = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role;
      setRoles(Array.isArray(roleClaim) ? roleClaim : [roleClaim]);
    } catch (e) {
      setRoles([]);
    }

    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        roles,
        singin,
        singout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthProvider,
  AuthContext,
};