"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isTokenValid } from "@/utils/jwt";

const PUBLIC_ROUTES = ["/login"];

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (isTokenValid(storedToken)) {
      setTokenState(storedToken);
    } else {
      localStorage.removeItem("authToken");
      setTokenState(null);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
    }

    if (isAuthenticated && isPublicRoute) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isPublicRoute, isLoading, router]);

  const setToken = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.removeItem("hasSeenPasswordPopup");
    setTokenState(null);
    router.replace("/login");
  };

  
  const canRenderChildren = isPublicRoute ? !isAuthenticated : isAuthenticated;

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {isLoading || !canRenderChildren ? (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center text-gray-600">Carregando...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
