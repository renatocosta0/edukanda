import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Calendar, LogOut, Settings, FileText, Moon, Sun } from 'lucide-react';
import { Button, Modal } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../hooks/useUser';

export function Profile() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user: loadedUser, loading, update } = useUser(user?.id);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editBio, setEditBio] = useState(user?.bio || '');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSaveProfile = async () => {
    try {
      await update({ name: editName, bio: editBio });
    } finally {
      setShowEditModal(false);
    }
  };

  if (!user) return null;
  const u = loadedUser ?? user;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header do perfil */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={u.avatar}
              alt={u.name}
              className="w-32 h-32 rounded-full border-4 border-primary-200 dark:border-primary-800"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {u.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{u.bio}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{u.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Membro desde {new Date(u.joinedDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowEditModal(true)} variant="outline">
              Editar Perfil
            </Button>
          </div>
        </div>

        {/* Estatísticas do Professor */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-primary-600 mb-1">
              {u.totalCourses || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cursos Criados
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-secondary-600 mb-1">
              {u.totalStudents || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total de Alunos
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-green-600 mb-1">
              {u.averageRating?.toFixed(1) || '0.0'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Avaliação Média
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-purple-600 mb-1">
              {u.totalRevenue?.toLocaleString('pt-BR') || '0'} Kz
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Receita Total
            </p>
          </div>
        </div>

        {/* Configurações */}
        <div className="card">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Configurações
            </h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <button
              onClick={toggleTheme}
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Tema
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {theme === 'light' ? 'Modo claro' : 'Modo escuro'}
                </p>
              </div>
            </button>

            <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Configurações da Conta
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gerenciar suas preferências
                </p>
              </div>
            </button>

            <Link
              to="/about"
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Sobre o EduKanda
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Conheça nossa missão e valores
                </p>
              </div>
            </Link>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full p-4 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
            >
              <LogOut className="w-5 h-5" />
              <div className="flex-1 text-left">
                <p className="font-semibold">Sair</p>
                <p className="text-sm opacity-75">Desconectar da sua conta</p>
              </div>
            </button>
          </div>
        </div>

        {/* Modal de Logout */}
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          title="Confirmar saída"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Tem certeza que deseja sair da sua conta?
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowLogoutModal(false)}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button onClick={handleLogout} variant="secondary" className="flex-1">
              Sair
            </Button>
          </div>
        </Modal>

        {/* Modal de Editar Perfil */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Editar Perfil"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="input-field resize-none"
                rows={3}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowEditModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button onClick={handleSaveProfile} className="flex-1">
                Salvar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
