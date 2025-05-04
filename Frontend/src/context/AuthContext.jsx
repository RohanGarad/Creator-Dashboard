import React, { createContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Default state for user is null

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token or call an API to fetch user data using token
      setUser({ token });  // Example: store user data or just the token
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
