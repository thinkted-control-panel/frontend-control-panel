"use client";

import { usePathname, useRouter } from "next/navigation";
import TopBar from "./navbar";
import SideBar, { ActiveKey } from "./sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Mapear rota para chave ativa no sidebar
  let activeKey: ActiveKey | null = null;
  if (pathname === "/" || pathname === "/dashboard") {
    activeKey = "dashboard";
  } else if (pathname === "/usuarios/admins") {
    activeKey = "geral_usuario_admins";
  } else if (pathname.startsWith("/sistemas/thinklib/aprovacoes")) {
    activeKey = "thinklib_aprovacoes";
  } else if (pathname.startsWith("/sistemas/thinklib/itens")) {
    activeKey = "thinklib_itens";
  } else if (pathname.startsWith("/sistemas/gameted/aprovacoes")) {
    activeKey = "gameted_aprovacoes";
  }

  const handleNavigate = (key: ActiveKey) => {
    if (key === "dashboard") {
      router.push("/dashboard");
    } else if (key === "geral_usuario_admins") {
      router.push("/usuarios/admins");
    } else if (key === "thinklib_aprovacoes") {
      router.push("/sistemas/thinklib/aprovacoes");
    } else if (key === "thinklib_itens") {
      router.push("/sistemas/thinklib/itens");
    } else if (key === "gameted_aprovacoes") {
      router.push("/sistemas/gameted/aprovacoes");
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <div className="shrink-0">
          <SideBar activeKey={activeKey} onNavigate={handleNavigate} />
        </div>

        <main className="flex-1 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
