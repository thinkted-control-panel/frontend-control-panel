"use client";
import { useCallback, useEffect, useState } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { SearchInput } from '@/components/SearchInput';
import { GenericTable, type TableUser } from '@/components/GenericTable';
import { CreateAdminForm } from '@/components/CreateAdminForm';
import { EditAdminForm } from '@/components/EditAdminForm';
import { listUsers } from '@/services/UserService';
import { IUser } from '@/interfaces/IUser';
import { handleApiError } from '@/utils/handleApiError';
import { Breadcrumb } from '@/components/Breadcrumb';

const mapToTableUser = (user: IUser): TableUser => ({
  id: user.id,
  name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.username,
  email: user.email,
  systems: user.permissionPolicies ?? [],
  status: user.isActive ? 'Ativo' : 'Suspenso',
});

export default function AdminsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<TableUser | null>(null);
  const [users, setUsers] = useState<TableUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await listUsers();
      setUsers(data.map(mapToTableUser));
    } catch (error) {
      handleApiError(error, 'Erro ao carregar usuários. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (showCreateForm) {
    return (
      <div className="pt-10 pb-10 px-[29.5px] flex flex-col gap-6 w-full bg-white">
        <CreateAdminForm onClose={() => setShowCreateForm(false)} />
      </div>
    );
  }

  if (editingUser) {
    return (
      <div className="pt-10 pb-10 px-[29.5px] flex flex-col gap-6 w-full bg-white">
        <EditAdminForm
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={() => {
            setEditingUser(null);
            fetchUsers();
          }}
        />
      </div>
    );
  }

  return (
    <div className="pt-10 pb-10 px-[29.5px] flex flex-col gap-6 w-full bg-white">
      <Breadcrumb items={['Sistemas', 'Usuário', 'Administrador']} />

      <div>
        <PageTitle title="Gerenciar usuários administradores" />
      </div>

      <div className="flex items-center justify-between gap-4 mt-2">
        <div className="flex-1 max-w-md">
          <SearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar" 
          />
        </div>
        
        <button 
          onClick={() => setShowCreateForm(true)}
          className="bg-[#142E82] text-white px-5 py-2.5 rounded-[8px] flex items-center gap-2 hover:bg-[#0f2263] transition-colors font-poppins font-medium text-sm shadow-sm shrink-0"
        >
          <span className="text-lg font-light leading-none">+</span> Usuário
        </button>
      </div>

      {/* Tabela de Usuários */}
      <div className="mt-2">
        <GenericTable
          users={users}
          isLoading={isLoading}
          searchTerm={searchTerm}
          onEditUser={setEditingUser}
        />
      </div>
    </div>
  );
}
