// AuthContext.js

import React, { useState, useContext } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const signIn = () => {
    // Perform your login authentication logic here
    // Set authenticated and isAdmin states accordingly
    setAuthenticated(true);
    setIsAdmin(true); // Assuming the user is an admin after successful login
  };

  const signOut = () => {
    // Perform logout logic here
    setAuthenticated(false);
    setIsAdmin(false);
  };

  const authContextValue = {
    authenticated,
    isAdmin,
    setAuthenticated, // Ensure these functions are provided in the context value
    setIsAdmin,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
