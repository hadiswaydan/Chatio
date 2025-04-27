import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../services/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setUsername(username?.trim().toLowerCase());
      await login(username);
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout(username);
      localStorage.removeItem("username");
      setUsername("");
      setIsLoggedIn(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage
      .getItem("username")
      ?.trim()
      ?.toLowerCase();
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/chat");
    } else {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <UserContext.Provider
      value={{ username, setUsername, handleLogin, handleLogout, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
