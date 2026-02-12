"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setTokenState(storedToken);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !token && pathname !== "/login") {
      router.push("/login");
    }
    if (!isLoading && token && pathname === "/login") {
      router.push("/dashboard");
    }
  }, [token, pathname, router, isLoading]);

  const setToken = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.removeItem("hasSeenPasswordPopup");
    setTokenState(null);
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
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
