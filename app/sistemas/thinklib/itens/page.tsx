"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PencilLine, Trash2, ChevronDown, Check, X, Clock } from "lucide-react";
import { SearchInput } from "@/components/SearchInput";
import { GenericTable, type TableColumn } from "@/components/GenericTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import * as CategoryService from "@/services/thinklib/CategoryService";
import * as MechanicTypeService from "@/services/thinklib/MechanicTypeService";
import * as MechanicService from "@/services/thinklib/MechanicService";

// ── Interfaces ────────────────────────────────────────────────────────────────

interface Categoria {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

interface TipoMecanica {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  createdAt: string;
}

interface Mecanica {
  id: string;
  name: string;
  user: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  tipoName: string;
  description: string;
  status: "Pendente" | "Aprovado" | "Reprovado";
  createdAt: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const COLOR_OPTIONS = [
  "#22C55E",
  "#7C3AED",
  "#EF4444",
  "#EAB308",
  "#1D4ED8",
  "#14B8A6",
  "#EC4899",
  "#F97316",
];

// Deterministic color from name (used for API-fetched items that have no stored color)
function colorForName(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return COLOR_OPTIONS[Math.abs(h) % COLOR_OPTIONS.length];
}

function fmtDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
  } catch {
    return iso;
  }
}

type ActiveTab = "categoria" | "tipo" | "mecanicas";

// ── CategoryDropdown ──────────────────────────────────────────────────────────

