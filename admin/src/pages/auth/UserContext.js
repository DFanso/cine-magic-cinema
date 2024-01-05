import React, { createContext, useContext, useState } from "react";

// Create Context
export const UserContext = createContext({
  userData: null,
  setUserData: () => {},
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Global loading state

  // Function to update user data
  const updateUserData = (data) => {
    setUserData(data);
  };

  // Function to set loading state
  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  return (
    <UserContext.Provider
      value={{ userData, updateUserData, isLoading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUserContext = () => useContext(UserContext);
