"use client";

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { StatusModal } from './StatusModal';
import { registerSchema, type RegisterFormData } from '@/schemas/registerSchema';
import { formatDate, formatPhone } from '@/utils/masks';
import { getUser, updateUser } from '@/services/UserService';
import { IUpdateUser } from '@/interfaces/IUpdateUser';
import { handleApiError, parseApiError } from '@/utils/handleApiError';
import { showToast } from '@/utils/toast';

interface User {
  id: string;
  name: string;
  email: string;
  systems: string[];
  status: 'Ativo' | 'Suspenso';
}

interface EditAdminFormProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

type Permissoes = RegisterFormData['permissoes'];

// Converte as policies vindas da API nos checkboxes de permissões
const buildPermissoesFromPolicies = (policies: string[]): Permissoes => {
  const gameClass = policies.includes('GameClass');
  const gameTed = policies.includes('GameTED') || policies.includes('GTE');
  const glBoard = policies.includes('GLBoard') || policies.includes('GLB');
  const thinkLib = policies.includes('ThinkLib') || policies.includes('Lib');
  const thinktest = policies.includes('ThinkTest') || policies.includes('Test');
  const thinkTedSystem = policies.includes('ThinkTEd');
  return {
    gameClass,
    gameTed,
    glBoard,
    thinkLib,
    thinktest,
    thinkTedSystem,
    todos:
      gameClass && gameTed && glBoard && thinkLib && thinktest && thinkTedSystem,
  };
};

// Converte os checkboxes de permissões de volta em policies para a API
const buildPolicies = (permissoes: Permissoes): string[] => {
  const policies: string[] = [];
  if (permissoes.gameClass) policies.push('GameClass');
  if (permissoes.gameTed) policies.push('GameTED');
  if (permissoes.glBoard) policies.push('GLBoard');
  if (permissoes.thinkLib) policies.push('ThinkLib');
  if (permissoes.thinktest) policies.push('ThinkTest');
  if (permissoes.thinkTedSystem) policies.push('ThinkTEd');
  return policies;
};

// Formata uma data (Date ou ISO string) para DD/MM/AAAA
const formatBirthday = (value: Date | string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
};

