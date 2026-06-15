"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { registerSchema, type RegisterFormData } from '@/schemas/registerSchema';
import { register as registerUser } from '@/services/RegisterService';
import IRegister from '@/interfaces/IRegister';
import { formatDate, formatPhone } from '@/utils/masks';

interface CreateAdminFormProps {
  onClose: () => void;
}

const buildPayload = (data: RegisterFormData): IRegister => {
  const [firstName, ...rest] = data.nome.trim().split(/\s+/);

  let birthday = new Date();
  if (data.dataNascimento) {
    const [day, month, year] = data.dataNascimento.split('/').map(Number);
    birthday = new Date(year, month - 1, day);
  }

  return {
    username: data.email.split('@')[0],
    email: data.email.trim(),
    password: data.senha,
    firstName,
    lastName: rest.join(' '),
    birthday,
    institution: data.instituicao ?? '',
    objective: data.objetivo ?? '',
    isActive: true,
  };
};

export const CreateAdminForm: React.FC<CreateAdminFormProps> = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: '',
      email: '',
      dataNascimento: '',
      telefone: '',
      instituicao: '',
      senha: 'aB3$fjwmd',
      exigirTrocaSenha: true,
      objetivo: '',
      tipos: { estudante: false, professor: false, pesquisador: false },
      permissoes: {
        gameClass: false,
        gameTed: false,
        glBoard: false,
        thinkLib: false,
        thinktest: false,
        thinkTedSystem: false,
        todos: false,
      },
    },
  });

  const permissoes = watch('permissoes');

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

  const handleTogglePermissao = (
    key: keyof RegisterFormData['permissoes'],
    checked: boolean,
  ) => {
    const next = { ...permissoes, [key]: checked };
    // Se todos estiverem marcados individualmente, marca "todos"
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
    try {
      await registerUser(buildPayload(data));
      toast.success('Usuário criado com sucesso!');
      onClose();
    } catch (error: any) {
      if (error?.response?.status === 409) {
        setError('email', { message: 'E-mail já existe' });
        return;
      }
      toast.error('Erro ao criar usuário. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white flex flex-col gap-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h1 className="font-poppins font-medium text-[22px] text-[#142E82] tracking-wide antialiased">
          Criar novo usuário admin
        </h1>
        <button
          type="button"
          onClick={onClose}
          className="border border-[#CDD0DA] text-gray-500 px-4 py-1.5 rounded-[8px] hover:bg-gray-50 transition font-poppins text-xs flex items-center gap-1.5"
        >
          <span>×</span> Sair
        </button>
      </div>

      {/* Seção 1: Informações do usuário */}
      <div className="flex flex-col gap-6">
        <h2 className="text-base font-semibold text-[#0D0C0B] font-poppins">
          Informações do usuário
        </h2>

        {/* Nome & Email */}
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

        {/* Data de nascimento & Telefone */}
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

        {/* Instituição & Senha */}
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

            {/* Checkbox Exigir troca de senha */}
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

        {/* Objetivo de uso */}
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

        {/* Tipo de usuário */}
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

      {/* Seção 2: Permissões */}
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-[#0D0C0B] font-poppins">
          Permissões
        </h2>
        <span className="text-sm text-gray-600 font-poppins font-normal">
          Sistemas que o usuário poderá gerenciar
        </span>

        {/* Checkboxes de permissões */}
        <div className="flex flex-col gap-2">
          {/* GameClass */}
          <label className="flex items-center gap-2.5 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={permissoes.gameClass}
              onChange={(e) => handleTogglePermissao('gameClass', e.target.checked)}
              className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
            />
            <span className="text-sm text-gray-700 font-poppins">GameClass</span>
          </label>

          {/* GameTEd */}
          <label className="flex items-center gap-2.5 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={permissoes.gameTed}
              onChange={(e) => handleTogglePermissao('gameTed', e.target.checked)}
              className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
            />
            <span className="text-sm text-gray-700 font-poppins">GameTEd</span>
          </label>

          {/* GLBoard */}
          <label className="flex items-center gap-2.5 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={permissoes.glBoard}
              onChange={(e) => handleTogglePermissao('glBoard', e.target.checked)}
              className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
            />
            <span className="text-sm text-gray-700 font-poppins">GLBoard</span>
          </label>

          {/* ThinkLib */}
          <label className="flex items-center gap-2.5 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={permissoes.thinkLib}
              onChange={(e) => handleTogglePermissao('thinkLib', e.target.checked)}
              className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
            />
            <span className="text-sm text-gray-700 font-poppins">ThinkLib</span>
          </label>

          {/* Thinktest */}
          <label className="flex items-center gap-2.5 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={permissoes.thinktest}
              onChange={(e) => handleTogglePermissao('thinktest', e.target.checked)}
              className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
            />
            <span className="text-sm text-gray-700 font-poppins">Thinktest</span>
          </label>

          {/* ThinkTEd */}
          <label className="flex items-center gap-2.5 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={permissoes.thinkTedSystem}
              onChange={(e) => handleTogglePermissao('thinkTedSystem', e.target.checked)}
              className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
            />
            <span className="text-sm text-gray-700 font-poppins">ThinkTEd</span>
          </label>

          {/* Todos */}
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

      {/* Botão Salvar */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#142E82] text-white px-10 py-3 rounded-[8px] hover:bg-[#0f2263] transition-colors font-poppins font-medium text-sm shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};
