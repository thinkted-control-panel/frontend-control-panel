"use client";

import type React from "react";
import { useState } from "react";
import { Home, User, Settings, ChevronDown, ChevronUp } from "lucide-react";

export type ActiveKey =
  | "dashboard"
  | "auditoria"
  | "itens"
  | "suporte"
  | "usuario"
  | "gameted"
  | "thinklib"
  | "thinktest"
  | "glboard"
  | "gameted_aprovacoes"
  | "gameted_usuarios"
  | "gameted_itens"
  | "gameted_auditoria"
  | "thinklib_aprovacoes"
  | "thinklib_usuarios"
  | "thinklib_itens"
  | "thinklib_auditoria"
  | "thinktest_aprovacoes"
  | "thinktest_usuarios"
  | "thinktest_itens"
  | "thinktest_auditoria"
  | "glboard_aprovacoes"
  | "glboard_usuarios"
  | "glboard_itens"
  | "glboard_auditoria"
  | "geral_usuario_comum"
  | "geral_usuario_admins";

type OpenSection = "usuario" | "gameted" | "thinklib" | "thinktest" | "glboard" | null;

interface SideBarProps {
  activeKey?: ActiveKey | null;

  onNavigate?: (key: ActiveKey) => void;

  onToggleSection?: (section: Exclude<OpenSection, null>, isOpen: boolean) => void;
}

function ParentTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="px-4 pt-3 pb-2">
      <div className="flex items-center gap-2 text-sm text-[rgba(13,12,11,0.8)]">
        <span className="text-[rgba(13,12,11,0.8)]">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
}

function ChildItem({
  label,
  isActive,
  onClick,
  indentClass = "pl-10",
}: {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  indentClass?: string;
}) {
  const textClass = isActive ? "text-[#1D43BE]" : "text-[rgba(13,12,11,0.8)]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full",
        "h-10",
        indentClass,
        "pr-4",
        "rounded-lg",
        "flex items-center justify-start",
        "hover:bg-[#f8fafe]",
        "transition-colors",
      ].join(" ")}
    >
      <span className={["text-sm font-normal", textClass].join(" ")}>{label}</span>
    </button>
  );
}

function CollapsibleHeader({
  label,
  isActive,
  isOpen,
  onClick,
  indentClass = "pl-10",
}: {
  label: string;
  isActive?: boolean;
  isOpen: boolean;
  onClick?: () => void;
  indentClass?: string;
}) {
  const textClass = isOpen
    ? "text-[#1D43BE]"
    : isActive
    ? "text-[#1D43BE]"
    : "text-[rgba(13,12,11,0.8)]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full",
        "h-10",
        indentClass,
        "pr-4",
        "rounded-lg",
        "flex items-center justify-between",
        "hover:bg-[#f8fafe]",
        "transition-colors",
      ].join(" ")}
    >
      <span className={["text-sm font-normal", textClass].join(" ")}>{label}</span>
      <span className={textClass}>{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
    </button>
  );
}

