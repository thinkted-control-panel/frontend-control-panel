"use client";
import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleCheck, CircleX, Copy, X, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { StatusModal } from "@/components/StatusModal";
import * as MechanicService from "@/services/thinklib/MechanicService";
import { IMechanic } from "@/interfaces/thinklib/IMechanic";

function VisualizarMecanicaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [item, setItem] = useState<IMechanic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [justificativa, setJustificativa] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadMechanic = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const mechanic = await MechanicService.getMechanicById(id, "Pending");
      setItem(mechanic);
    } catch (err) {
      console.error("[ThinkLib] Failed to load mechanic:", err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { loadMechanic(); }, [loadMechanic]);

  if (isLoading || !item) {
    return (
      <div className="pt-10 pb-10 px-[29.5px] font-poppins text-gray-500">
        Carregando dados da mecânica...
      </div>
    );
  }

  const category = item.categoryName || "-";
  let dotColor = "bg-gray-400";
  if (category.toLowerCase() === "plataforma") dotColor = "bg-[#D83941]";
  else if (category.toLowerCase() === "point-and-click") dotColor = "bg-[#EAAE31]";
  else if (category.toLowerCase() === "tower defense") dotColor = "bg-[#1C64F2]";

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    toast.success("Código copiado para a área de transferência!");
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleConfirmApprove = async () => {
    if (!id) return;
    setSubmitting(true);
    try {
      await MechanicService.reviewMechanic(id, "Approved");
      setIsApproveOpen(false);
      toast.success(
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-[#16A34A] text-sm font-poppins">Sucesso</span>
          <span className="text-xs text-[#5D657F] font-poppins">Mecânica foi aprovada.</span>
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
      console.error("[ThinkLib] Failed to approve mechanic:", err);
      toast.error("Não foi possível aprovar a mecânica.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!id || !justificativa.trim()) return;
    setSubmitting(true);
    try {
      await MechanicService.reviewMechanic(id, "Rejected", justificativa.trim());
      setIsRejectOpen(false);
      toast.error(
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-[#E02424] text-sm font-poppins">Atenção</span>
          <span className="text-xs text-[#5D657F] font-poppins">Mecânica reprovada.</span>
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
      console.error("[ThinkLib] Failed to reject mechanic:", err);
      toast.error("Não foi possível reprovar a mecânica.");
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
        <span className="font-semibold text-gray-700">Visualizar</span>
      </div>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-poppins font-medium text-[20px] text-[#142E82] tracking-wide antialiased">
          Analisar mecânica submetida
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
          <h2 className="text-base font-semibold text-[#0D0C0B] font-poppins mb-4">
            Detalhes da Mecânica
          </h2>

          <div className="flex flex-col gap-5">
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
                value={item.name ?? ""}
                className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600 font-poppins font-normal">
                  Categoria da mecânica
                </span>
                <div className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
                  <span className="text-gray-700 font-poppins text-sm">{category}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-600 font-poppins font-normal">
                  Tipo de mecânica
                </span>
                <input
                  id="tipo-mecanica"
                  name="tipo-mecanica"
                  title="Tipo de mecânica"
                  placeholder="Tipo de mecânica"
                  type="text"
                  readOnly
                  disabled
                  value={item.typeName ?? ""}
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
                value={item.presentationText ?? ""}
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
                value={item.description ?? "-"}
                className="w-full px-4 py-3 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm resize-none"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-200 my-2" />

        <div>
          <h2 className="text-base font-semibold text-[#0D0C0B] font-poppins mb-4">
            Informações do Código
          </h2>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">
                Versão da Unity
              </span>
              <div className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] flex items-center justify-between text-gray-700 font-poppins text-sm select-none">
                <span>{item.unityVersion ?? "-"}</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            {(item.sourceFiles ?? []).map((file, idx) => (
              <div key={file.id ?? idx} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-600 font-poppins font-normal">
                    Nome do código*
                  </span>
                  <input
                    id={`nome-codigo-${idx}`}
                    name={`nome-codigo-${idx}`}
                    title="Nome do código"
                    placeholder="Nome do código"
                    type="text"
                    readOnly
                    disabled
                    value={file.fileName}
                    className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-600 font-poppins font-normal">
                    Código da mecânica
                  </span>
                  <div className="relative rounded-[8px] overflow-hidden bg-[#0A0D1A] border border-gray-800">
                    <div className="flex justify-end bg-[#131930] px-4 py-2 border-b border-gray-800">
                      <button
                        onClick={() => handleCopyCode(file.fileContent, idx)}
                        className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white font-poppins transition-colors"
                      >
                        <Copy size={13} />
                        {copiedIndex === idx ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                    <pre className="p-4 text-gray-100 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed">
                      <code>{file.fileContent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-200 my-2" />

        <div>
          <h2 className="text-base font-semibold text-[#0D0C0B] font-poppins mb-4">
            Mídias da mecânica
          </h2>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">
                Vídeo de demonstração
              </span>
              <input
                id="video-demonstracao"
                name="video-demonstracao"
                title="Vídeo de demonstração"
                placeholder="Vídeo de demonstração"
                type="text"
                readOnly
                disabled
                value={item.videoUrl ?? ""}
                className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-500 font-poppins text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">
                GIF da mecânica
              </span>
              {item.gifUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.gifUrl} alt="GIF da mecânica" className="w-full h-40 object-contain rounded-[8px] border border-[#CDD0DA] bg-[#F8FAFC]" />
              ) : (
                <div className="w-full h-40 rounded-[8px] border-2 border-dashed border-[#CDD0DA] bg-[#F8FAFC] flex items-center justify-center text-sm text-gray-400 font-poppins">
                  Sem GIF
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">
                Imagem da capa
              </span>
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt="Imagem da capa" className="w-full h-40 object-contain rounded-[8px] border border-[#CDD0DA] bg-[#F8FAFC]" />
              ) : (
                <div className="w-full h-40 rounded-[8px] border-2 border-dashed border-[#CDD0DA] bg-[#F8FAFC] flex items-center justify-center text-sm text-gray-400 font-poppins">
                  Sem imagem
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setIsRejectOpen(true)}
            className="flex items-center justify-center gap-2 w-48 h-12 border border-[#E02424] rounded-[8px] font-poppins font-medium text-sm text-[#E02424] hover:bg-red-50 transition-colors"
          >
            <CircleX size={16} />
            Reprovar
          </button>
          <button
            onClick={() => setIsApproveOpen(true)}
            className="flex items-center justify-center gap-2 w-48 h-12 border border-[#16A34A] rounded-[8px] font-poppins font-medium text-sm text-[#16A34A] hover:bg-green-50 transition-colors"
          >
            <CircleCheck size={16} />
            Aprovar
          </button>
        </div>
      </div>

      <StatusModal
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        onConfirm={handleConfirmApprove}
        title="Aprovar mecânica"
        subtitle="Atenção: tem certeza que deseja aprovar esta mecânica?"
        showJustificativa={false}
        confirmText={submitting ? "Aprovando..." : "Confirmar"}
      />

      <StatusModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleConfirmReject}
        title="Reprovar mecânica"
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

export default function VisualizarMecanicaPage() {
  return (
    <Suspense fallback={
      <div className="pt-10 pb-10 px-[29.5px] font-poppins text-gray-500">
        Carregando...
      </div>
    }>
      <VisualizarMecanicaContent />
    </Suspense>
  );
}
