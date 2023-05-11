import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const token = 'token';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

   const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem(token));

   const login = useCallback(() => {
      // window.localStorage.setItem(token, id_token); id_token
      setIsAuthenticated(true);
   }, []);

   const logout = useCallback(() => {
      window.localStorage.removeItem(token, true);
      setIsAuthenticated(false);
   }, []);

   const value = useMemo(
      () => ({
         login,
         logout,
         isAuthenticated
      }),
      [isAuthenticated, login, logout]
   );

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

export const useAuthContext = () => {
   return useContext(AuthContext);
}