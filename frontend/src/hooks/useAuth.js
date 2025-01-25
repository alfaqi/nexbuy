import { useState, useEffect } from "react";
import { login, register } from "@/services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if the user is already logged in on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token:", token);

    if (token) {
      // If a token exists, assume the user is logged in
      // You can optionally fetch user data here if needed
      setUser({}); // Set a placeholder user object
    }
  }, []);

  // Handle login
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      setUser(data.user);
      return true;
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle registration
  const handleRegister = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await register(userData);
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return {
    user,
    isLoading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
