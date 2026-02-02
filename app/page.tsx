import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <NavBar />

      {/* Conteúdo */}
      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        <main className="flex-1 bg-[#F8FAFC] p-6">
          {/* aqui vai seu dashboard depois */}
        </main>
      </div>
    </div>
  );
}
