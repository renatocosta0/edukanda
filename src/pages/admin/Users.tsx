import { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, Search, Ban, Trash2, UserCheck 
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import type { AdminUser, UserFilters } from '../../types/admin';
import { Button, Modal } from '../../components/ui';

export function Users() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<UserFilters>({});
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'suspend' | 'activate' | 'delete' | 'changeRole'>('suspend');

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getUsers(filters);
      setUsers(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedUser) return;

    try {
      switch (actionType) {
        case 'suspend':
          await adminApi.updateUserStatus(selectedUser.id, 'suspended');
          break;
        case 'activate':
          await adminApi.updateUserStatus(selectedUser.id, 'active');
          break;
        case 'delete':
          await adminApi.deleteUser(selectedUser.id);
          break;
      }
      setShowActionModal(false);
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      console.error('Erro ao executar ação:', error);
    }
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      teacher: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      student: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    const labels = {
      admin: 'Admin',
      teacher: 'Professor',
      student: 'Estudante',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role as keyof typeof styles]}`}>
        {labels[role as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      suspended: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };
    const labels = {
      active: 'Ativo',
      suspended: 'Suspenso',
      pending: 'Pendente',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Gerenciamento de Usuários
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie todos os usuários da plataforma
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="card p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  value={filters.search || ''}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Filtro por Role */}
            <div>
              <select
                value={filters.role || ''}
                onChange={(e) => setFilters({ ...filters, role: (e.target.value || undefined) as 'student' | 'teacher' | 'admin' | undefined })}
                className="input-field"
              >
                <option value="">Todos os tipos</option>
                <option value="student">Estudantes</option>
                <option value="teacher">Professores</option>
                <option value="admin">Administradores</option>
              </select>
            </div>

            {/* Filtro por Status */}
            <div>
              <select
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: (e.target.value || undefined) as 'active' | 'suspended' | 'pending' | undefined })}
                className="input-field"
              >
                <option value="">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="suspended">Suspensos</option>
                <option value="pending">Pendentes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total de Usuários</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estudantes</p>
            <p className="text-2xl font-bold text-green-600">{users.filter(u => u.role === 'student').length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Professores</p>
            <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === 'teacher').length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ativos</p>
            <p className="text-2xl font-bold text-purple-600">{users.filter(u => u.status === 'active').length}</p>
          </div>
        </div>

        {/* Tabela de Usuários */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Carregando usuários...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Usuário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Data de Cadastro
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Último Acesso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.joinedDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pt-BR') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          {user.status === 'active' ? (
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setActionType('suspend');
                                setShowActionModal(true);
                              }}
                              className="text-orange-600 hover:text-orange-900 dark:text-orange-400"
                              title="Suspender"
                            >
                              <Ban className="w-5 h-5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setActionType('activate');
                                setShowActionModal(true);
                              }}
                              className="text-green-600 hover:text-green-900 dark:text-green-400"
                              title="Ativar"
                            >
                              <UserCheck className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setActionType('delete');
                              setShowActionModal(true);
                            }}
                            className="text-red-600 hover:text-red-900 dark:text-red-400"
                            title="Excluir"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal de Confirmação */}
        <Modal
          isOpen={showActionModal}
          onClose={() => setShowActionModal(false)}
          title={
            actionType === 'suspend' ? 'Suspender Usuário' :
            actionType === 'activate' ? 'Ativar Usuário' :
            'Excluir Usuário'
          }
        >
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {actionType === 'suspend' && `Tem certeza que deseja suspender ${selectedUser?.name}?`}
            {actionType === 'activate' && `Tem certeza que deseja ativar ${selectedUser?.name}?`}
            {actionType === 'delete' && `Tem certeza que deseja excluir ${selectedUser?.name}? Esta ação não pode ser desfeita.`}
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowActionModal(false)}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAction}
              variant={actionType === 'delete' ? 'secondary' : 'primary'}
              className="flex-1"
            >
              Confirmar
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