export default function SideBar({ activeKey = null, onNavigate, onToggleSection }: SideBarProps) {
  const [openSection, setOpenSection] = useState<OpenSection>(null);

  const isUsuarioOpen = openSection === "usuario";
  const isGameTEdOpen = openSection === "gameted";
  const isThinkLibOpen = openSection === "thinklib";
  const isThinkTestOpen = openSection === "thinktest";
  const isGLBoardOpen = openSection === "glboard";

  const toggleExclusive = (section: Exclude<OpenSection, null>) => {
    setOpenSection((prev) => {
      const next = prev === section ? null : section;
      onToggleSection?.(section, next === section);
      return next;
    });
  };

  const usuarioTextClass = isUsuarioOpen
    ? "text-[#1D43BE]"
    : activeKey === "usuario"
    ? "text-[#1D43BE]"
    : "text-[rgba(13,12,11,0.8)]";

  return (
    <aside className="w-[200px] bg-white border-r border-[#CDD0DA] h-screen">
      <div className="px-3 py-3">
        <ParentTitle icon={<Home size={16} />} label="Geral" />

        <div className="flex flex-col gap-1">
          <ChildItem
            label="Dashboard"
            isActive={activeKey === "dashboard"}
            onClick={() => onNavigate?.("dashboard")}
            indentClass="pl-10"
          />
          <ChildItem
            label="Auditoria"
            isActive={activeKey === "auditoria"}
            onClick={() => onNavigate?.("auditoria")}
            indentClass="pl-10"
          />
          <ChildItem
            label="Itens"
            isActive={activeKey === "itens"}
            onClick={() => onNavigate?.("itens")}
            indentClass="pl-10"
          />
          <ChildItem
            label="Suporte"
            isActive={activeKey === "suporte"}
            onClick={() => onNavigate?.("suporte")}
            indentClass="pl-10"
          />
        </div>

        {/* Usuário */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => toggleExclusive("usuario")}
            className={[
              "w-full",
              "h-10",
              "px-4",
              "rounded-lg",
              "flex items-center justify-between",
              "hover:bg-[#f8fafe]",
              "transition-colors",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <User size={16} className={usuarioTextClass} />
              <span className={["text-sm font-normal", usuarioTextClass].join(" ")}>Usuário</span>
            </div>

            <span className={usuarioTextClass}>
              {isUsuarioOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {isUsuarioOpen ? (
            <div className="flex flex-col gap-1 mt-1">
              <ChildItem
                label="Comum"
                isActive={activeKey === "geral_usuario_comum"}
                onClick={() => onNavigate?.("geral_usuario_comum")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Admins"
                isActive={activeKey === "geral_usuario_admins"}
                onClick={() => onNavigate?.("geral_usuario_admins")}
                indentClass="pl-14"
              />
            </div>
          ) : null}
        </div>

        <div className="my-4 mx-2 h-px bg-[#CDD0DA]" />

        <ParentTitle icon={<Settings size={16} />} label="Sistemas" />

        <div className="flex flex-col gap-1">
          <CollapsibleHeader
            label="GameTEd"
            isActive={activeKey === "gameted"}
            isOpen={isGameTEdOpen}
            onClick={() => toggleExclusive("gameted")}
            indentClass="pl-10"
          />
          {isGameTEdOpen ? (
            <div className="flex flex-col gap-1 mt-1">
              <ChildItem
                label="Aprovações"
                isActive={activeKey === "gameted_aprovacoes"}
                onClick={() => onNavigate?.("gameted_aprovacoes")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Usuários"
                isActive={activeKey === "gameted_usuarios"}
                onClick={() => onNavigate?.("gameted_usuarios")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Itens"
                isActive={activeKey === "gameted_itens"}
                onClick={() => onNavigate?.("gameted_itens")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Auditoria"
                isActive={activeKey === "gameted_auditoria"}
                onClick={() => onNavigate?.("gameted_auditoria")}
                indentClass="pl-14"
              />
            </div>
          ) : null}

          <CollapsibleHeader
            label="ThinkLib"
            isActive={activeKey === "thinklib"}
            isOpen={isThinkLibOpen}
            onClick={() => toggleExclusive("thinklib")}
            indentClass="pl-10"
          />
          {isThinkLibOpen ? (
            <div className="flex flex-col gap-1 mt-1">
              <ChildItem
                label="Aprovações"
                isActive={activeKey === "thinklib_aprovacoes"}
                onClick={() => onNavigate?.("thinklib_aprovacoes")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Usuários"
                isActive={activeKey === "thinklib_usuarios"}
                onClick={() => onNavigate?.("thinklib_usuarios")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Itens"
                isActive={activeKey === "thinklib_itens"}
                onClick={() => onNavigate?.("thinklib_itens")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Auditoria"
                isActive={activeKey === "thinklib_auditoria"}
                onClick={() => onNavigate?.("thinklib_auditoria")}
                indentClass="pl-14"
              />
            </div>
          ) : null}

          <CollapsibleHeader
            label="ThinkTest"
            isActive={activeKey === "thinktest"}
            isOpen={isThinkTestOpen}
            onClick={() => toggleExclusive("thinktest")}
            indentClass="pl-10"
          />
          {isThinkTestOpen ? (
            <div className="flex flex-col gap-1 mt-1">
              <ChildItem
                label="Aprovações"
                isActive={activeKey === "thinktest_aprovacoes"}
                onClick={() => onNavigate?.("thinktest_aprovacoes")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Usuários"
                isActive={activeKey === "thinktest_usuarios"}
                onClick={() => onNavigate?.("thinktest_usuarios")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Itens"
                isActive={activeKey === "thinktest_itens"}
                onClick={() => onNavigate?.("thinktest_itens")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Auditoria"
                isActive={activeKey === "thinktest_auditoria"}
                onClick={() => onNavigate?.("thinktest_auditoria")}
                indentClass="pl-14"
              />
            </div>
          ) : null}

          <CollapsibleHeader
            label="GLBoard"
            isActive={activeKey === "glboard"}
            isOpen={isGLBoardOpen}
            onClick={() => toggleExclusive("glboard")}
            indentClass="pl-10"
          />
          {isGLBoardOpen ? (
            <div className="flex flex-col gap-1 mt-1">
              <ChildItem
                label="Aprovações"
                isActive={activeKey === "glboard_aprovacoes"}
                onClick={() => onNavigate?.("glboard_aprovacoes")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Usuários"
                isActive={activeKey === "glboard_usuarios"}
                onClick={() => onNavigate?.("glboard_usuarios")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Itens"
                isActive={activeKey === "glboard_itens"}
                onClick={() => onNavigate?.("glboard_itens")}
                indentClass="pl-14"
              />
              <ChildItem
                label="Auditoria"
                isActive={activeKey === "glboard_auditoria"}
                onClick={() => onNavigate?.("glboard_auditoria")}
                indentClass="pl-14"
              />
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
