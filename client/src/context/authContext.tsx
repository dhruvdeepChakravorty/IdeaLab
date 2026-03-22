import React, { useState, useContext, createContext } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error("Context is Null");
  }
  return context;
};
