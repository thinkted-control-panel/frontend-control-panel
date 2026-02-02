"use client";

import Image from "next/image";
import { Bell, ChevronDown } from "lucide-react";

import logoEcosistema from "../imports/logo.svg";
import avatarMock from "../imports/avatar-mock.svg";

export default function TopBar() {
  return (
    <header className="w-full h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6">
      {/* ===== LEFT (Logo + Nome sistema) ===== */}
      <div className="flex items-center gap-3">
        <Image
          src={logoEcosistema}
          alt="Logo"
          width={20}
          height={20}
          className="object-contain"
          priority
        />

        <span className="text-lg font-semibold text-[#142E82]">
          Ecossistema
        </span>
      </div>

      {/* ===== RIGHT (Ações + Usuário) ===== */}
      <div className="flex items-center gap-6">
        {/* Notificações */}
        <button
          type="button"
          className="text-gray-600 hover:text-[#142E82] transition-colors"
          aria-label="Notificações"
        >
          <Bell size={20} />
        </button>

        {/* Divisor */}
        <div className="w-px h-6 bg-[#E5E7EB]" />

        {/* Usuário */}
        <button
          type="button"
          className="flex items-center gap-3 hover:bg-gray-50 px-2 py-1 rounded-lg transition"
        >
          <Image
            src={avatarMock}
            alt="Avatar"
            width={30}
            height={30}
            className="rounded-full object-cover"
          />

          <div className="flex flex-col items-start text-sm leading-tight">
            <span className="font-medium text-[#11204F]">
              Marcela P.
            </span>

            <span className="text-xs text-[#5D657F]">
              Super admin
            </span>
          </div>

          <ChevronDown size={16} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
}
