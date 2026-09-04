"use client";

import { createContext, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";

const PUBLIC_ROUTES = ["/login"];

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
  user: Session["user"] | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus>
      <AuthSessionBridge>{children}</AuthSessionBridge>
    </SessionProvider>
  );
}

function AuthSessionBridge({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const token = session?.accessToken ?? null;

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
    }

    if (isAuthenticated && isPublicRoute) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, isPublicRoute, router]);

  const setToken = (newToken: string) => {
    if (newToken) {
      signIn("keycloak", { redirectTo: "/dashboard" });
    }
  };

  const logout = async () => {
    let logoutUrl = "/login";

    try {
      const response = await fetch("/api/auth/keycloak-logout-url");
      const data = (await response.json()) as { logoutUrl?: string };
      logoutUrl = data.logoutUrl ?? logoutUrl;
    } catch {
      logoutUrl = "/login";
    }

    sessionStorage.removeItem("hasSeenPasswordPopup");
    await signOut({ redirect: false });
    window.location.href = logoutUrl;
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
        session,
        user: session?.user ?? null,
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
