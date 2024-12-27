import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const navigate = useNavigate();

  const getApiUrl = (endpoint) => {
    const baseUrl = 
    process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:5001";
    return `${baseUrl}${endpoint}`
  }

  useEffect(() => {
    const checkAuthAndIP = async () => {
      const token = localStorage.getItem("admToken");
      console.log("token present:", token)

      if (!token) {
        setIsAuthenticated(false);
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        // Verify token validity
        const tokenVerifyApi = getApiUrl("/api/admin/verify-token");
        await axios.get(tokenVerifyApi, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Verify IP
        const ipVerifyApi = getApiUrl("/api/admin/validate-access");
        const response = await axios.get(ipVerifyApi);
        if (response.data.access) {
          setIsAuthenticated(true); // User is authenticated and allowed
        } else {
          setIsAuthenticated(false);
          alert("Access denied. Unauthorized machine.");
          navigate("/login"); // Redirect if IP is not allowed
        }
      } catch (error) {
        console.error("Authentication/IP check failed:", error);
        setIsAuthenticated(false);
        navigate("/login"); // Redirect on error
      }
    };

    checkAuthAndIP();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Show loading state
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering of children if not authenticated
  }

  return <>{children}</>; // Render the protected page
};

export default ProtectedRoute;
