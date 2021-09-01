import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isAuthenticated: false,
    id: null,
  });

  const setUserAuth = (userId, cb) => {
    setUser({ isAuthenticated: true, id: userId });

    if (cb) {
      setTimeout(cb, 100);
    }
  };

  const removeUserAuth = (cb) => {
    setUser({ isAuthenticated: false, id: null });

    if (cb) {
      setTimeout(cb, 100);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserAuth,
        removeUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
