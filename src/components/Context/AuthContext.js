"use client"; // Required for Next.js client components

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

// Create AuthContext
const AuthContext = createContext();

// Utility to get a specific cookie value
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

// Create the Provider component
export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Admin state
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  // Check cookie on page load to restore login state
  useEffect(() => {
    const authTrue = getCookie("authTrue");
    if (authTrue) {
      setIsAdmin(true);
    }
    setLoading(false); // Done checking cookies
  }, []);

  // Function to handle login
  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      setIsAdmin(true);
      document.cookie = "authTrue=true; path=/;"; // Set cookie
      router.push("/admin_pages/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  // Function to handle logout
  const logout = () => {
    setIsAdmin(false);
    document.cookie =
      "authTrue=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Delete cookie
    router.push("/login"); // Redirect to login
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useLogin = () => useContext(AuthContext);
