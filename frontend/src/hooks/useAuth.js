import { useState, useEffect } from "react";
import { login, register } from "@/services/authService";
import { useUserStore } from "@/store/users";

export const useAuth = () => {
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle login
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      console.log("data:", data);
      localStorage.setItem("user", JSON.stringify(data.user));
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
      localStorage.setItem("user", JSON.stringify(data.user));
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
    localStorage.removeItem("user");
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
