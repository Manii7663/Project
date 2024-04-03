import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {

    const [theme, setTheme] = useState('dark');


    const toggleTheme = () => {
        if(theme === 'dark') setTheme('light')
        else setTheme('dark');
    }


  return (
    <AuthContext.Provider value={{ theme,  toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
