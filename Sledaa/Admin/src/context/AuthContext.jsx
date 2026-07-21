import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists on load
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // In a real app, verify the token. Here we just set a mock user.
      setUser({ role: 'admin' });
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
