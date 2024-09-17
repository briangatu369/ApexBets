import React, { createContext, useState } from "react";
import { ACCOUNTS } from "../Data/constants";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [currentAccount, setCurrentAccount] = useState(ACCOUNTS.REAL);

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userDetails,
        setUserDetails,
        currentAccount,
        setCurrentAccount,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
