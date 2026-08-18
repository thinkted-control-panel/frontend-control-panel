"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, ClipboardPaste, ImageIcon, Trash2 } from "lucide-react";
import * as CategoryService from "@/services/thinklib/CategoryService";
import * as MechanicTypeService from "@/services/thinklib/MechanicTypeService";
import * as MechanicService from "@/services/thinklib/MechanicService";
import * as StorageService from "@/services/thinklib/StorageService";
import type { IGameCategory } from "@/interfaces/thinklib/IGameCategory";
import type { IMechanicType } from "@/interfaces/thinklib/IMechanicType";
import type { IMechanicFile } from "@/interfaces/thinklib/IMechanic";

interface CodeBlock {
  id: string;
  fileName: string;
  content: string;
}

const UNITY_VERSIONS = [
  "2021.3.0f1",
  "2022.3.5f1",
  "2022.3.10f1",
  "2023.1.0f1",
  "2023.2.0f1",
  "6000.0.0f1",
];

function UploadArea({
  label,
  accept,
  preview,
  buttonLabel,
  onFile,
  onRemove,
}: {
  label: string;
  accept: string;
  preview: string | null;
  buttonLabel: string;
  onFile: (f: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#0D0C0B] font-poppins">{label}</label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#1D43BE] transition-colors"
        onClick={() => !preview && inputRef.current?.click()}
      >
        {preview ? (
          <div className="flex items-center gap-4">
            <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded-md" />
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="text-[#E02424] hover:text-red-700 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 bg-[#EEF2FF] rounded-lg flex flex-col items-center justify-center gap-1">
            <ImageIcon size={32} className="text-[#1D43BE]" />
            <span className="text-xs text-[#1D43BE] font-poppins font-medium text-center px-1">{buttonLabel}</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
        />
      </div>
    </div>
  );
}

const selectClass =
  "w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400 bg-white text-[#0D0C0B] font-poppins appearance-none";
const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238E95A5' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "right 14px center",
};
const labelClass = "text-sm font-medium text-[#0D0C0B] font-poppins";
const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-400 font-poppins placeholder-gray-400";

export default function CriarMecanicaPage() {
  const router = useRouter();

  // ── API data ─────────────────────────────────────────────────────────────────
  const [categories, setCategories] = useState<IGameCategory[]>([]);
  const [tipos, setTipos] = useState<IMechanicType[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingTipos, setLoadingTipos] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Form state ────────────────────────────────────────────────────────────────
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [presentationText, setPresentationText] = useState("");
  const [description, setDescription] = useState("");
  const [unityVersion, setUnityVersion] = useState("");
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([
    { id: "1", fileName: "", content: "" },
  ]);
  const [videoUrl, setVideoUrl] = useState("");
  const [gifFile, setGifFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [gifPreview, setGifPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // ── Load categories on mount ──────────────────────────────────────────────────
  useEffect(() => {
    CategoryService.getCategories()
      .then((res) => setCategories(res.items ?? []))
      .catch(console.error)
      .finally(() => setLoadingCats(false));
  }, []);

  // ── Load types when category changes ─────────────────────────────────────────
  useEffect(() => {
    if (!categoryId) { setTipos([]); setTipoId(""); return; }
    setLoadingTipos(true);
    setTipoId("");
    MechanicTypeService.getTypesByCategory(categoryId)
      .then((res) => setTipos(res.items ?? []))
      .catch(console.error)
      .finally(() => setLoadingTipos(false));
  }, [categoryId]);

  // ── Code block handlers ───────────────────────────────────────────────────────
  const addCodeBlock = () =>
    setCodeBlocks((p) => [...p, { id: Date.now().toString(), fileName: "", content: "" }]);

  const removeCodeBlock = (id: string) =>
    setCodeBlocks((p) => p.filter((b) => b.id !== id));

  const updateBlock = (id: string, field: "fileName" | "content", val: string) =>
    setCodeBlocks((p) => p.map((b) => (b.id === id ? { ...b, [field]: val } : b)));

  const handlePaste = async (id: string) => {
    try {
      const text = await navigator.clipboard.readText();
      updateBlock(id, "content", text);
    } catch {}
  };

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setError(null);

    if (!name.trim() || !categoryId || !tipoId || !unityVersion) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    setSubmitting(true);
    try {
      const uploadedFiles: IMechanicFile[] = [];

      if (imageFile) {
        const dto = await StorageService.uploadFile(imageFile, "Image");
        uploadedFiles.push(dto);
      }

      if (gifFile) {
        const dto = await StorageService.uploadFile(gifFile, "Gif");
        uploadedFiles.push(dto);
      }

      await MechanicService.createMechanic({
        name: name.trim(),
        presentationText: presentationText.trim(),
        description: description.trim(),
        videoUrl: videoUrl.trim() || " ", // API requires minLength:1
        unityVersion,
        sourceFiles: codeBlocks
          .filter((b) => b.fileName.trim())
          .map((b) => ({ fileName: b.fileName.trim(), fileContent: b.content })),
        categoryId,
        typeId: tipoId,
        files: uploadedFiles,
      });

      router.push("/sistemas/thinklib/itens");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao salvar mecânica.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-10 pb-16 px-[29.5px] flex flex-col gap-8 w-full bg-white">

      {/* ── Cabeçalho ── */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1D43BE] font-poppins">Criar mecânica</h1>
        <button
          onClick={() => router.push("/sistemas/thinklib/itens")}
          className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-md text-sm text-[#0D0C0B] hover:bg-gray-50 transition-colors font-poppins"
        >
          <X size={14} />
          Sair
        </button>
      </div>

      {error && (
        <div className="px-4 py-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-md text-sm text-[#E02424] font-poppins">
          {error}
        </div>
      )}

      {/* ── Seção 1: Detalhes ── */}
      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-bold text-[#0D0C0B] font-poppins">Detalhes da Mecânica</h2>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>
            Nome da mecânica<span className="text-[#E02424]">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Insira o nome da mecânica"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>
              Categoria da mecânica <span className="text-[#E02424]">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={selectClass}
              style={selectStyle}
              disabled={loadingCats}
            >
              <option value="" disabled>
                {loadingCats ? "Carregando..." : "Selecione uma categoria"}
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>
              Tipo de mecânica<span className="text-[#E02424]">*</span>
            </label>
            <select
              value={tipoId}
              onChange={(e) => setTipoId(e.target.value)}
              className={selectClass}
              style={selectStyle}
              disabled={!categoryId || loadingTipos}
            >
              <option value="" disabled>
                {!categoryId
                  ? "Selecione uma categoria primeiro"
                  : loadingTipos
                  ? "Carregando..."
                  : "Selecione um tipo de mecânica"}
              </option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>
            Texto de apresentação<span className="text-[#E02424]">*</span>{" "}
            <span className="text-[#8E95A5] font-normal">({presentationText.length}/120 caracteres)</span>
          </label>
          <textarea
            value={presentationText}
            onChange={(e) => setPresentationText(e.target.value.slice(0, 120))}
            placeholder="Ex: Esta mecânica permite que o jogador utilize uma habilidades especial de teletransporte para aravessar..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>
            Descrição detalhada da mecânica<span className="text-[#E02424]">*</span>{" "}
            <span className="text-[#8E95A5] font-normal">({description.length}/800 caracteres)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 800))}
            placeholder="Ex: O sistema de teletransporte é ativado ao segurar o botão de ação por 2 segundos, fazendo com que o personage..."
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* ── Seção 2: Informações do Código ── */}
      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-bold text-[#0D0C0B] font-poppins">Informações do Código</h2>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Versão Unity<span className="text-[#E02424]">*</span></label>
          <select
            value={unityVersion}
            onChange={(e) => setUnityVersion(e.target.value)}
            className={selectClass}
            style={selectStyle}
          >
            <option value="" disabled>Selecione a versão da Unity</option>
            {UNITY_VERSIONS.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        {codeBlocks.map((block, idx) => (
          <div key={block.id} className="flex flex-col gap-4">
            {codeBlocks.length > 1 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#8E95A5] font-poppins">Código {idx + 1}</span>
                <button onClick={() => removeCodeBlock(block.id)} className="text-[#E02424] hover:text-red-700 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Nome do código<span className="text-[#E02424]">*</span></label>
              <input
                type="text"
                value={block.fileName}
                onChange={(e) => updateBlock(block.id, "fileName", e.target.value)}
                placeholder="Ex: PlayerController"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className={labelClass}>
                  Código da mecânica<span className="text-[#E02424]">*</span>
                </label>
                <button
                  onClick={() => handlePaste(block.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-xs text-[#5D657F] hover:bg-gray-50 transition-colors font-poppins"
                >
                  <ClipboardPaste size={13} />
                  Colar
                </button>
              </div>
              <div className="rounded-md overflow-hidden border border-gray-800">
                <div className="bg-[#0D1117] px-4 py-2 text-xs text-gray-500 font-mono border-b border-gray-800">
                  {block.fileName || "C#"}
                </div>
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, "content", e.target.value)}
                  placeholder="Insira o código da mecânica criada na linguagem C#"
                  rows={10}
                  className="w-full bg-[#0D1117] text-gray-100 px-4 py-3 font-mono text-sm focus:outline-none resize-none placeholder-gray-600"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            onClick={addCodeBlock}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-md text-sm text-[#0D0C0B] hover:bg-gray-50 transition-colors font-poppins"
          >
            <Plus size={14} />
            Código
          </button>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* ── Seção 3: Mídias ── */}
      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-bold text-[#0D0C0B] font-poppins">Mídias da mecânica</h2>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Vídeo de demonstração</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Insira o link"
            className={inputClass}
          />
        </div>

        <UploadArea
          label="GIF da mecânica"
          accept="image/gif,image/*"
          preview={gifPreview}
          buttonLabel="+ Anexar GIF"
          onFile={(f) => { setGifFile(f); setGifPreview(URL.createObjectURL(f)); }}
          onRemove={() => { setGifFile(null); setGifPreview(null); }}
        />

        <UploadArea
          label="Imagem da capa"
          accept="image/*"
          preview={imagePreview}
          buttonLabel="+ Anexar imagem"
          onFile={(f) => { setImageFile(f); setImagePreview(URL.createObjectURL(f)); }}
          onRemove={() => { setImageFile(null); setImagePreview(null); }}
        />
      </section>

      {/* ── Salvar ── */}
      <div className="flex justify-center pt-4 pb-4">
        <button
          onClick={handleSave}
          disabled={submitting}
          className="px-12 py-3 bg-[#1D43BE] text-white rounded-lg text-sm font-medium font-poppins hover:bg-[#1635a0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
