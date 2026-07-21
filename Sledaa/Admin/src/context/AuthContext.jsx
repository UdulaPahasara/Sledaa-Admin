import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // Decode the JWT payload and check if it's expired
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
          // Token expired — clear it and force re-login
          localStorage.removeItem('jwt_token');
          navigate('/');
        } else {
          setUser({ role: 'admin' });
        }
      } catch (e) {
        // Malformed token — clear it
        localStorage.removeItem('jwt_token');
        navigate('/');
      }
    }
  }, []);

  const login = async (email, password) => {
    const result = await loginApi(email, password);
    if (result.success) {
      localStorage.setItem('jwt_token', result.data.token);
      setUser({ role: result.data.role, email: result.data.email });
      return { success: true };
    }
    return { success: false, message: result.message };
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
