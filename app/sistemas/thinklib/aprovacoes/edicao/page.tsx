"use client";
import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleCheck, CircleX, X, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { StatusModal } from "@/components/StatusModal";
import * as MechanicService from "@/services/thinklib/MechanicService";
import { IMechanicEditRequest } from "@/interfaces/thinklib/IMechanic";

function AnalisarEdicaoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [item, setItem] = useState<IMechanicEditRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [justificativa, setJustificativa] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadEditRequest = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await MechanicService.getMechanicEditRequests({ pageNumber: 1, pageSize: 200 });
      const found = (res.items ?? []).find((e) => e.id === id) ?? null;
      setItem(found);
    } catch (err) {
      console.error("[ThinkLib] Failed to load edit request:", err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { loadEditRequest(); }, [loadEditRequest]);

  if (isLoading || !item) {
    return (
      <div className="pt-10 pb-10 px-[29.5px] font-poppins text-gray-500">
        {isLoading ? "Carregando dados da mecânica..." : "Solicitação de edição não encontrada."}
      </div>
    );
  }

  const handleConfirmApprove = async () => {
    if (!id) return;
    setSubmitting(true);
    try {
      await MechanicService.reviewMechanicEditRequest(id, "Approved");
      setIsApproveOpen(false);
      toast.success(
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-[#16A34A] text-sm font-poppins">Sucesso</span>
          <span className="text-xs text-[#5D657F] font-poppins">Edição da mecânica foi aprovada.</span>
        </div>,
        {
          icon: <CircleCheck size={18} className="text-[#16A34A]" />,
          style: {
            backgroundColor: "#F0FDF4",
            border: "1px solid #DCFCE7",
            borderRadius: "8px",
          },
        }
      );
      router.push("/sistemas/thinklib/aprovacoes");
    } catch (err) {
      console.error("[ThinkLib] Failed to approve edit request:", err);
      toast.error("Não foi possível aprovar a edição.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!id || !justificativa.trim()) return;
    setSubmitting(true);
    try {
      await MechanicService.reviewMechanicEditRequest(id, "Rejected", justificativa.trim());
      setIsRejectOpen(false);
      toast.error(
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-[#E02424] text-sm font-poppins">Atenção</span>
          <span className="text-xs text-[#5D657F] font-poppins">Edição da mecânica reprovada.</span>
        </div>,
        {
          icon: <AlertCircle size={18} className="text-[#E02424]" />,
          style: {
            backgroundColor: "#FDF2F2",
            border: "1px solid #FDE8E8",
            borderRadius: "8px",
          },
        }
      );
      router.push("/sistemas/thinklib/aprovacoes");
    } catch (err) {
      console.error("[ThinkLib] Failed to reject edit request:", err);
      toast.error("Não foi possível reprovar a edição.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-10 pb-10 px-[29.5px] flex flex-col gap-6 w-full bg-white min-h-screen">
      <div className="text-xs text-[#8E95A5] font-poppins -mb-2">
        Sistemas <span className="mx-1">/</span> ThinkLib{" "}
        <span className="mx-1">/</span>{" "}
        <span className="cursor-pointer hover:underline text-gray-500" onClick={() => router.push("/sistemas/thinklib/aprovacoes")}>
          Aprovações
        </span>{" "}
        <span className="mx-1">/</span>{" "}
        <span className="font-semibold text-gray-700">Analisar edição</span>
      </div>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-poppins font-medium text-[20px] text-[#142E82] tracking-wide antialiased">
          Analisar mecânica para edição
        </h1>
        <button
          onClick={() => router.push("/sistemas/thinklib/aprovacoes")}
          className="flex items-center gap-1.5 px-4 py-2 border border-[#CDD0DA] rounded-[8px] text-xs font-poppins font-medium text-gray-500 bg-white hover:bg-gray-50 transition-colors"
        >
          <X size={14} className="text-gray-400" />
          Sair
        </button>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div>
          <h2 className="text-base font-semibold text-[#29324F] font-poppins mb-4">
            Detalhes da Mecânica
          </h2>

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600 font-poppins font-normal">
                  Nome da mecânica
                </span>
                <input
                  id="nome-mecanica"
                  name="nome-mecanica"
                  title="Nome da mecânica"
                  placeholder="Nome da mecânica"
                  type="text"
                  readOnly
                  disabled
                  value={item.name}
                  className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600 font-poppins font-normal">
                  Solicitado por
                </span>
                <input
                  id="solicitado-por"
                  name="solicitado-por"
                  title="Solicitado por"
                  type="text"
                  readOnly
                  disabled
                  value={item.requestedByName}
                  className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600 font-poppins font-normal">
                  Categoria da mecânica
                </span>
                <input
                  id="categoria-mecanica"
                  name="categoria-mecanica"
                  type="text"
                  readOnly
                  disabled
                  value={item.categoryName}
                  className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600 font-poppins font-normal">
                  Tipo de mecânica
                </span>
                <input
                  id="tipo-mecanica"
                  name="tipo-mecanica"
                  type="text"
                  readOnly
                  disabled
                  value={item.typeName}
                  className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">
                Texto de apresentação
              </span>
              <textarea
                id="apresentacao-mecanica"
                name="apresentacao-mecanica"
                title="Texto de apresentação"
                placeholder="Texto de apresentação"
                readOnly
                disabled
                rows={3}
                value={item.presentationText || "-"}
                className="w-full px-4 py-3 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">
                Descrição detalhada da mecânica
              </span>
              <textarea
                id="descricao-mecanica"
                name="descricao-mecanica"
                title="Descrição detalhada da mecânica"
                placeholder="Descrição detalhada"
                readOnly
                disabled
                rows={4}
                value={item.description || "-"}
                className="w-full px-4 py-3 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600 font-poppins font-normal">
                  Vídeo de demonstração
                </span>
                <input
                  id="video-demonstracao"
                  name="video-demonstracao"
                  type="text"
                  readOnly
                  disabled
                  value={item.videoUrl || "-"}
                  className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600 font-poppins font-normal">
                  Versão da Unity
                </span>
                <input
                  id="versao-unity"
                  name="versao-unity"
                  type="text"
                  readOnly
                  disabled
                  value={item.unityVersion || "-"}
                  className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setIsRejectOpen(true)}
            className="flex items-center justify-center gap-1.5 w-[100px] h-8 border border-[#E02424] rounded-[8px] font-poppins text-xs text-[#E02424] hover:bg-red-50 transition-colors"
          >
            <CircleX size={14} />
            Reprovar
          </button>
          <button
            onClick={() => setIsApproveOpen(true)}
            className="flex items-center justify-center gap-1.5 w-[100px] h-8 border border-[#16A34A] rounded-[8px] font-poppins text-xs text-[#16A34A] hover:bg-green-50 transition-colors"
          >
            <CircleCheck size={14} />
            Aprovar
          </button>
        </div>
      </div>

      <StatusModal
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        onConfirm={handleConfirmApprove}
        title="Aprovar edição"
        subtitle="Atenção: tem certeza que deseja aprovar a edição desta mecânica?"
        showJustificativa={false}
        confirmText={submitting ? "Aprovando..." : "Confirmar"}
      />

      <StatusModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleConfirmReject}
        title="Reprovar edição"
        subtitle="Forneça a justificativa para a reprovação"
        placeholder="Descreva o motivo da reprovação...."
        justificativa={justificativa}
        onJustificativaChange={setJustificativa}
        showJustificativa={true}
        confirmText={submitting ? "Reprovando..." : "Confirmar"}
      />
    </div>
  );
}

export default function AnalisarEdicaoPage() {
  return (
    <Suspense fallback={
      <div className="pt-10 pb-10 px-[29.5px] font-poppins text-gray-500">
        Carregando...
      </div>
    }>
      <AnalisarEdicaoContent />
    </Suspense>
  );
}
