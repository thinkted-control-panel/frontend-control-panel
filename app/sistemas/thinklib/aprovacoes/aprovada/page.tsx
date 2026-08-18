"use client";
import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Copy, X } from "lucide-react";
import { toast } from "react-toastify";
import * as MechanicService from "@/services/thinklib/MechanicService";
import { IMechanic, IMechanicEditRequest } from "@/interfaces/thinklib/IMechanic";

function fmtDate(iso?: string | null): string {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
  } catch {
    return iso;
  }
}

function MecanicaAprovadaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const tab = searchParams.get("tab") || "mecanicas";

  const [mechanic, setMechanic] = useState<IMechanic | null>(null);
  const [editRequest, setEditRequest] = useState<IMechanicEditRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const loadItem = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      if (tab === "edicao") {
        const res = await MechanicService.getMechanicEditRequests({ pageNumber: 1, pageSize: 200 });
        setEditRequest((res.items ?? []).find((e) => e.id === id) ?? null);
      } else {
        setMechanic(await MechanicService.getMechanicById(id));
      }
    } catch (err) {
      console.error("[ThinkLib] Failed to load approved item:", err);
    } finally {
      setIsLoading(false);
    }
  }, [id, tab]);

  useEffect(() => { loadItem(); }, [loadItem]);

  const item = tab === "edicao" ? editRequest : mechanic;

  if (isLoading || !item) {
    return (
      <div className="pt-10 pb-10 px-[29.5px] font-poppins text-gray-500">
        {isLoading ? "Carregando dados da mecânica..." : "Item não encontrado."}
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

  return (
    <div className="pt-10 pb-10 px-[29.5px] flex flex-col gap-6 w-full bg-white min-h-screen">
      <div className="text-xs text-[#8E95A5] font-poppins -mb-2">
        Sistemas <span className="mx-1">/</span> ThinkLib{" "}
        <span className="mx-1">/</span>{" "}
        <span className="cursor-pointer hover:underline text-gray-500" onClick={() => router.push("/sistemas/thinklib/aprovacoes")}>
          Aprovações
        </span>{" "}
        <span className="mx-1">/</span>{" "}
        <span className="font-semibold text-gray-700">Detalhes da mecânica</span>
      </div>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-poppins font-medium text-[20px] text-[#142E82] tracking-wide antialiased">
          Detalhes da mecânica
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
          <h2 className="text-base font-semibold text-[#29324F] font-poppins mb-4">
            Informações do Código
          </h2>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">
                Versão da Unity
              </span>
              <input
                id="versao-unity"
                name="versao-unity"
                title="Versão da Unity"
                placeholder="Versão da Unity"
                type="text"
                readOnly
                disabled
                value={item.unityVersion ?? ""}
                className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
              />
            </div>

            {tab !== "edicao" && ((mechanic?.sourceFiles ?? []).map((file, idx) => (
              <div key={file.id ?? idx} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-600 font-poppins font-normal">
                    Nome do código*
                  </span>
                  <div className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] flex items-center justify-between text-gray-700 font-poppins text-sm select-none">
                    <span>{file.fileName}</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
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
            )))}
          </div>
        </div>

        {tab !== "edicao" && (
          <>
            <hr className="border-gray-200 my-2" />

            <div>
              <h2 className="text-base font-semibold text-[#29324F] font-poppins mb-4">
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
                    value={mechanic?.videoUrl ?? ""}
                    className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-500 font-poppins text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-600 font-poppins font-normal">
                    GIF da mecânica
                  </span>
                  {mechanic?.gifUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={mechanic.gifUrl} alt="GIF da mecânica" className="w-full h-40 object-contain rounded-[8px] border border-[#CDD0DA] bg-white" />
                  ) : (
                    <div className="w-full h-40 rounded-[8px] border-2 border-dashed border-[#CDD0DA] bg-white flex items-center justify-center text-sm text-gray-400 font-poppins">
                      Sem GIF
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-600 font-poppins font-normal">
                    Imagem da capa
                  </span>
                  {mechanic?.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={mechanic.imageUrl} alt="Imagem da capa" className="w-full h-40 object-contain rounded-[8px] border border-[#CDD0DA] bg-white" />
                  ) : (
                    <div className="w-full h-40 rounded-[8px] border-2 border-dashed border-[#CDD0DA] bg-white flex items-center justify-center text-sm text-gray-400 font-poppins">
                      Sem imagem
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <hr className="border-gray-200 my-2" />

        <div>
          <h2 className="text-base font-semibold text-[#29324F] font-poppins mb-4">
            Revisão
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">Aprovado por</span>
              <input
                type="text"
                readOnly
                disabled
                value={item.reviewedByName ?? "-"}
                className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">Data da aprovação</span>
              <input
                type="text"
                readOnly
                disabled
                value={fmtDate(item.reviewedAt)}
                className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={() => router.push("/sistemas/thinklib/aprovacoes")}
            className="w-[100px] h-8 flex items-center justify-center bg-[#1D43BE] rounded-[8px] font-poppins text-sm text-[#FCFCFD] hover:bg-[#142E82] transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MecanicaAprovadaPage() {
  return (
    <Suspense fallback={
      <div className="pt-10 pb-10 px-[29.5px] font-poppins text-gray-500">
        Carregando...
      </div>
    }>
      <MecanicaAprovadaContent />
    </Suspense>
  );
}
