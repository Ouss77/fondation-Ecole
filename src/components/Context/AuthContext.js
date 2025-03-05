"use client"; 
import { createContext, useState, useContext, useEffect } from "react"; 
import { useRouter } from "next/router"; 

const AuthContext = createContext();

const getCookie = (name) => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authToken = getCookie("authToken");
    setIsAdmin(!!authToken);
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        // document.cookie = `authToken=true; path=/; max-age=3600; Secure; HttpOnly`;
        document.cookie = `authToken=true; path=/; max-age=3600; Secure`;

        setIsAdmin(true);
        router.push("/admin_pages/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('There was an error logging in. Please try again.');
    }
  };

  const logout = () => {
    setIsAdmin(false);
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLogin = () => useContext(AuthContext);
