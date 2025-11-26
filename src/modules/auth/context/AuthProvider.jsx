import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login } from "../services/login";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return Boolean(token);
  });

  const singout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const singin = async (username, password) => {
    const { data, error } = await login(username, password);

    if (error) {
      return { error };
    }

    const {
      token,
      firstName,
      username: returnedUsername,
      role,
      lastName,
      email,
      phoneNumber,
      address,
      customerId,
      id,
    } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("name", firstName || returnedUsername);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("address", address);
    localStorage.setItem("customerId", customerId);
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);

    setIsAuthenticated(true);
    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        singin,
        singout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
