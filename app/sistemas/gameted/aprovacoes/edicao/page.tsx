"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleCheck, CircleX, X, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { StatusModal } from "@/components/StatusModal";
import { CustomButton } from "@/components/forms/CustomButton";

interface GameEditRequestItem {
  id: string;
  name: string;
  user: string;
  category: string;
  description: string;
  dateTime: string;
  status: "Pendente" | "Aprovado" | "Reprovado";
  presentationText?: string;
  detailedDescription?: string;
}

const mockAtualizacoes: GameEditRequestItem[] = [
  {
    id: "g1",
    name: "Avalanche Silábica",
    user: "Cleidiana Alves...",
    category: "Digital",
    description: "-",
    dateTime: "18/04/2026 20:00",
    status: "Pendente",
    presentationText: "-",
    detailedDescription: "-",
  },
  {
    id: "g2",
    name: "RabbitCode",
    user: "Izaque Rolim",
    category: "Digital",
    description: "-",
    dateTime: "17/04/2026 20:00",
    status: "Pendente",
    presentationText: "Jogo de introdução à lógica de programação.",
    detailedDescription: "Inclusão de novos desafios e suporte a comandos avançados.",
  },
  {
    id: "g3",
    name: "DecifrAdas: cara a cara...",
    user: "Julya Campos",
    category: "Analógico",
    description: "-",
    dateTime: "16/04/2026 20:00",
    status: "Pendente",
    presentationText: "Jogo de cartas e adivinhação de palavras.",
    detailedDescription: "Ajuste de cartas e novas regras de rodadas.",
  },
  {
    id: "g4",
    name: "Hello Food",
    user: "Jeniffer Macena",
    category: "Digital",
    description: "-",
    dateTime: "15/04/2026 20:00",
    status: "Pendente",
    presentationText: "Jogo interativo de nutrição e culinária.",
    detailedDescription: "Ajustes de receitas e interface.",
  },
  {
    id: "g5",
    name: "Numéria: A Ilha dos Nú...",
    user: "Cristiana Pedro...",
    category: "Digital",
    description: "-",
    dateTime: "14/04/2026 20:00",
    status: "Aprovado",
  },
  {
    id: "g6",
    name: "Yere e a Ilha Precisa",
    user: "Manuela Bastos",
    category: "Digital",
    description: "-",
    dateTime: "14/04/2026 20:00",
    status: "Aprovado",
  },
  {
    id: "g7",
    name: "RabbitCode",
    user: "Izaque Rolim",
    category: "Digital",
    description: "-",
    dateTime: "13/04/2026 20:00",
    status: "Reprovado",
  },
  {
    id: "g8",
    name: "Fantasmafixo: um jogo...",
    user: "Flavia Brenda",
    category: "Digital",
    description: "-",
    dateTime: "12/02/2026 20:00",
    status: "Reprovado",
  },
  {
    id: "g9",
    name: "Optima Corporation",
    user: "Waldecir da Silv...",
    category: "Digital",
    description: "-",
    dateTime: "12/02/2026 20:00",
    status: "Pendente",
  },
  {
    id: "g10",
    name: "Fantasmafixo: um jogo...",
    user: "Flavia Brenda...",
    category: "Digital",
    description: "-",
    dateTime: "12/02/2026 20:00",
    status: "Aprovado",
  },
  {
    id: "g11",
    name: "DecifrAdas: cara a cara",
    user: "Julya Campos",
    category: "Analógico",
    description: "-",
    dateTime: "12/02/2026 20:00",
    status: "Reprovado",
  },
];

function AnalisarJogoEdicaoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [item, setItem] = useState<GameEditRequestItem | null>(null);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [justificativa, setJustificativa] = useState("");

  useEffect(() => {
    if (id) {
      const found = mockAtualizacoes.find((x) => x.id === id);
      if (found) {
        setItem(found);
        return;
      }
    }
    // Fallback padrão se nenhum ID for passado ou encontrado (ex: Avalanche Silábica)
    setItem(mockAtualizacoes[0]);
  }, [id]);

  if (!item) {
    return (
      <div className="pt-10 pb-10 px-[29.5px] font-poppins text-gray-500">
        Carregando dados do jogo...
      </div>
    );
  }

  const handleConfirmApprove = () => {
    setIsApproveOpen(false);
    toast.success(
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-[#16A34A] text-sm font-poppins">Sucesso</span>
        <span className="text-xs text-[#5D657F] font-poppins">Edição aprovada.</span>
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
    router.push("/sistemas/gameted/aprovacoes");
  };

  const handleConfirmReject = () => {
    setIsRejectOpen(false);
    toast.error(
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-[#E02424] text-sm font-poppins">Reprovação</span>
        <span className="text-xs text-[#5D657F] font-poppins">A edição do jogo foi reprovada.</span>
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
    router.push("/sistemas/gameted/aprovacoes");
  };

  const handleConfirmExit = () => {
    setIsExitOpen(false);
    router.push("/sistemas/gameted/aprovacoes");
  };

  return (
    <div className="pt-10 pb-10 px-[29.5px] flex flex-col gap-6 w-full bg-white min-h-screen">
      <div className="text-xs text-[#8E95A5] font-poppins -mb-2">
        Sistemas <span className="mx-1">/</span> GameTed{" "}
        <span className="mx-1">/</span>{" "}
        <span
          className="cursor-pointer hover:underline text-gray-500"
          onClick={() => setIsExitOpen(true)}
        >
          Aprovações
        </span>{" "}
        <span className="mx-1">/</span>{" "}
        <span className="font-semibold text-gray-700">Analisar edição</span>
      </div>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-poppins font-medium text-[20px] text-[#142E82] tracking-wide antialiased">
          Analisar jogo para edição
        </h1>
        <CustomButton
          onClick={() => setIsExitOpen(true)}
          variant="outline"
          width="80px"
          height="36px"
          backgroundColor="#ffffff"
          textColor="#6B7280"
          borderColor="#CDD0DA"
          borderRadius="8px"
          fontSize="12px"
          fontWeight={500}
        >
          <div className="flex items-center gap-1.5">
            <X size={14} className="text-gray-400" />
            <span>Sair</span>
          </div>
        </CustomButton>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div>
          <h2 className="text-base font-semibold text-[#29324F] font-poppins mb-4">
            Detalhes do jogo
          </h2>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="nome-jogo" className="text-sm text-gray-600 font-poppins font-normal">
                Nome do jogo
              </label>
              <input
                id="nome-jogo"
                name="nome-jogo"
                title="Nome do jogo"
                placeholder="Nome do jogo"
                type="text"
                readOnly
                disabled
                value={item.name}
                className="w-full h-11 px-4 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="apresentacao-jogo" className="text-sm text-gray-600 font-poppins font-normal">
                Texto de apresentação do jogo
              </label>
              <textarea
                id="apresentacao-jogo"
                name="apresentacao-jogo"
                title="Texto de apresentação do jogo"
                placeholder="Texto de apresentação"
                readOnly
                disabled
                rows={3}
                value={item.presentationText || "-"}
                className="w-full px-4 py-3 rounded-[8px] border border-[#CDD0DA] bg-[#F1F3F9] text-gray-700 font-poppins text-sm resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="descricao-jogo" className="text-sm text-gray-600 font-poppins font-normal">
                Descrição detalhada do jogo
              </label>
              <textarea
                id="descricao-jogo"
                name="descricao-jogo"
                title="Descrição detalhada do jogo"
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

        <div className="flex items-center justify-center gap-3 mt-4">
          <CustomButton
            onClick={() => setIsRejectOpen(true)}
            variant="outline"
            width="100px"
            height="32px"
            backgroundColor="#ffffff"
            textColor="#E02424"
            borderColor="#E02424"
            borderRadius="8px"
            fontSize="12px"
            fontWeight={400}
          >
            <div className="flex items-center gap-1.5">
              <CircleX size={14} />
              <span>Reprovar</span>
            </div>
          </CustomButton>

          <CustomButton
            onClick={() => setIsApproveOpen(true)}
            variant="outline"
            width="100px"
            height="32px"
            backgroundColor="#ffffff"
            textColor="#16A34A"
            borderColor="#16A34A"
            borderRadius="8px"
            fontSize="12px"
            fontWeight={400}
          >
            <div className="flex items-center gap-1.5">
              <CircleCheck size={14} />
              <span>Aprovar</span>
            </div>
          </CustomButton>
        </div>
      </div>

      <StatusModal
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        onConfirm={handleConfirmApprove}
        title="Aprovar edição desse jogo"
        subtitle="Atenção: tem certeza que deseja aprovar a edição desse jogo?"
        confirmText="Confirmar"
        confirmVariant="primary"
        showJustificativa={false}
      />

      <StatusModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleConfirmReject}
        title="Reprovar edição desse jogo"
        subtitle="Forneça a justificativa para a reprovação"
        placeholder="Descreva o motivo da reprovação...."
        justificativa={justificativa}
        onJustificativaChange={setJustificativa}
        confirmText="Confirmar"
        confirmVariant="primary"
        showJustificativa={true}
      />

      <StatusModal
        isOpen={isExitOpen}
        onClose={() => setIsExitOpen(false)}
        onConfirm={handleConfirmExit}
        title="Deseja sair desta página?"
        subtitle="As informações preenchidas até o momento não serão salvas caso você saia agora."
        confirmText="Sair"
        confirmVariant="danger"
        showJustificativa={false}
      />
    </div>
  );
}

export default function AnalisarJogoEdicaoPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-10 pb-10 px-[29.5px] font-poppins text-gray-500">
          Carregando...
        </div>
      }
    >
      <AnalisarJogoEdicaoContent />
    </Suspense>
  );
}
