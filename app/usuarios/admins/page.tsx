"use client";

import React, { useState } from 'react';
import { PageTitle } from '@/components/PageTitle';
import { SearchInput } from '@/components/SearchInput';
import { GenericTable } from '@/components/GenericTable';
import { CreateAdminForm } from '@/components/CreateAdminForm';
import { EditAdminForm } from '@/components/EditAdminForm';

export default function AdminsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

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
          onSave={(updatedUser) => {
            // Em uma app real atualizaria a API/lista, aqui apenas fecha
            setEditingUser(null);
          }} 
        />
      </div>
    );
  }

  return (
    <div className="pt-10 pb-10 px-[29.5px] flex flex-col gap-6 w-full bg-white">
      <div className="text-xs text-[#8E95A5] font-poppins -mb-2">
        Sistemas <span className="mx-1">/</span> Usuário <span className="mx-1">/</span> <span className="font-semibold text-gray-700">Administrador</span>
      </div>

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
        <GenericTable searchTerm={searchTerm} onEditUser={setEditingUser} />
      </div>
    </div>
  );
}
