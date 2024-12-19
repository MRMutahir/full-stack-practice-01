"use client";

import { getLocalAccessToken, removeLocalAccessToken } from "@/utils/Auh";
import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({ value: {} });

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeToken = async () => {
      const storedToken = await getLocalAccessToken();
      if (storedToken) {
        setToken(storedToken);
      }
    };

    initializeToken();
  }, []);

  const login = async () => {
    const token = await getLocalAccessToken();
    if (!token) {
      router.push("/login");
    } else {
      setToken(token);
    }
  };

  const logout = () => {
    removeLocalAccessToken();
    setToken(null);
    router.push("/login");
  };

  const isLoggedIn = !!token;

  const value = {
    token,
    login,
    logout,
    isLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
