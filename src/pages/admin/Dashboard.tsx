import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminApi } from '../../services/adminApi';
import type { PlatformStats } from '../../types/admin';

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await adminApi.getPlatformStats();
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bem-vindo, {user?.name}! Gerencie a plataforma EduKanda
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Usuários totais
                </p>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+{stats.newUsersThisMonth} este mês</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalCourses}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cursos totais
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{stats.coursesPublished} publicados</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalRevenue.toLocaleString()} Kz
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receita total
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.averageRating.toFixed(1)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avaliação média
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/admin/users" className="card p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Gerenciar Usuários</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {stats.totalStudents} estudantes, {stats.totalTeachers} professores
            </p>
            <div className="flex items-center text-primary-600 text-sm font-medium">
              Acessar <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link to="/admin/courses" className="card p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Gerenciar Cursos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Moderar e aprovar novos cursos
            </p>
            <div className="flex items-center text-primary-600 text-sm font-medium">
              Acessar <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link to="/admin/reports" className="card p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Relatórios</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Analytics e métricas da plataforma
            </p>
            <div className="flex items-center text-primary-600 text-sm font-medium">
              Acessar <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link to="/admin/settings" className="card p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Configurações</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Configurar a plataforma
            </p>
            <div className="flex items-center text-primary-600 text-sm font-medium">
              Acessar <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Usuários Ativos</h3>
            <p className="text-3xl font-bold text-primary-600 mb-2">{stats.activeUsers}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% do total
            </p>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Taxa de Conclusão</h3>
            <p className="text-3xl font-bold text-green-600 mb-2">{stats.completionRate}%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Média da plataforma</p>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Novos Usuários</h3>
            <p className="text-3xl font-bold text-blue-600 mb-2">{stats.newUsersThisMonth}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Neste mês</p>
          </div>
        </div>
      </div>
    </div>
  );
}
