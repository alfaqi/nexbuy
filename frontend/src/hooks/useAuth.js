import { useState } from "react";
import { login, register } from "@/services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const handleRegister = async (userData) => {
    const data = await register(userData);
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, handleLogin, handleRegister, handleLogout };
};
