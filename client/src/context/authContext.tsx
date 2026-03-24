import { getMe, logutFuntion } from "@/services/authServices";
import React, { useState, useContext, createContext, useEffect } from "react";

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
  loading:boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await getMe();
        setUser(result);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        return error.message;
      }
    };
    getUser();
  }, []);
  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    logutFuntion()
    setUser(null);
  };
  return (
    <AuthContext value={{ user, login, logout, isAuthenticated,loading }}>
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
