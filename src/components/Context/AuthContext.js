"use client"; // Required for Next.js client components

import { createContext, useState, useContext, useEffect, use } from "react";
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
  // const login = (username, password) => {
  //   if (username === "admin" && password === "admin") {
  //     setIsAdmin(true);
  //     document.cookie = "authTrue=true; path=/;"; // Set cookie
  //     router.push("/admin_pages/dashboard"); // Redirect to dashboard
  //   } else {
  //     alert("Invalid credentials. Please try again.");
  //   }
  // };

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost/AF3M-Backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (data.success) {
        document.cookie = "authTrue=true; path=/;"; // Set cookie
        setIsAdmin(true);
        router.push("/admin_pages/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      alert('There was an error logging in: ' + error.message);
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
