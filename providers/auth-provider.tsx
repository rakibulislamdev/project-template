"use client";

import React, { useState, useEffect } from "react";
import { AuthContext, User } from "@/contexts/auth-context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might fetch user details from an API here
    // using the token stored in cookies.
    // For this mock template, we will read a 'user_info' cookie or localStorage.
    
    const initializeAuth = () => {
      try {
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(';').shift();
          return null;
        };

        const storedUser = getCookie("mock_user");
        if (storedUser) {
          setUser(JSON.parse(decodeURIComponent(storedUser)));
        }
      } catch (error) {
        console.error("Failed to load mock user", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const login = (newUser: User, token: string) => {
    setUser(newUser);
    
    // Store user data in a cookie (expires in 1 day)
    const userString = encodeURIComponent(JSON.stringify(newUser));
    document.cookie = `mock_user=${userString}; path=/; max-age=86400`;
    
    // Set the token
    document.cookie = `accessToken=${token}; path=/; max-age=86400`; // 1 day
  };

  const logout = () => {
    setUser(null);
    document.cookie = "mock_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
