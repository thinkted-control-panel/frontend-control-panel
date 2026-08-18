"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/SearchInput";
import { GenericTable, type TableColumn } from "@/components/GenericTable";
import { CircleCheck, CircleMinus, CircleX } from "lucide-react";
import { Breadcrumb } from '@/components/Breadcrumb';

interface GameUpdateApprovalItem {
  id: string;
  name: string;
  user: string;
  subject: string;
  category: string;
  description: string;
  dateTime: string;
  status: "Pendente" | "Aprovado" | "Reprovado";
  presentationText?: string;
  detailedDescription?: string;
}

export default function GameTedAprovacoesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"jogos" | "atualizacoes">("atualizacoes");
  const [searchTerm, setSearchTerm] = useState("");

  const mockAtualizacoes: GameUpdateApprovalItem[] = [
    {
      id: "g1",
      name: "Avalanche Silábica...",
      user: "Cleidiana Alves...",
      subject: "Português e Plat...",
      category: "Digital",
      description: "-",
      dateTime: "18/04/2026 20:00",
      status: "Pendente",
      presentationText: "-",
      detailedDescription: "-",
    },
    {
      id: "g2",
      name: "RabbitCode",
      user: "Izaque Rolim",
      subject: "Matemática e A...",
      category: "Digital",
      description: "-",
      dateTime: "17/04/2026 20:00",
      status: "Pendente",
      presentationText: "Jogo de introdução à lógica de programação.",
      detailedDescription: "Inclusão de novos desafios e suporte a comandos avançados.",
    },
    {
      id: "g3",
      name: "DecifrAdas: cara a cara...",
      user: "Julya Campos",
      subject: "Português e RP...",
      category: "Analógico",
      description: "-",
      dateTime: "16/04/2026 20:00",
      status: "Pendente",
      presentationText: "Jogo de cartas e adivinhação de palavras.",
      detailedDescription: "Ajuste de cartas e novas regras de rodadas.",
    },
    {
      id: "g4",
      name: "Hello Food",
      user: "Jeniffer Macena",
      subject: "Programação e ...",
      category: "Digital",
      description: "-",
      dateTime: "15/04/2026 20:00",
      status: "Pendente",
      presentationText: "Jogo interativo de nutrição e culinária.",
      detailedDescription: "Ajustes de receitas e interface.",
    },
    {
      id: "g5",
      name: "Numéria: A Ilha dos Nú...",
      user: "Cristiana Pedro...",
      subject: "Matemática e Pl...",
      category: "Digital",
      description: "-",
      dateTime: "14/04/2026 20:00",
      status: "Aprovado",
    },
    {
      id: "g6",
      name: "Yere e a Ilha Precisa",
      user: "Manuela Bastos",
      subject: "Português e RPG",
      category: "Digital",
      description: "-",
      dateTime: "14/04/2026 20:00",
      status: "Aprovado",
    },
    {
      id: "g7",
      name: "RabbitCode",
      user: "Izaque Rolim",
      subject: "Matemática e A...",
      category: "Digital",
      description: "-",
      dateTime: "13/04/2026 20:00",
      status: "Reprovado",
    },
    {
      id: "g8",
      name: "Fantasmafixo: um jogo...",
      user: "Flavia Brenda",
      subject: "Português e Plat...",
      category: "Digital",
      description: "-",
      dateTime: "12/02/2026 20:00",
      status: "Reprovado",
    },
    {
      id: "g9",
      name: "Optima Corporation",
      user: "Waldecir da Silv...",
      subject: "Programação e ...",
      category: "Digital",
      description: "-",
      dateTime: "12/02/2026 20:00",
      status: "Pendente",
    },
    {
      id: "g10",
      name: "Fantasmafixo: um jogo...",
      user: "Flavia Brenda...",
      subject: "Português e Plat...",
      category: "Digital",
      description: "-",
      dateTime: "12/02/2026 20:00",
      status: "Aprovado",
    },
    {
      id: "g11",
      name: "DecifrAdas: cara a cara",
      user: "Julya Campos",
      subject: "Ataque Corpo a...",
      category: "Analógico",
      description: "-",
      dateTime: "12/02/2026 20:00",
      status: "Reprovado",
    },
  ];

  const mockJogos: GameUpdateApprovalItem[] = [
    {
      id: "j1",
      name: "Avalanche Silábica...",
      user: "Cleidiana Alves...",
      subject: "Português e Plat...",
      category: "Digital",
      description: "-",
      dateTime: "10/04/2026 18:20",
      status: "Pendente",
    },
  ];

  const getStatusBadge = (status: "Pendente" | "Aprovado" | "Reprovado") => {
    switch (status) {
      case "Pendente":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#D97706] bg-[#FFFBEB] rounded-full border border-[#FEF3C7] font-poppins">
            <CircleMinus size={12} strokeWidth={3} />
            Pendente
          </span>
        );
      case "Aprovado":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#16A34A] bg-[#F0FDF4] rounded-full border border-[#DCFCE7] font-poppins">
            <CircleCheck size={12} strokeWidth={3} />
            Aprovado
          </span>
        );
      case "Reprovado":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#E02424] bg-[#FDF2F2] rounded-full border border-[#FDE8E8] font-poppins">
            <CircleX size={12} strokeWidth={3} />
            Reprovado
          </span>
        );
    }
  };

  const columns: TableColumn<GameUpdateApprovalItem>[] = [
    {
      key: "name",
      header: "Jogo",
      sortable: true,
      render: (item) => (
        <span className="text-[#0D0C0B] font-poppins font-normal">{item.name}</span>
      ),
    },
    {
      key: "user",
      header: "Usuário",
      sortable: true,
      render: (item) => (
        <span className="text-[#0D0C0B] font-poppins font-normal">{item.user}</span>
      ),
    },
    {
      key: "subject",
      header: "Disciplina",
      render: (item) => (
        <span className="text-[#5D657F] font-poppins font-normal">{item.subject}</span>
      ),
    },
    {
      key: "category",
      header: "Categoria",
      render: (item) => (
        <span className="text-[#5D657F] font-poppins font-normal">{item.category}</span>
      ),
    },
    {
      key: "description",
      header: "Descrição",
      render: (item) => (
        <span className="text-[#5D657F] font-poppins font-normal">{item.description}</span>
      ),
    },
    {
      key: "dateTime",
      header: "Data e hora",
      render: (item) => (
        <span className="text-[#5D657F] font-poppins font-normal">{item.dateTime}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      filterable: true,
      render: (item) => getStatusBadge(item.status),
    },
  ];

  const handleRowClick = (item: GameUpdateApprovalItem) => {
    router.push(`/sistemas/gameted/aprovacoes/edicao?id=${item.id}`);
  };

  return (
    <div className="pt-10 pb-10 px-[29.5px] flex flex-col gap-6 w-full bg-white min-h-screen">
      <Breadcrumb items={['Sistemas', 'GameTed', 'Aprovações']} />

      <div className="flex gap-6 border-b border-gray-200 -mb-2 mt-2">
        <button
          onClick={() => {
            setActiveTab("jogos");
            setSearchTerm("");
          }}
          className={`pb-3 text-xl font-medium font-poppins relative transition-all duration-200 ${
            activeTab === "jogos"
              ? "text-[#1D43BE]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Jogos
          {activeTab === "jogos" && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1D43BE] rounded-t-full"></span>
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab("atualizacoes");
            setSearchTerm("");
          }}
          className={`pb-3 text-xl font-medium font-poppins relative transition-all duration-200 ${
            activeTab === "atualizacoes"
              ? "text-[#1D43BE]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Atualizações
          {activeTab === "atualizacoes" && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1D43BE] rounded-t-full"></span>
          )}
        </button>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar"
          />
        </div>
      </div>

      <div className="mt-2">
        <GenericTable
          data={activeTab === "atualizacoes" ? mockAtualizacoes : mockJogos}
          columns={columns}
          searchTerm={searchTerm}
          itemsPerPage={10}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}
