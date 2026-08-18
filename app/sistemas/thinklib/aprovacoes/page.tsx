"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/SearchInput";
import { GenericTable, type TableColumn } from "@/components/GenericTable";
import { CircleCheck, CircleMinus, CircleX } from "lucide-react";
import * as MechanicService from "@/services/thinklib/MechanicService";
import type { ApprovalStatus } from "@/interfaces/thinklib/IMechanic";

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

function fmtDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
  } catch {
    return iso;
  }
}

function toStatusLabel(status?: ApprovalStatus): "Pendente" | "Aprovado" | "Reprovado" {
  if (status === "Approved") return "Aprovado";
  if (status === "Rejected") return "Reprovado";
  return "Pendente";
}

export default function AprovacoesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"mecanicas" | "edicao">(
    "mecanicas",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mecanicas, setMecanicas] = useState<ApprovalItem[]>([]);
  const [edicoes, setEdicoes] = useState<EditApprovalItem[]>([]);

  const loadMecanicas = useCallback(async () => {
    const res = await MechanicService.getMechanics({ pageNumber: 1, pageSize: 100 });
    const fullMechanics = await Promise.all(
      (res.items ?? []).map((m) => MechanicService.getMechanicById(m.id))
    );
    const items: ApprovalItem[] = fullMechanics.map((m) => ({
      id: m.id,
      name: m.name ?? "",
      category: m.categoryName ?? "",
      description: m.description ?? "",
      dateTime: fmtDate(m.createdAt),
      status: toStatusLabel(m.approvalStatus),
    }));
    items.sort((a, b) => (a.dateTime < b.dateTime ? 1 : -1));
    setMecanicas(items);
  }, []);

  const loadEdicoes = useCallback(async () => {
    const res = await MechanicService.getMechanicEditRequests({ pageNumber: 1, pageSize: 100 });
    const items: EditApprovalItem[] = (res.items ?? []).map((e) => ({
      id: e.id,
      name: e.name,
      user: e.requestedByName,
      category: e.categoryName,
      description: e.description,
      dateTime: fmtDate(e.createdAt),
      status: toStatusLabel(e.approvalStatus),
    }));
    setEdicoes(items);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([loadMecanicas(), loadEdicoes()])
      .catch((err) => console.error("[ThinkLib] Failed to load approvals:", err))
      .finally(() => setIsLoading(false));
  }, [loadMecanicas, loadEdicoes]);

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
            <CircleMinus size={12} strokeWidth={3}/>
            Pendente
          </span>
        );
      case "Aprovado":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#16A34A] bg-[#F0FDF4] rounded-full border border-[#DCFCE7] font-poppins">
            <CircleCheck size={12} strokeWidth={3}/>
            Aprovado
          </span>
        );
      case "Reprovado":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#E02424] bg-[#FDF2F2] rounded-full border border-[#FDE8E8] font-poppins">
            <CircleX size={12} strokeWidth={3}/>
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

  const handleRowClick = (item: ApprovalItem | EditApprovalItem) => {
    if (item.status === "Reprovado") {
      router.push(`/sistemas/thinklib/aprovacoes/reprovada?id=${item.id}&tab=${activeTab}`);
      return;
    }
    if (item.status === "Aprovado") {
      router.push(`/sistemas/thinklib/aprovacoes/aprovada?id=${item.id}&tab=${activeTab}`);
      return;
    }
    if (activeTab === "edicao") {
      router.push(`/sistemas/thinklib/aprovacoes/edicao?id=${item.id}`);
      return;
    }
    router.push(`/sistemas/thinklib/aprovacoes/visualizar?id=${item.id}&tab=${activeTab}`);
  };

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
            data={mecanicas}
            columns={mecanicasColumns}
            searchTerm={searchTerm}
            itemsPerPage={11}
            onRowClick={handleRowClick}
            isLoading={isLoading}
          />
        ) : (
          <GenericTable
            data={edicoes}
            columns={edicoesColumns}
            searchTerm={searchTerm}
            itemsPerPage={11}
            onRowClick={handleRowClick}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
