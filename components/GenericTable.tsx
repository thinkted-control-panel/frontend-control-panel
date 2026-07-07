import React, { useState } from "react";
import {
  ArrowUpDown,
  CircleCheck,
  CircleX,
  Filter,
} from "lucide-react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export interface TableUser {
  id: string;
  name: string;
  email: string;
  systems: string[];
  status: "Ativo" | "Suspenso";
}

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  className?: string;
}

interface GenericTableProps<T> {
  users?: TableUser[];
  onEditUser?: (user: TableUser) => void;
  data?: T[];
  columns?: TableColumn<T>[];
  onRowClick?: (item: T) => void;
  searchTerm?: string;
  isLoading?: boolean;
  itemsPerPage?: number;
}

const getSystemBadgeClass = (system: string): string => {
  switch (system.toLowerCase()) {
    case "glboard":
      return "bg-[#FDE8E8] text-[#E02424] border border-[#FCD9D9]";
    case "painel":
      return "bg-[#F3E8FF] text-[#7E3AF2] border border-[#E9D5FF]";
    case "gte":
    case "gameted":
      return "bg-[#E1EFFE] text-[#1E40AF] border border-[#C3DDFD]";
    case "glb":
      return "bg-[#FCE8F3] text-[#D61F69] border border-[#FAD2E9]";
    case "thinktest":
    case "test":
      return "bg-[#DEF7EC] text-[#03543F] border border-[#BCF0DA]";
    case "lib":
    case "thinklib":
      return "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-200";
  }
};

export const GenericTable = <T,>({
  users,
  onEditUser,
  data,
  columns,
  onRowClick,
  searchTerm = "",
  isLoading = false,
  itemsPerPage = 11,
}: GenericTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const defaultUserColumns: TableColumn<TableUser>[] = [
    {
      key: "name",
      header: "Nome",
      sortable: true,
      render: (user) => user.name,
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      render: (user) => user.email,
      className: "text-[#5D657F]",
    },
    {
      key: "systems",
      header: "Sistemas",
      filterable: true,
      className: "w-1/4",
      render: (user) => (
        <div className="flex flex-wrap gap-2">
          {user.systems.map((sys, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 text-xs font-medium rounded-[6px] ${getSystemBadgeClass(sys)}`}
            >
              {sys}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      filterable: true,
      className: "w-36",
      render: (user) =>
        user.status === "Ativo" ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[#16A34A] bg-[#F0FDF4] rounded-full border border-[#DCFCE7]">
            <CircleCheck size={12} strokeWidth={3} className="text-[#16A34A]" />
            Ativo
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[#D97706] bg-[#FFFBEB] rounded-full border border-[#FEF3C7]">
            <CircleX size={12} strokeWidth={3} className="text-[#D97706]" />
            Suspenso
          </span>
        ),
    },
  ];

  const finalColumns = (columns || (users ? defaultUserColumns : [])) as TableColumn<any>[];
  const finalData = (data || users || []) as any[];

  const filteredData = finalData.filter((item) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    return Object.keys(item).some((key) => {
      const val = item[key];
      if (val === null || val === undefined) return false;
      if (typeof val === "string") {
        return val.toLowerCase().includes(term);
      }
      if (typeof val === "number") {
        return String(val).includes(term);
      }
      if (Array.isArray(val)) {
        return val.some((subVal) => typeof subVal === "string" && subVal.toLowerCase().includes(term));
      }
      return false;
    });
  });

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const activePage = currentPage > totalPages ? totalPages : currentPage;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const startResult = String(totalItems === 0 ? 0 : indexOfFirstItem + 1).padStart(2, "0");
  const endResult = String(Math.min(indexOfLastItem, totalItems)).padStart(2, "0");
  const totalResults = String(totalItems).padStart(2, "0");

  const handleRowClick = (item: any) => {
    if (onRowClick) {
      onRowClick(item as T);
    } else if (onEditUser && users) {
      onEditUser(item as TableUser);
    }
  };

  const colCount = finalColumns.length + 1;

  return (
    <div className="w-full bg-white mt-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border-2 border-[#F8FAFE]">
          <thead>
            <tr className="bg-[#F8FAFE] border-b-2 border-[#F8FAFE] text-sm font-medium text-gray-500">
              <th className="pb-4 py-3 pl-4 pr-4 w-12 text-[#5D657F] font-poppins">
                <div className="flex items-center gap-1 select-none cursor-pointer hover:text-gray-700 transition-colors">
                  Nº
                </div>
              </th>
              {finalColumns.map((col) => (
                <th key={col.key} className={`pb-4 py-3 px-4 text-[#5D657F] font-poppins ${col.className || ""}`}>
                  <div className="flex items-center gap-1 select-none cursor-pointer hover:text-gray-700 transition-colors">
                    {col.header}
                    {col.sortable && <ArrowUpDown className="w-4 h-4" />}
                    {col.filterable && <Filter className="w-4 h-4" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-[#F8FAFE] text-sm text-[#0D0C0B] font-poppins bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={colCount} className="py-8 text-center text-[#8E95A5]">
                  Carregando...
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  onClick={() => handleRowClick(item)}
                  className="hover:bg-[#F8FAFE]/50 transition-colors bg-white cursor-pointer"
                >
                  <td className="py-4 pl-4 pr-4 text-[#8E95A5] font-normal">
                    {indexOfFirstItem + idx + 1}
                  </td>
                  {finalColumns.map((col) => (
                    <td key={col.key} className={`py-4 px-4 font-normal ${col.className || ""}`}>
                      {col.render ? col.render(item, indexOfFirstItem + idx) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={colCount} className="py-8 text-center text-[#8E95A5]">
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <div className="border border-gray-200 rounded-[50px] w-full max-w-[983px] h-[68px] flex justify-between px-6 items-start relative">
            <div className="flex-1 flex justify-center">
              <Pagination
                className="mt-4"
                count={totalPages}
                page={activePage}
                onChange={(_, newPage) => setCurrentPage(newPage)}
                color="primary"
                variant="text"
                sx={{
                  "& .Mui-selected": {
                    backgroundColor: "#00509D !important",
                    color: "#fff",
                  },
                }}
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    slots={{
                      previous: () => (
                        <div className="flex items-center px-2 text-sm font-medium text-gray-600">
                          <NavigateBeforeIcon />
                          <span style={{ marginLeft: 4 }}>Anterior</span>
                        </div>
                      ),
                      next: () => (
                        <div className="flex items-center px-2 text-sm font-medium text-gray-600">
                          <span style={{ marginRight: 4 }}>Próxima</span>
                          <NavigateNextIcon />
                        </div>
                      ),
                    }}
                  />
                )}
              />
            </div>

            <span className="text-sm font-medium text-[#8B8B8B] mt-[23px] whitespace-nowrap absolute right-6">
              Exibindo {startResult}-{endResult} de {totalResults} resultados
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
