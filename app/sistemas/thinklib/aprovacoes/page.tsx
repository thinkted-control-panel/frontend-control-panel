"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { SearchInput } from "@/components/SearchInput";
import { GenericTable, type TableColumn } from "@/components/GenericTable";

interface ApprovalItem {
  id: string;
  name: string;
  category: string;
  description: string;
  dateTime: string;
  status: "Pendente" | "Aprovado" | "Reprovado";
}

interface EditApprovalItem {
  id: string;
  name: string;
  user: string;
  category: string;
  description: string;
  dateTime: string;
  status: "Pendente" | "Aprovado" | "Reprovado";
}

export default function AprovacoesPage() {
  const [activeTab, setActiveTab] = useState<"mecanicas" | "edicao">(
    "mecanicas",
  );
  const [searchTerm, setSearchTerm] = useState("");

  const mockMecanicas: ApprovalItem[] = [
    {
      id: "1",
      name: "Ataque Corpo a Corpo",
      category: "Plataforma",
      description: "Mecânica de combate direto...",
      dateTime: "18/04/2026 20:00:12",
      status: "Pendente",
    },
    {
      id: "2",
      name: "Ataque Corpo a Corpo",
      category: "Point-and-Click",
      description: "Mecânica de combate direto...",
      dateTime: "17/04/2026 20:00:12",
      status: "Pendente",
    },
    {
      id: "3",
      name: "Ataque Corpo a Corpo",
      category: "Tower Defense",
      description: "Mecânica de combate direto...",
      dateTime: "16/04/2026 20:00:12",
      status: "Pendente",
    },
    {
      id: "4",
      name: "Ataque Corpo a Corpo",
      category: "Tower Defense",
      description: "Mecânica de combate direto...",
      dateTime: "15/04/2026 20:00:12",
      status: "Pendente",
    },
    {
      id: "5",
      name: "Ataque Corpo a Corpo",
      category: "Plataforma",
      description: "Mecânica de combate direto...",
      dateTime: "14/04/2026 20:00:12",
      status: "Aprovado",
    },
    {
      id: "6",
      name: "Ataque Corpo a Corpo",
      category: "Point-and-Click",
      description: "Mecânica de combate direto...",
      dateTime: "14/04/2026 20:00:12",
      status: "Aprovado",
    },
    {
      id: "7",
      name: "Ataque Corpo a Corpo",
      category: "Plataforma",
      description: "Mecânica de combate direto...",
      dateTime: "13/04/2026 20:00:12",
      status: "Reprovado",
    },
    {
      id: "8",
      name: "Ataque Corpo a Corpo",
      category: "Plataforma",
      description: "Mecânica de combate direto...",
      dateTime: "12/02/2026 20:00:12",
      status: "Reprovado",
    },
    {
      id: "9",
      name: "Ataque Corpo a Corpo",
      category: "Plataforma",
      description: "Mecânica de combate direto...",
      dateTime: "12/02/2026 20:00:12",
      status: "Pendente",
    },
  ];

  const mockEdicoes: EditApprovalItem[] = [
    {
      id: "e1",
      name: "Ataque Duplo",
      user: "Carlos M.",
      category: "Plataforma",
      description: "Mecânica de ataque consecutivo...",
      dateTime: "18/04/2026 21:10:00",
      status: "Pendente",
    },
    {
      id: "e2",
      name: "Salto Duplo",
      user: "Ana B.",
      category: "Plataforma",
      description: "Permite pular uma segunda vez no ar...",
      dateTime: "17/04/2026 15:30:12",
      status: "Pendente",
    },
    {
      id: "e3",
      name: "Dash Lateral",
      user: "Bruno K.",
      category: "Tower Defense",
      description: "Esquiva rápida para as laterais...",
      dateTime: "15/04/2026 09:20:45",
      status: "Aprovado",
    },
    {
      id: "e4",
      name: "Defesa de Escudo",
      user: "David L.",
      category: "Point-and-Click",
      description: "Bloqueia ataques frontais...",
      dateTime: "12/04/2026 14:15:22",
      status: "Reprovado",
    },
  ];

  const getCategoryDot = (category: string) => {
    let dotColor = "bg-gray-400";
    switch (category.toLowerCase()) {
      case "plataforma":
        dotColor = "bg-[#D83941]";
        break;
      case "point-and-click":
        dotColor = "bg-[#EAAE31]";
        break;
      case "tower defense":
        dotColor = "bg-[#1C64F2]";
        break;
    }
    return (
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
        <span className="text-[#5D657F] font-poppins">{category}</span>
      </div>
    );
  };

  const getStatusBadge = (status: "Pendente" | "Aprovado" | "Reprovado") => {
    switch (status) {
      case "Pendente":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#D97706] bg-[#FFFBEB] rounded-full border border-[#FEF3C7] font-poppins">
            Pendente
          </span>
        );
      case "Aprovado":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#16A34A] bg-[#F0FDF4] rounded-full border border-[#DCFCE7] font-poppins">
            Aprovado
          </span>
        );
      case "Reprovado":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#E02424] bg-[#FDF2F2] rounded-full border border-[#FDE8E8] font-poppins">
            Reprovado
          </span>
        );
    }
  };

  const mecanicasColumns: TableColumn<ApprovalItem>[] = [
    {
      key: "name",
      header: "Mecânica",
      sortable: true,
      render: (item) => (
        <span className="text-[#0D0C0B] font-poppins">{item.name}</span>
      ),
    },
    {
      key: "category",
      header: "Categoria",
      filterable: true,
      render: (item) => getCategoryDot(item.category),
    },
    {
      key: "description",
      header: "Descrição",
      render: (item) => (
        <span className="text-[#5D657F] font-poppins">{item.description}</span>
      ),
    },
    {
      key: "dateTime",
      header: "Data e hora",
      render: (item) => (
        <span className="text-[#5D657F] font-poppins">{item.dateTime}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      filterable: true,
      render: (item) => getStatusBadge(item.status),
    },
  ];

  const edicoesColumns: TableColumn<EditApprovalItem>[] = [
    {
      key: "name",
      header: "Mecânica",
      sortable: true,
      render: (item) => (
        <span className="text-[#0D0C0B] font-poppins">{item.name}</span>
      ),
    },
    {
      key: "user",
      header: "Usuário",
      sortable: true,
      render: (item) => (
        <span className="text-[#0D0C0B] font-poppins">{item.user}</span>
      ),
    },
    {
      key: "category",
      header: "Categoria",
      filterable: true,
      render: (item) => getCategoryDot(item.category),
    },
    {
      key: "description",
      header: "Descrição",
      render: (item) => (
        <span className="text-[#5D657F] font-poppins">{item.description}</span>
      ),
    },
    {
      key: "dateTime",
      header: "Data e hora",
      render: (item) => (
        <span className="text-[#5D657F] font-poppins">{item.dateTime}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      filterable: true,
      render: (item) => getStatusBadge(item.status),
    },
  ];

  return (
    <div className="pt-10 pb-10 px-[29.5px] flex flex-col gap-6 w-full bg-white">
      <div className="text-xs text-[#8E95A5] font-poppins -mb-2">
        Sistemas <span className="mx-1">/</span> ThinkLib{" "}
        <span className="mx-1">/</span>{" "}
        <span className="font-semibold text-gray-700">Aprovações</span>
      </div>

      <div className="flex gap-6 border-b border-gray-200 -mb-2 mt-2">
        <button
          onClick={() => {
            setActiveTab("mecanicas");
            setSearchTerm("");
          }}
          className={`pb-3 text-xl font-medium font-poppins relative transition-all duration-200 ${
            activeTab === "mecanicas"
              ? "text-[#1D43BE]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Mecânicas
          {activeTab === "mecanicas" && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1D43BE] rounded-t-full"></span>
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab("edicao");
            setSearchTerm("");
          }}
          className={`pb-3 text-xl font-medium font-poppins relative transition-all duration-200 ${
            activeTab === "edicao"
              ? "text-[#1D43BE]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Edição
          {activeTab === "edicao" && (
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
        {activeTab === "mecanicas" ? (
          <GenericTable
            data={mockMecanicas}
            columns={mecanicasColumns}
            searchTerm={searchTerm}
            itemsPerPage={11}
          />
        ) : (
          <GenericTable
            data={mockEdicoes}
            columns={edicoesColumns}
            searchTerm={searchTerm}
            itemsPerPage={11}
          />
        )}
      </div>
    </div>
  );
}