function CategoryDropdown({
  categorias,
  selectedId,
  onSelect,
  placeholder = "Selecione uma categoria",
}: {
  categorias: Categoria[];
  selectedId: string;
  onSelect: (id: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const uniqueCats = categorias.filter(
    (c, i, arr) => arr.findIndex((x) => x.name === c.name) === i
  );
  const selected = uniqueCats.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none font-poppins"
      >
        {selected ? (
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: selected.color }} />
            <span className="text-[#0D0C0B]">{selected.name}</span>
          </span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-y-auto">
          {uniqueCats.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => { onSelect(cat.id); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-poppins hover:bg-[#F8FAFE] transition-colors"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="text-[#0D0C0B]">{cat.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MecFilterDropdown ─────────────────────────────────────────────────────────

function MecFilterDropdown({
  categorias,
  value,
  onChange,
}: {
  categorias: Categoria[];
  value: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const uniqueCats = categorias.filter((c, i, arr) => arr.findIndex((x) => x.name === c.name) === i);
  const selected = uniqueCats.find((c) => c.id === value) ?? null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none font-poppins min-w-[160px]"
      >
        {selected ? (
          <span className="flex items-center gap-2 flex-1">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: selected.color }} />
            <span className="text-[#0D0C0B]">{selected.name}</span>
          </span>
        ) : (
          <span className="text-gray-400 flex-1">Selecione</span>
        )}
        <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          {value && (
            <button
              type="button"
              onClick={() => { onChange(""); setOpen(false); }}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-400 hover:bg-[#F8FAFE] font-poppins"
            >
              Todas
            </button>
          )}
          {uniqueCats.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => { onChange(cat.id); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#F8FAFE] font-poppins"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="text-[#0D0C0B]">{cat.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function nowString() {
  const now = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(now.getDate())}/${p(now.getMonth() + 1)}/${now.getFullYear()} ${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}`;
}

// ── Page Component ────────────────────────────────────────────────────────────

export default function ItensPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>("categoria");
  const [searchTerm, setSearchTerm] = useState("");

  // ── Data ────────────────────────────────────────────────────────────────────
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [tipos, setTipos] = useState<TipoMecanica[]>([]);
  const [mecanicas, setMecanicas] = useState<Mecanica[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ── Categoria state ──────────────────────────────────────────────────────────
  const [createCatOpen, setCreateCatOpen] = useState(false);
  const [editCat, setEditCat] = useState<Categoria | null>(null);
  const [deleteCat, setDeleteCat] = useState<Categoria | null>(null);
  const [formCatName, setFormCatName] = useState("");
  const [formCatColor, setFormCatColor] = useState(COLOR_OPTIONS[0]);
  const [catSubmitting, setCatSubmitting] = useState(false);

  // ── Tipo state ───────────────────────────────────────────────────────────────
  const [createTipoOpen, setCreateTipoOpen] = useState(false);
  const [editTipo, setEditTipo] = useState<TipoMecanica | null>(null);
  const [deleteTipo, setDeleteTipo] = useState<TipoMecanica | null>(null);
  const [formTipoName, setFormTipoName] = useState("");
  const [formTipoCatId, setFormTipoCatId] = useState("");
  const [tipoSubmitting, setTipoSubmitting] = useState(false);

  // ── Mecânicas state ──────────────────────────────────────────────────────────
  const [mecCatFilter, setMecCatFilter] = useState("");
  const [deleteMecanica, setDeleteMecanica] = useState<Mecanica | null>(null);

  // ── Load data from API ───────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Categorias
      const catRes = await CategoryService.getCategories();
      const fetchedCats: Categoria[] = (catRes.items ?? []).map((c) => ({
        id: c.id,
        name: c.name,
        color: colorForName(c.name),
        createdAt: fmtDate(c.createdAt),
      }));
      setCategorias(fetchedCats);

      // Tipos — fetch per category in parallel
      const typesResults = await Promise.all(
        (catRes.items ?? []).map((cat) => MechanicTypeService.getTypesByCategory(cat.id))
      );
      const fetchedTipos: TipoMecanica[] = typesResults.flatMap((res, i) => {
        const cat = catRes.items![i];
        return (res.items ?? []).map((t) => ({
          id: t.id,
          name: t.name,
          categoryId: cat.id,
          categoryName: cat.name,
          categoryColor: colorForName(cat.name),
          createdAt: t.createdAt ? fmtDate(t.createdAt) : "",
        }));
      });
      setTipos(fetchedTipos);

      // Mecânicas
      const mechRes = await MechanicService.getMechanics({ pageNumber: 1, pageSize: 50 });
      const statusMap: Record<string, Mecanica["status"]> = {
        Approved: "Aprovado",
        Rejected: "Reprovado",
        Pending: "Pendente",
      };
      const fetchedMecs: Mecanica[] = (mechRes.items ?? []).map((m) => ({
        id: m.id,
        name: m.name ?? "",
        user: m.devName ?? "",
        categoryId: "",
        categoryName: m.categoryName ?? "",
        categoryColor: colorForName(m.categoryName ?? ""),
        tipoName: m.typeName ?? "",
        description: m.description ?? "",
        status: statusMap[m.approvalStatus ?? ""] ?? "Pendente",
        createdAt: fmtDate(m.createdAt),
      }));
      setMecanicas(fetchedMecs);
    } catch (err) {
      console.error("[ThinkLib] Failed to load data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // ── Tab change ───────────────────────────────────────────────────────────────
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSearchTerm("");
  };

  // ── Categoria handlers ────────────────────────────────────────────────────────
  const openCreateCat = () => {
    setFormCatName("");
    setFormCatColor(COLOR_OPTIONS[0]);
    setCreateCatOpen(true);
  };

  const openEditCat = (item: Categoria) => {
    setFormCatName(item.name);
    setFormCatColor(item.color);
    setEditCat(item);
  };

  const handleCreateCat = async () => {
    if (!formCatName.trim()) return;
    setCatSubmitting(true);
    try {
      const res = await CategoryService.createCategory(formCatName.trim());
      setCategorias((prev) => [
        ...prev,
        { id: res.id, name: formCatName.trim(), color: formCatColor, createdAt: nowString() },
      ]);
      setCreateCatOpen(false);
    } catch (err) {
      console.error("[ThinkLib] Create category failed:", err);
    } finally {
      setCatSubmitting(false);
    }
  };

  const handleEditCat = async () => {
    if (!editCat || !formCatName.trim()) return;
    setCatSubmitting(true);
    try {
      await CategoryService.updateCategory(editCat.id, formCatName.trim());
      setCategorias((prev) =>
        prev.map((c) => c.id === editCat.id ? { ...c, name: formCatName.trim(), color: formCatColor } : c)
      );
      setEditCat(null);
    } catch (err) {
      console.error("[ThinkLib] Update category failed:", err);
    } finally {
      setCatSubmitting(false);
    }
  };

  const handleDeleteCat = async () => {
    if (!deleteCat) return;
    setCatSubmitting(true);
    try {
      await CategoryService.deleteCategory(deleteCat.id);
      setCategorias((prev) => prev.filter((c) => c.id !== deleteCat.id));
      setDeleteCat(null);
    } catch (err) {
      console.error("[ThinkLib] Delete category failed:", err);
    } finally {
      setCatSubmitting(false);
    }
  };

  // ── Tipo handlers ─────────────────────────────────────────────────────────────
  const openCreateTipo = () => {
    setFormTipoName("");
    setFormTipoCatId("");
    setCreateTipoOpen(true);
  };

  const openEditTipo = (item: TipoMecanica) => {
    setFormTipoName(item.name);
    setFormTipoCatId(item.categoryId);
    setEditTipo(item);
  };

  const handleCreateTipo = async () => {
    if (!formTipoName.trim() || !formTipoCatId) return;
    setTipoSubmitting(true);
    try {
      const cat = categorias.find((c) => c.id === formTipoCatId)!;
      const res = await MechanicTypeService.createType(cat.id, formTipoName.trim());
      setTipos((prev) => [
        ...prev,
        {
          id: res.id,
          name: formTipoName.trim(),
          categoryId: cat.id,
          categoryName: cat.name,
          categoryColor: cat.color,
          createdAt: nowString(),
        },
      ]);
      setCreateTipoOpen(false);
    } catch (err) {
      console.error("[ThinkLib] Create type failed:", err);
    } finally {
      setTipoSubmitting(false);
    }
  };

  const handleEditTipo = async () => {
    if (!editTipo || !formTipoName.trim() || !formTipoCatId) return;
    setTipoSubmitting(true);
    try {
      const cat = categorias.find((c) => c.id === formTipoCatId)!;
      await MechanicTypeService.updateType(editTipo.categoryId, editTipo.id, formTipoName.trim());
      setTipos((prev) =>
        prev.map((t) =>
          t.id === editTipo.id
            ? { ...t, name: formTipoName.trim(), categoryId: cat.id, categoryName: cat.name, categoryColor: cat.color }
            : t
        )
      );
      setEditTipo(null);
    } catch (err) {
      console.error("[ThinkLib] Update type failed:", err);
    } finally {
      setTipoSubmitting(false);
    }
  };

  const handleDeleteTipo = async () => {
    if (!deleteTipo) return;
    setTipoSubmitting(true);
    try {
      await MechanicTypeService.deleteType(deleteTipo.categoryId, deleteTipo.id);
      setTipos((prev) => prev.filter((t) => t.id !== deleteTipo.id));
      setDeleteTipo(null);
    } catch (err) {
      console.error("[ThinkLib] Delete type failed:", err);
    } finally {
      setTipoSubmitting(false);
    }
  };

  // ── Mecânicas handlers ────────────────────────────────────────────────────────
  const handleDeleteMecanica = () => {
    if (!deleteMecanica) return;
    // API doesn't expose DELETE /mechanics — remove from local state only
    setMecanicas((prev) => prev.filter((m) => m.id !== deleteMecanica.id));
    setDeleteMecanica(null);
  };

  const filteredMecanicas = mecCatFilter
    ? mecanicas.filter((m) => m.categoryId === mecCatFilter || m.categoryName === categorias.find((c) => c.id === mecCatFilter)?.name)
    : mecanicas;

  // ── Status badge ──────────────────────────────────────────────────────────────
  const renderStatusBadge = (status: Mecanica["status"]) => {
    if (status === "Aprovado")
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-[#16A34A] bg-[#F0FDF4] rounded-full border border-[#DCFCE7] font-poppins">
          <Check size={11} strokeWidth={3} />Aprovado
        </span>
      );
    if (status === "Reprovado")
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-[#E02424] bg-[#FEF2F2] rounded-full border border-[#FEE2E2] font-poppins">
          <X size={11} strokeWidth={3} />Reprovado
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-[#D97706] bg-[#FFFBEB] rounded-full border border-[#FEF3C7] font-poppins">
        <Clock size={11} strokeWidth={3} />Pendente
      </span>
    );
  };

  // ── Column definitions ────────────────────────────────────────────────────────
  const categoriaColumns: TableColumn<Categoria>[] = [
    {
      key: "name",
      header: "Categoria",
      filterable: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
          <span className="text-[#5D657F] font-poppins">{item.name}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Data e hora de criação",
      render: (item) => <span className="text-[#5D657F] font-poppins">{item.createdAt}</span>,
    },
    {
      key: "actions",
      header: "Ações",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center gap-3 justify-end" onClick={(e) => e.stopPropagation()}>
          <button className="text-[#8E95A5] hover:text-[#1D43BE] transition-colors" onClick={() => openEditCat(item)}>
            <PencilLine size={16} />
          </button>
          <button className="text-[#8E95A5] hover:text-[#E02424] transition-colors" onClick={() => setDeleteCat(item)}>
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const tipoColumns: TableColumn<TipoMecanica>[] = [
    {
      key: "name",
      header: "Tipo",
      filterable: true,
      filterLabel: "Filtrar por tipo de mecânica",
      render: (item) => <span className="text-[#5D657F] font-poppins">{item.name}</span>,
    },
    {
      key: "categoryName",
      header: "Categoria",
      filterable: true,
      filterLabel: "Filtrar por categoria",
      render: (item) => (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.categoryColor }} />
          <span className="text-[#5D657F] font-poppins">{item.categoryName}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Data e hora de criação",
      render: (item) => <span className="text-[#5D657F] font-poppins">{item.createdAt}</span>,
    },
    {
      key: "actions",
      header: "Ações",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center gap-3 justify-end" onClick={(e) => e.stopPropagation()}>
          <button className="text-[#8E95A5] hover:text-[#1D43BE] transition-colors" onClick={() => openEditTipo(item)}>
            <PencilLine size={16} />
          </button>
          <button className="text-[#8E95A5] hover:text-[#E02424] transition-colors" onClick={() => setDeleteTipo(item)}>
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const mecanicaColumns: TableColumn<Mecanica>[] = [
    {
      key: "name",
      header: "Mecânica",
      render: (item) => <span className="text-[#5D657F] font-poppins">{item.name}</span>,
    },
    {
      key: "user",
      header: "Usuário",
      render: (item) => <span className="text-[#5D657F] font-poppins">{item.user}</span>,
    },
    {
      key: "categoryName",
      header: "Categoria",
      filterable: true,
      filterLabel: "Filtrar por categoria",
      render: (item) => (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.categoryColor }} />
          <span className="text-[#5D657F] font-poppins">{item.categoryName}</span>
        </div>
      ),
    },
    {
      key: "tipoName",
      header: "Tipo",
      filterable: true,
      filterLabel: "Filtrar por tipo",
      render: (item) => <span className="text-[#5D657F] font-poppins">{item.tipoName}</span>,
    },
    {
      key: "description",
      header: "Descrição",
      className: "max-w-[220px]",
      render: (item) => (
        <span className="text-[#5D657F] font-poppins block truncate max-w-[220px]" title={item.description}>
          {item.description}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      filterable: true,
      filterLabel: "Filtrar por status",
      render: (item) => renderStatusBadge(item.status),
    },
    {
      key: "actions",
      header: "Ações",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center gap-3 justify-end" onClick={(e) => e.stopPropagation()}>
          <button
            className="text-[#8E95A5] hover:text-[#1D43BE] transition-colors"
            onClick={() => router.push(`/sistemas/thinklib/itens/mecanicas/${item.id}/editar`)}
          >
            <PencilLine size={16} />
          </button>
          <button className="text-[#8E95A5] hover:text-[#E02424] transition-colors" onClick={() => setDeleteMecanica(item)}>
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  // ── Shared modal styles ───────────────────────────────────────────────────────
  const tabs: { key: ActiveTab; label: string }[] = [
    { key: "categoria", label: "Categoria" },
    { key: "tipo", label: "Tipo" },
    { key: "mecanicas", label: "Mecânicas" },
  ];

  const labelClass = "text-xs font-medium font-poppins text-[#0D0C0B]";
  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-0 font-poppins placeholder-gray-400";
  const btnCancel = "px-4 py-1.5 text-sm font-poppins border border-gray-300 rounded-md text-[#0D0C0B] hover:bg-gray-50 transition-colors";
  const btnConfirm = "px-4 py-1.5 text-sm font-poppins bg-[#1D43BE] text-white rounded-md hover:bg-[#1635a0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

  return (
    <div className="pt-10 pb-10 px-[29.5px] flex flex-col gap-6 w-full bg-white">
      <div className="text-xs text-[#8E95A5] font-poppins -mb-2">
        Sistemas <span className="mx-1">/</span> ThinkLib <span className="mx-1">/</span>{" "}
        <span className="font-semibold text-gray-700">Itens</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 -mb-2 mt-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`pb-3 text-xl font-medium font-poppins relative transition-all duration-200 ${
              activeTab === tab.key ? "text-[#1D43BE]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1D43BE] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── Aba Categoria ── */}
      {activeTab === "categoria" && (
        <>
          <div className="flex items-center justify-between mt-2">
            <div className="flex-1 max-w-md">
              <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Buscar" />
            </div>
            <button
              onClick={openCreateCat}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1D43BE] text-white text-sm font-medium font-poppins rounded-lg hover:bg-[#1635a0] transition-colors"
            >
              <span className="text-lg leading-none">+</span> Categoria
            </button>
          </div>
          <div className="mt-2">
            <GenericTable
              data={categorias}
              columns={categoriaColumns}
              searchTerm={searchTerm}
              itemsPerPage={10}
              isLoading={isLoading}
            />
          </div>
        </>
      )}

      {/* ── Aba Tipo ── */}
      {activeTab === "tipo" && (
        <>
          <div className="flex items-center justify-between mt-2">
            <div className="flex-1 max-w-md">
              <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Buscar" />
            </div>
            <button
              onClick={openCreateTipo}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1D43BE] text-white text-sm font-medium font-poppins rounded-lg hover:bg-[#1635a0] transition-colors"
            >
              <span className="text-lg leading-none">+</span> Tipo de mecânica
            </button>
          </div>
          <div className="mt-2">
            <GenericTable
              data={tipos}
              columns={tipoColumns}
              searchTerm={searchTerm}
              itemsPerPage={10}
              isLoading={isLoading}
            />
          </div>
        </>
      )}

      {/* ── Aba Mecânicas ── */}
      {activeTab === "mecanicas" && (
        <>
          <div className="flex items-center gap-3 mt-2">
            <MecFilterDropdown categorias={categorias} value={mecCatFilter} onChange={setMecCatFilter} />
            <div className="flex-1 max-w-md">
              <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Buscar" />
            </div>
            <button
              onClick={() => router.push("/sistemas/thinklib/itens/mecanicas/criar")}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1D43BE] text-white text-sm font-medium font-poppins rounded-lg hover:bg-[#1635a0] transition-colors ml-auto"
            >
              <span className="text-lg leading-none">+</span> Mecânica
            </button>
          </div>
          <div className="mt-2">
            <GenericTable
              data={filteredMecanicas}
              columns={mecanicaColumns}
              searchTerm={searchTerm}
              itemsPerPage={10}
              isLoading={isLoading}
            />
          </div>
        </>
      )}

      {/* ════════════════════════════════════════
          MODAIS — CATEGORIA
      ════════════════════════════════════════ */}

      <Dialog open={createCatOpen} onOpenChange={setCreateCatOpen}>
        <DialogContent className="max-w-sm p-5">
          <DialogHeader className="gap-0.5">
            <DialogTitle className="text-[#1D43BE] text-base font-semibold font-poppins">Nova categoria</DialogTitle>
            <DialogDescription className="text-[#8E95A5] text-xs font-poppins">Crie uma nova categoria de mecânica.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-1">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Nome da categoria <span className="text-[#E02424]">*</span></label>
              <input type="text" value={formCatName} onChange={(e) => setFormCatName(e.target.value)} placeholder="Ex: Plataforma 2D, RPG, Estratégia..." className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Cor da categoria <span className="text-[#E02424]">*</span></label>
              <div className="flex justify-between">
                {COLOR_OPTIONS.map((color) => (
                  <button key={color} onClick={() => setFormCatColor(color)} className={`w-7 h-7 rounded-full transition-all hover:scale-110 ${formCatColor === color ? "ring-2 ring-offset-1 ring-gray-400" : ""}`} style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            <button onClick={() => setCreateCatOpen(false)} className={btnCancel}>Cancelar</button>
            <button onClick={handleCreateCat} disabled={!formCatName.trim() || catSubmitting} className={btnConfirm}>
              {catSubmitting ? "Salvando..." : "Confirmar"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editCat} onOpenChange={(open) => !open && setEditCat(null)}>
        <DialogContent className="max-w-sm p-5">
          <DialogHeader className="gap-0.5">
            <DialogTitle className="text-[#1D43BE] text-base font-semibold font-poppins">Editar categoria</DialogTitle>
            <DialogDescription className="text-[#8E95A5] text-xs font-poppins">Edite as informações da categoria.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-1">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Nome da categoria <span className="text-[#E02424]">*</span></label>
              <input type="text" value={formCatName} onChange={(e) => setFormCatName(e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Cor da categoria <span className="text-[#E02424]">*</span></label>
              <div className="flex justify-between">
                {COLOR_OPTIONS.map((color) => (
                  <button key={color} onClick={() => setFormCatColor(color)} className={`w-7 h-7 rounded-full transition-all hover:scale-110 ${formCatColor === color ? "ring-2 ring-offset-1 ring-gray-400" : ""}`} style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            <button onClick={() => setEditCat(null)} className={btnCancel}>Cancelar</button>
            <button onClick={handleEditCat} disabled={!formCatName.trim() || catSubmitting} className={btnConfirm}>
              {catSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteCat} onOpenChange={(open) => !open && setDeleteCat(null)}>
        <DialogContent className="max-w-sm p-5">
          <DialogHeader className="gap-0.5">
            <DialogTitle className="text-[#1D43BE] text-base font-semibold font-poppins">Excluir categoria</DialogTitle>
            <DialogDescription className="text-xs font-poppins text-[#5D657F] mt-1">
              Deseja excluir a categoria <span className="font-semibold text-[#0D0C0B]">{deleteCat?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2 mt-3">
            <button onClick={() => setDeleteCat(null)} className={btnCancel}>Cancelar</button>
            <button onClick={handleDeleteCat} disabled={catSubmitting} className="px-4 py-1.5 text-sm font-poppins bg-[#E02424] text-white rounded-md hover:bg-[#c01e1e] disabled:opacity-50 transition-colors">
              {catSubmitting ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════════════════
          MODAIS — TIPO
      ════════════════════════════════════════ */}

      <Dialog open={createTipoOpen} onOpenChange={setCreateTipoOpen}>
        <DialogContent className="max-w-sm p-5">
          <DialogHeader className="gap-0.5">
            <DialogTitle className="text-[#1D43BE] text-base font-semibold font-poppins">Novo tipo de mecânica</DialogTitle>
            <DialogDescription className="text-[#8E95A5] text-xs font-poppins">Crie um novo tipo de mecânica em uma categoria existente.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-1">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Categoria <span className="text-[#E02424]">*</span></label>
              <CategoryDropdown categorias={categorias} selectedId={formTipoCatId} onSelect={setFormTipoCatId} />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Nome do tipo de mecânica <span className="text-[#E02424]">*</span></label>
              <input type="text" value={formTipoName} onChange={(e) => setFormTipoName(e.target.value)} placeholder="Ex: Movimento, Combate, Torres..." className={inputClass} />
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            <button onClick={() => setCreateTipoOpen(false)} className={btnCancel}>Cancelar</button>
            <button onClick={handleCreateTipo} disabled={!formTipoName.trim() || !formTipoCatId || tipoSubmitting} className={btnConfirm}>
              {tipoSubmitting ? "Salvando..." : "Confirmar"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editTipo} onOpenChange={(open) => !open && setEditTipo(null)}>
        <DialogContent className="max-w-sm p-5">
          <DialogHeader className="gap-0.5">
            <DialogTitle className="text-[#1D43BE] text-base font-semibold font-poppins">Editar tipo de mecânica</DialogTitle>
            <DialogDescription className="text-[#8E95A5] text-xs font-poppins">Editar um tipo de mecânica em uma categoria existente.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-1">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Categoria <span className="text-[#E02424]">*</span></label>
              <CategoryDropdown categorias={categorias} selectedId={formTipoCatId} onSelect={setFormTipoCatId} />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Nome do tipo de mecânica <span className="text-[#E02424]">*</span></label>
              <input type="text" value={formTipoName} onChange={(e) => setFormTipoName(e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            <button onClick={() => setEditTipo(null)} className={btnCancel}>Cancelar</button>
            <button onClick={handleEditTipo} disabled={!formTipoName.trim() || !formTipoCatId || tipoSubmitting} className={btnConfirm}>
              {tipoSubmitting ? "Salvando..." : "Confirmar"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTipo} onOpenChange={(open) => !open && setDeleteTipo(null)}>
        <DialogContent className="max-w-sm p-5">
          <DialogHeader className="gap-0.5">
            <DialogTitle className="text-[#1D43BE] text-base font-semibold font-poppins">Excluir tipo de mecânica</DialogTitle>
            <DialogDescription className="text-xs font-poppins text-[#5D657F] mt-1">
              Deseja excluir o tipo de mecânica <span className="font-semibold text-[#0D0C0B]">{deleteTipo?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2 mt-3">
            <button onClick={() => setDeleteTipo(null)} className={btnCancel}>Cancelar</button>
            <button onClick={handleDeleteTipo} disabled={tipoSubmitting} className="px-4 py-1.5 text-sm font-poppins bg-[#E02424] text-white rounded-md hover:bg-[#c01e1e] disabled:opacity-50 transition-colors">
              {tipoSubmitting ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════════════════
          MODAL — EXCLUIR MECÂNICA
      ════════════════════════════════════════ */}
      <Dialog open={!!deleteMecanica} onOpenChange={(open) => !open && setDeleteMecanica(null)}>
        <DialogContent className="max-w-sm p-5">
          <DialogHeader className="gap-0.5">
            <DialogTitle className="text-[#1D43BE] text-base font-semibold font-poppins">Excluir mecânica</DialogTitle>
            <DialogDescription className="text-xs font-poppins text-[#5D657F] mt-1">
              Deseja excluir a mecânica <span className="font-semibold text-[#0D0C0B]">{deleteMecanica?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2 mt-3">
            <button onClick={() => setDeleteMecanica(null)} className={btnCancel}>Cancelar</button>
            <button onClick={handleDeleteMecanica} className="px-4 py-1.5 text-sm font-poppins bg-[#E02424] text-white rounded-md hover:bg-[#c01e1e] transition-colors">Excluir</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
