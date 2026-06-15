import React, { useState } from "react";
import {
  ArrowUpDown,
  Ban,
  Check,
  Circle,
  CircleDot,
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

interface UserTableProps {
  users: TableUser[];
  searchTerm?: string;
  isLoading?: boolean;
  onEditUser?: (user: TableUser) => void;
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

export const GenericTable: React.FC<UserTableProps> = ({
  users,
  searchTerm = "",
  isLoading = false,
  onEditUser,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 11;

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.systems.some((sys) => sys.toLowerCase().includes(term)) ||
      user.status.toLowerCase().includes(term)
    );
  });

  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const activePage = currentPage > totalPages ? totalPages : currentPage;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const hasPagination = true;
  const startResult = String(indexOfFirstItem + 1).padStart(2, "0");
  const endResult = String(Math.min(indexOfLastItem, totalItems)).padStart(
    2,
    "0",
  );
  const totalResults = String(totalItems).padStart(2, "0");

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
              <th className="pb-4 py-3 px-4 text-[#5D657F] font-poppins">
                <div className="flex items-center gap-1 select-none cursor-pointer hover:text-gray-700 transition-colors">
                  Nome
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="pb-4 py-3 px-4 text-[#5D657F] font-poppins">
                <div className="flex items-center gap-1 select-none cursor-pointer hover:text-gray-700 transition-colors">
                  Email
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="pb-4 py-3 px-4 w-1/4 text-[#5D657F] font-poppins">
                <div className="flex items-center gap-1 select-none cursor-pointer hover:text-gray-700 transition-colors">
                  Sistemas
                  <Filter className="w-4 h-4" />
                </div>
              </th>
              <th className="pb-4 py-3 px-4 w-36 text-[#5D657F] font-poppins">
                <div className="flex items-center gap-1 select-none cursor-pointer hover:text-gray-700 transition-colors">
                  Status
                  <Filter className="w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-[#F8FAFE] text-sm text-[#0D0C0B] font-poppins bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#8E95A5]">
                  Carregando usuários...
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((user, idx) => (
                <tr
                  key={user.id}
                  onClick={() => onEditUser?.(user)}
                  className="hover:bg-[#F8FAFE]/50 transition-colors bg-white cursor-pointer"
                >
                  <td className="py-4 pl-4 pr-4 text-[#8E95A5] font-normal">
                    {indexOfFirstItem + idx + 1}
                  </td>
                  <td className="py-4 px-4 font-normal text-[#0D0C0B]">
                    {user.name}
                  </td>
                  <td className="py-4 px-4 text-[#5D657F]">{user.email}</td>
                  <td className="py-4 px-4">
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
                  </td>
                  <td className="py-4 px-4">
                    {user.status === "Ativo" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[#16A34A] bg-[#F0FDF4] rounded-full border border-[#DCFCE7]">
                        <Check
                          size={12}
                          strokeWidth={3}
                          className="text-[#16A34A]"
                        />
                        Ativo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-[#D97706] bg-[#FFFBEB] rounded-full border border-[#FEF3C7]">
                        <Ban
                          size={12}
                          strokeWidth={3}
                          className="text-[#D97706]"
                        />
                        Suspenso
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#8E95A5]">
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hasPagination && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <div className="border border-gray-200 rounded-[50px] w-full max-w-[983px] h-[68px] flex justify-between px-6 items-start relative">
            <div className="flex-1 flex justify-center">
              <Pagination
                className="mt-4"
                count={totalPages}
                page={currentPage}
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
                    components={{
                      previous: () => (
                        <div className="flex items-center px-2 text-sm font-medium text-gray-600">
                          <NavigateBeforeIcon />
                          <span style={{ marginLeft: 4 }}>Anterior</span>
                        </div>
                      ),
                      next: () => (
                        <div className="flex items-center px-2 text-sm font-medium text-gray-600">
                          <span style={{ marginRight: 4 }}>Próximo</span>
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
