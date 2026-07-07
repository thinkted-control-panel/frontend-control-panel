"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Copy, X } from "lucide-react";
import { toast } from "react-toastify";

interface CodeFile {
  name: string;
  code: string;
}

interface ApprovedItem {
  id: string;
  name: string;
  category: string;
  description: string;
  dateTime: string;
  status: "Pendente" | "Aprovado" | "Reprovado";
  type?: string;
  presentationText?: string;
  detailedDescription?: string;
  unityVersion?: string;
  codeFiles?: CodeFile[];
  demoVideo?: string;
  active?: boolean;
}

const mockMecanicas: ApprovedItem[] = [
  {
    id: "5",
    name: "Ataque Corpo a Corpo",
    category: "Plataforma",
    description: "Mecânica de combate direto...",
    dateTime: "14/04/2026 20:00:12",
    status: "Aprovado",
    type: "Combate",
    presentationText: "Mecânica de combate direto com sistema.",
    detailedDescription: "-",
    unityVersion: "6000.1.1",
    codeFiles: [
      {
        name: "PlayerMeleeAttackController.cs",
        code: `using UnityEngine;\nusing UnityEngine.UI;\n\npublic class PlayerMeleeAttackController : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("Melee attack initialized");\n    }\n}`
      }
    ],
    demoVideo: "https://www.figma.com/design",
    active: true
  },
  {
    id: "6",
    name: "Ataque Corpo a Corpo",
    category: "Point-and-Click",
    description: "Mecânica de combate direto...",
    dateTime: "14/04/2026 20:00:12",
    status: "Aprovado",
    type: "Combate",
    presentationText: "Mecânica de combate direto com sistema.",
    detailedDescription: "-",
    unityVersion: "6000.1.1",
    codeFiles: [
      {
        name: "PlayerMeleeAttackController.cs",
        code: `using UnityEngine;\nusing UnityEngine.UI;\n\npublic class PlayerMeleeAttackController : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("Melee attack initialized");\n    }\n}`
      }
    ],
    demoVideo: "https://www.figma.com/design",
    active: true
  },
];

const mockEdicoes: ApprovedItem[] = [
  {
    id: "e3",
    name: "Dash Lateral",
    category: "Tower Defense",
    description: "Esquiva rápida para as laterais...",
    dateTime: "15/04/2026 09:20:45",
    status: "Aprovado",
    type: "Movimento",
    presentationText: "Esquiva rápida para as laterais...",
    detailedDescription: "-",
    unityVersion: "6000.1.1",
    codeFiles: [
      {
        name: "SideDash.cs",
        code: `using UnityEngine;\n\npublic class SideDash : MonoBehaviour\n{\n}`
      }
    ],
    demoVideo: "https://www.figma.com/design",
    active: true
  },
];

function MecanicaAprovadaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const tab = searchParams.get("tab") || "mecanicas";

  const [item, setItem] = useState<ApprovedItem | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (id) {
      const sourceList = tab === "edicao" ? mockEdicoes : mockMecanicas;
      const found = sourceList.find((x) => x.id === id);
      if (found) {
        setItem(found);
        setIsActive(found.active ?? true);
      }
    }
  }, [id, tab]);

  if (!item) {
    return (
      <div className="pt-10 pb-10 px-[29.5px] font-poppins text-gray-500">
        Carregando dados da mecânica...
      </div>
    );
  }

  const category = item.category || "Point-and-Click";
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

  const handleToggleActive = () => {
    setIsActive((prev) => {
      const next = !prev;
      toast.success(next ? "Mecânica ativada no sistema." : "Mecânica desativada no sistema.");
      return next;
    });
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
                value={item.name}
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
                  value={item.type || "Combate"}
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
                value={item.presentationText || "Mecânica de combate direto com sistema."}
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
                value={item.detailedDescription || "-"}
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
                value={item.unityVersion || "6000.1.1"}
                className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
              />
            </div>

            {(item.codeFiles || []).map((file, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-600 font-poppins font-normal">
                    Nome do código*
                  </span>
                  <div className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] flex items-center justify-between text-gray-700 font-poppins text-sm select-none">
                    <span>{file.name}</span>
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
                        onClick={() => handleCopyCode(file.code, idx)}
                        className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white font-poppins transition-colors"
                      >
                        <Copy size={13} />
                        {copiedIndex === idx ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                    <pre className="p-4 text-gray-100 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed">
                      <code>{file.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                value={item.demoVideo || "https://www.figma.com/design"}
                className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-500 font-poppins text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">
                GIF da mecânica
              </span>
              <div className="w-full h-40 rounded-[8px] border-2 border-dashed border-[#CDD0DA] bg-white flex items-center px-7">
                <div className="w-[134px] h-[122px] rounded-[10px] bg-[#EEF3FF] flex flex-col items-center justify-center gap-1">
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-xs font-medium text-[#1D43BE] font-poppins">+ Anexar imagem</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600 font-poppins font-normal">
                Imagem da capa
              </span>
              <div className="w-full h-40 rounded-[8px] border-2 border-dashed border-[#CDD0DA] bg-white flex items-center px-7">
                <div className="w-[134px] h-[122px] rounded-[10px] bg-[#EEF3FF] flex flex-col items-center justify-center gap-1">
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-xs font-medium text-[#1D43BE] font-poppins">+ Anexar imagem</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 my-2" />

        <div>
          <h2 className="text-base font-semibold text-[#29324F] font-poppins mb-4">
            Alterar visibilidade da mecânica
          </h2>

          <div className="flex flex-col gap-3">
            <span className="text-sm text-gray-600 font-poppins font-normal">
              Status no sistema
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              onClick={handleToggleActive}
              className="flex items-center gap-2 w-fit"
            >
              <span
                className={`relative inline-flex h-[14px] w-[27px] items-center rounded-full transition-colors ${
                  isActive ? "bg-[#1D43BE]" : "bg-[#CDD0DA]"
                }`}
              >
                <span
                  className={`inline-block h-[10px] w-[10px] rounded-full bg-white transition-transform ${
                    isActive ? "translate-x-[15px]" : "translate-x-[2px]"
                  }`}
                />
              </span>
              <span className="text-xs text-[#5D657F] font-poppins">
                {isActive ? "Ativa" : "Inativa"}
              </span>
            </button>
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
