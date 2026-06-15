import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface CreateAdminFormProps {
  onClose: () => void;
}

export const CreateAdminForm: React.FC<CreateAdminFormProps> = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados dos campos
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [senha, setSenha] = useState('aB3$fjwmd');
  const [exigirTrocaSenha, setExigirTrocaSenha] = useState(true);
  const [objetivo, setObjetivo] = useState('');
  
  // Tipo de usuário
  const [tipos, setTipos] = useState({
    estudante: false,
    professor: false,
    pesquisador: false,
  });

  // Permissões
  const [permissoes, setPermissoes] = useState({
    gameClass: false,
    gameTed: false,
    glBoard: false,
    thinkLib: false,
    thinktest: false,
    thinkTedSystem: false,
    todos: false,
  });

  // Erros
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (val.toLowerCase().trim() === 'mariana.souza@exemplo.com') {
      setErrors({ email: 'E-mail já existe' });
    } else {
      setErrors({});
    }
  };

  const handleToggleTodos = (checked: boolean) => {
    setPermissoes({
      gameClass: checked,
      gameTed: checked,
      glBoard: checked,
      thinkLib: checked,
      thinktest: checked,
      thinkTedSystem: checked,
      todos: checked,
    });
  };

  const handleTogglePermissao = (key: keyof typeof permissoes, checked: boolean) => {
    setPermissoes(prev => {
      const next = { ...prev, [key]: checked };
      // Se todos estiverem marcados individualmente, marca "todos"
      const allSelected = next.gameClass && next.gameTed && next.glBoard && next.thinkLib && next.thinktest && next.thinkTedSystem;
      next.todos = allSelected;
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase().trim() === 'mariana.souza@exemplo.com') {
      setErrors({ email: 'E-mail já existe' });
      return;
    }
    // Salvar mockado com sucesso e voltar
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white flex flex-col gap-8">
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
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Insira o nome do usuário"
              className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-[8px] focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 placeholder-gray-400 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="mariana.souza@exemplo.com"
              className={`w-full px-4 py-2.5 text-sm text-gray-900 border rounded-[8px] focus:outline-none focus:ring-1 transition ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900' 
                  : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900'
              }`}
            />
            {errors.email && (
              <span className="text-xs text-red-500 font-poppins mt-0.5">
                {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* Data de nascimento & Telefone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
              Data de nascimento
            </label>
            <input
              type="text"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              placeholder="00/00/00"
              className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-[8px] focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 placeholder-gray-400 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
              Telefone
            </label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 0 0000-0000"
              className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-[8px] focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 placeholder-gray-400 transition"
            />
          </div>
        </div>

        {/* Instituição & Senha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
              Instituição de vínculo
            </label>
            <input
              type="text"
              value={instituicao}
              onChange={(e) => setInstituicao(e.target.value)}
              placeholder="Insira a instituição do usuário"
              className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-[8px] focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 placeholder-gray-400 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#0D0C0B] font-poppins">
              Senha *
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="aB3$fjwmd"
                className="w-full px-4 py-2.5 pr-11 text-sm text-gray-900 border border-gray-200 rounded-[8px] focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 placeholder-gray-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Checkbox Exigir troca de senha */}
            <label className="flex items-center gap-2 mt-1 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={exigirTrocaSenha}
                onChange={(e) => setExigirTrocaSenha(e.target.checked)}
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
            Objetivo de uso
          </label>
          <textarea
            rows={3}
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            placeholder="Descreva o objetivo de uso deste usuário"
            className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-200 rounded-[8px] focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 placeholder-gray-400 transition resize-none"
          />
        </div>

        {/* Tipo de usuário */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-[#0D0C0B] font-poppins">
            Tipo de usuário
          </span>
          <div className="flex flex-col gap-2">
            {Object.keys(tipos).map((key) => {
              const k = key as keyof typeof tipos;
              const labels: Record<string, string> = {
                estudante: 'Estudante',
                professor: 'Professor',
                pesquisador: 'Pesquisador',
              };
              return (
                <label key={k} className="flex items-center gap-2.5 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tipos[k]}
                    onChange={(e) => setTipos(prev => ({ ...prev, [k]: e.target.checked }))}
                    className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900"
                  />
                  <span className="text-sm text-gray-700 font-poppins">
                    {labels[k]}
                  </span>
                </label>
              );
            })}
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
          className="bg-[#142E82] text-white px-10 py-3 rounded-[8px] hover:bg-[#0f2263] transition-colors font-poppins font-medium text-sm shadow-sm"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};