export const EditAdminForm: React.FC<EditAdminFormProps> = ({ user, onClose, onSave }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'Ativo' | 'Suspenso'>(user.status);

  const [showModal, setShowModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<'Ativo' | 'Suspenso' | null>(null);
  const [justificativa, setJustificativa] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: user.name,
      email: user.email,
      dataNascimento: '',
      telefone: '',
      instituicao: '',
      senha: 'aB3$fjwmd',
      exigirTrocaSenha: true,
      objetivo: '',
      tipos: { estudante: false, professor: false, pesquisador: false },
      permissoes: buildPermissoesFromPolicies(user.systems),
    },
  });

  const permissoes = watch('permissoes');

  // Busca os dados completos do usuário para preencher o formulário
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const full = await getUser(user.id);
        if (!active) return;
        reset({
          nome:
            `${full.firstName ?? ''} ${full.lastName ?? ''}`.trim() ||
            full.username,
          email: full.email,
          dataNascimento: formatBirthday(full.birthday),
          telefone: '',
          instituicao: full.institution ?? '',
          senha: 'aB3$fjwmd',
          exigirTrocaSenha: true,
          objetivo: full.objective ?? '',
          tipos: { estudante: false, professor: false, pesquisador: false },
          permissoes: buildPermissoesFromPolicies(full.permissionPolicies ?? []),
        });
        setStatus(full.isActive ? 'Ativo' : 'Suspenso');
      } catch (error) {
        handleApiError(error, 'Erro ao carregar os dados do usuário.');
      }
    })();
    return () => {
      active = false;
    };
  }, [user.id, reset]);

  const handleToggleStatus = () => {
    const nextStatus = status === 'Ativo' ? 'Suspenso' : 'Ativo';
    setPendingStatus(nextStatus);
    setJustificativa('');
    setShowModal(true);
  };

  const handleConfirmStatusChange = () => {
    if (pendingStatus) {
      setStatus(pendingStatus);
    }
    setShowModal(false);
    setPendingStatus(null);
  };

  const handleToggleTodos = (checked: boolean) => {
    setValue('permissoes', {
      gameClass: checked,
      gameTed: checked,
      glBoard: checked,
      thinkLib: checked,
      thinktest: checked,
      thinkTedSystem: checked,
      todos: checked,
    });
  };

  const handleTogglePermissao = (key: keyof Permissoes, checked: boolean) => {
    const next = { ...permissoes, [key]: checked };
    next.todos =
      next.gameClass &&
      next.gameTed &&
      next.glBoard &&
      next.thinkLib &&
      next.thinktest &&
      next.thinkTedSystem;
    setValue('permissoes', next);
  };

  const onSubmit = async (data: RegisterFormData) => {
    const [firstName, ...rest] = data.nome.trim().split(/\s+/);
    const [day, month, year] = data.dataNascimento.split('/').map(Number);

    const payload: IUpdateUser = {
      email: data.email.trim(),
      firstName,
      lastName: rest.join(' '),
      birthday: new Date(year, month - 1, day),
      institution: data.instituicao,
      objective: data.objetivo,
      isActive: status === 'Ativo',
      permissionPolicies: buildPolicies(data.permissoes),
    };

    // Só envia a senha se ela foi alterada
    if (dirtyFields.senha) {
      payload.password = data.senha;
    }

    try {
      const updated = await updateUser(user.id, payload);
      toast.success('Usuário atualizado com sucesso!');
      onSave({
        id: user.id,
        name: `${updated.firstName ?? ''} ${updated.lastName ?? ''}`.trim(),
        email: updated.email,
        systems: updated.permissionPolicies ?? [],
        status: updated.isActive ? 'Ativo' : 'Suspenso',
      });
      onClose();
    } catch (error) {
      const { status, message } = parseApiError(error, 'Erro ao atualizar usuário. Tente novamente.');

      if (status === 409) {
        setError('email', { message });
        return;
      }

      showToast.error(message);
    }
  };

  return (
    <div className="relative w-full bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white flex flex-col gap-8">

        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <h1 className="font-poppins font-medium text-[22px] text-[#142E82] tracking-wide antialiased">
              Editar usuário admin
            </h1>
            {status === 'Ativo' ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[#16A34A] bg-[#F0FDF4] rounded-full border border-[#DCFCE7]">
                Ativo
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[#D97706] bg-[#FFFBEB] rounded-full border border-[#FEF3C7]">
                Suspenso
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="border border-[#CDD0DA] text-gray-500 px-4 py-1.5 rounded-[8px] hover:bg-gray-50 transition font-poppins text-xs flex items-center gap-1.5"
          >
            <span>×</span> Sair
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-base font-semibold text-[#0D0C0B] font-poppins">
            Informações do usuário
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
                Nome*
              </label>
              <input
                type="text"
                {...register('nome')}
                placeholder="Insira o nome do usuário"
                className={`w-full px-4 py-2.5 text-sm text-gray-900 border rounded-[8px] focus:outline-none focus:ring-1 placeholder-gray-400 transition ${
                  errors.nome
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
                    : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900'
                }`}
              />
              {errors.nome && (
                <span className="text-xs text-red-500 font-poppins mt-0.5">
                  {errors.nome.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
                Email*
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="mariana.souza@exemplo.com"
                className={`w-full px-4 py-2.5 text-sm text-gray-900 border rounded-[8px] focus:outline-none focus:ring-1 transition ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
                    : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900'
                }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500 font-poppins mt-0.5">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
                Data de nascimento*
              </label>
              <input
                type="text"
                {...register('dataNascimento')}
                onChange={(e) =>
                  setValue('dataNascimento', formatDate(e.target.value), {
                    shouldValidate: true,
                  })
                }
                placeholder="DD/MM/AAAA"
                className={`w-full px-4 py-2.5 text-sm text-gray-900 border rounded-[8px] focus:outline-none focus:ring-1 placeholder-gray-400 transition ${
                  errors.dataNascimento
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
                    : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900'
                }`}
              />
              {errors.dataNascimento && (
                <span className="text-xs text-red-500 font-poppins mt-0.5">
                  {errors.dataNascimento.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
                Telefone*
              </label>
              <input
                type="text"
                {...register('telefone')}
                onChange={(e) =>
                  setValue('telefone', formatPhone(e.target.value), {
                    shouldValidate: true,
                  })
                }
                placeholder="(00) 0 0000-0000"
                className={`w-full px-4 py-2.5 text-sm text-gray-900 border rounded-[8px] focus:outline-none focus:ring-1 placeholder-gray-400 transition ${
                  errors.telefone
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
                    : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900'
                }`}
              />
              {errors.telefone && (
                <span className="text-xs text-red-500 font-poppins mt-0.5">
                  {errors.telefone.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
                Instituição de vínculo*
              </label>
              <input
                type="text"
                {...register('instituicao')}
                placeholder="Insira a instituição do usuário"
                className={`w-full px-4 py-2.5 text-sm text-gray-900 border rounded-[8px] focus:outline-none focus:ring-1 placeholder-gray-400 transition ${
                  errors.instituicao
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
                    : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900'
                }`}
              />
              {errors.instituicao && (
                <span className="text-xs text-red-500 font-poppins mt-0.5">
                  {errors.instituicao.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
                Senha *
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('senha')}
                  placeholder="aB3$fjwmd"
                  className={`w-full px-4 py-2.5 pr-11 text-sm text-gray-900 border rounded-[8px] focus:outline-none focus:ring-1 placeholder-gray-400 transition ${
                    errors.senha
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
                      : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.senha && (
                <span className="text-xs text-red-500 font-poppins mt-0.5">
                  {errors.senha.message}
                </span>
              )}

              <label className="flex items-center gap-2 mt-1 select-none cursor-pointer">
                <input
                  type="checkbox"
                  {...register('exigirTrocaSenha')}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-xs text-[#5D657F] font-poppins font-normal">
                  Exigir troca de senha no primeiro acesso
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
              Objetivo de uso*
            </label>
            <textarea
              rows={3}
              {...register('objetivo')}
              placeholder="Descreva o objetivo de uso deste usuário"
              className={`w-full px-4 py-2.5 text-sm text-gray-900 border rounded-[8px] focus:outline-none focus:ring-1 placeholder-gray-400 transition resize-none ${
                errors.objetivo
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
                  : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900'
              }`}
            />
            {errors.objetivo && (
              <span className="text-xs text-red-500 font-poppins mt-0.5">
                {errors.objetivo.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-[#0D0C0B] font-poppins">
              Tipo de usuário
            </span>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  {...register('tipos.estudante')}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-700 font-poppins">Estudante</span>
              </label>
              <label className="flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  {...register('tipos.professor')}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-700 font-poppins">Professor</span>
              </label>
              <label className="flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  {...register('tipos.pesquisador')}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-700 font-poppins">Pesquisador</span>
              </label>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200 my-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-[#0D0C0B] font-poppins">
              Permissões
            </h2>
            <span className="text-sm text-gray-600 font-poppins font-normal">
              Sistemas que o usuário poderá gerenciar
            </span>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissoes.gameClass}
                  onChange={(e) => handleTogglePermissao('gameClass', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-700 font-poppins">GameClass</span>
              </label>

              <label className="flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissoes.gameTed}
                  onChange={(e) => handleTogglePermissao('gameTed', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-700 font-poppins">GameTEd</span>
              </label>

              <label className="flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissoes.glBoard}
                  onChange={(e) => handleTogglePermissao('glBoard', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-700 font-poppins">GLBoard</span>
              </label>

              <label className="flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissoes.thinkLib}
                  onChange={(e) => handleTogglePermissao('thinkLib', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-700 font-poppins">ThinkLib</span>
              </label>

              <label className="flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissoes.thinktest}
                  onChange={(e) => handleTogglePermissao('thinktest', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-700 font-poppins">Thinktest</span>
              </label>

              <label className="flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissoes.thinkTedSystem}
                  onChange={(e) => handleTogglePermissao('thinkTedSystem', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-700 font-poppins">ThinkTEd</span>
              </label>

              <label className="flex items-center gap-2.5 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissoes.todos}
                  onChange={(e) => handleToggleTodos(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                />
                <span className="text-sm text-gray-700 font-poppins">Todos</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-[#0D0C0B] font-poppins">
              Status do usuário
            </h2>
            <div className="flex flex-col items-start gap-2">
              <span className="text-xs text-[#8E95A5] font-poppins font-normal">
                Clique para alterar o status
              </span>

              {/* Toggle Switch */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleToggleStatus}
                  className={`relative inline-flex h-[28px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    status === 'Ativo' ? 'bg-[#16A34A]' : 'bg-[#D97706]'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      status === 'Ativo' ? 'translate-x-[22px]' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${status === 'Ativo' ? 'text-[#16A34A]' : 'text-[#D97706]'}`}>
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="border border-[#CDD0DA] text-gray-600 px-10 py-3 rounded-[8px] hover:bg-gray-50 transition-colors font-poppins font-medium text-sm shadow-sm"
          >
            Voltar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#142E82] text-white px-10 py-3 rounded-[8px] hover:bg-[#0f2263] transition-colors font-poppins font-medium text-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>

      <StatusModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmStatusChange}
        title={pendingStatus === 'Ativo' ? 'Ativar usuário' : 'Suspender usuário'}
        subtitle={
          pendingStatus === 'Ativo'
            ? 'Forneça a justificativa para reativar este usuário'
            : 'Forneça a justificativa para suspender este usuário'
        }
        placeholder={
          pendingStatus === 'Ativo'
            ? 'Descreva o motivo da reativação...'
            : 'Descreva o motivo da suspensão...'
        }
        justificativa={justificativa}
        onJustificativaChange={setJustificativa}
      />
    </div>
  );
};
