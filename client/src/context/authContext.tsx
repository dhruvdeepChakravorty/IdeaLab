import React, { useState, useContext, createContext } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}
interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!token;
  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext>
  );
};
 export const useAuth = ()=>{
  const context = useContext(AuthContext)
  if (context == null) {
     throw new Error("Context is Null")
  }
  return context
 }

