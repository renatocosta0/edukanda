import { useState, useEffect } from 'react';
import { TrendingUp, Users, BookOpen, DollarSign, Activity } from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import type { PlatformStats, SystemActivity } from '../../types/admin';

export function Reports() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [activities, setActivities] = useState<SystemActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, activitiesData] = await Promise.all([
        adminApi.getPlatformStats(),
        adminApi.getSystemActivities(10),
      ]);
      setStats(statsData);
      setActivities(activitiesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Relatórios e Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Visão geral da plataforma e métricas importantes
          </p>
        </div>

        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Usuários</p>
              </div>
            </div>
            <p className="text-xs text-green-600">+{stats.newUsersThisMonth} este mês</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Cursos</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{stats.coursesPublished} publicados</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Receita Total</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Avaliação Média</p>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Professores</h3>
            <p className="text-3xl font-bold text-blue-600 mb-2">{stats.totalTeachers}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Criadores de conteúdo</p>
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Atividades Recentes do Sistema
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {activities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.description}
                    </p>
                    {activity.userName && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Por: {activity.userName}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(activity.timestamp).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
