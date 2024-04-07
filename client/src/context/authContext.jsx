// AuthContext.js
import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [User,setUser]=useState(null)

  useEffect(() => {
    // Check if userId is already logged in
    const userId = localStorage.getItem('user');
    console.log("context",userId)
    const fetchUserData = async () => {
      try {
          const response = await axios.get(`http://localhost:3001/get-user/${userId}`);
          setUser(response.data);
      } catch (error) {
          console.error('Error fetching userId data:', error);
      }
  };
    if (userId != null) {
      fetchUserData();
      setIsAuthenticated(!isAuthenticated);
    }
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated,User,setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing authentication status
const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
