import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Users, TrendingUp, DollarSign, Plus, BarChart3, 
  UserPlus, Star, MessageCircle, CheckCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { teacherApi } from '../../services/teacherApi';
import type { TeacherStats } from '../../types';

interface RecentActivity {
  id: number;
  type: 'enrollment' | 'review' | 'question' | 'completion';
  message: string;
  course: string;
  student: string;
  time: string;
}

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock de atividades recentes
  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'enrollment',
      message: 'se matriculou em',
      course: 'React do Zero ao Avançado',
      student: 'Maria Silva',
      time: 'Há 2 horas'
    },
    {
      id: 2,
      type: 'review',
      message: 'avaliou com 5 estrelas',
      course: 'JavaScript Moderno',
      student: 'João Santos',
      time: 'Há 5 horas'
    },
    {
      id: 3,
      type: 'question',
      message: 'fez uma pergunta em',
      course: 'TypeScript na Prática',
      student: 'Ana Costa',
      time: 'Há 1 dia'
    },
    {
      id: 4,
      type: 'completion',
      message: 'completou o curso',
      course: 'React do Zero ao Avançado',
      student: 'Pedro Oliveira',
      time: 'Há 1 dia'
    },
    {
      id: 5,
      type: 'enrollment',
      message: 'se matriculou em',
      course: 'Node.js e Express',
      student: 'Carla Mendes',
      time: 'Há 2 dias'
    }
  ];

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await teacherApi.getTeacherStats(user?.id || 0);
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard do Professor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bem-vindo, {user?.name}! Gerencie seus cursos e acompanhe o desempenho dos alunos
          </p>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Carregando estatísticas...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats?.totalCourses || 0}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cursos criados
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats?.totalStudents || 0}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Alunos totais
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats?.averageRating.toFixed(1) || 0}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Avaliação média
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats?.totalRevenue.toLocaleString('pt-BR') || 0} Kz
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receita total
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Link to="/teacher/courses/new" className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <Plus className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Criar Novo Curso
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Comece um novo curso
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/teacher/students" className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Ver Alunos
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Acompanhe o progresso
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/teacher/analytics" className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Ver Análises
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Estatísticas detalhadas
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Atividade Recente
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivities.map(activity => {
                  const getIcon = () => {
                    switch (activity.type) {
                      case 'enrollment':
                        return <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
                      case 'review':
                        return <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
                      case 'question':
                        return <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
                      case 'completion':
                        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
                    }
                  };

                  const getBgColor = () => {
                    switch (activity.type) {
                      case 'enrollment':
                        return 'bg-blue-100 dark:bg-blue-900';
                      case 'review':
                        return 'bg-yellow-100 dark:bg-yellow-900';
                      case 'question':
                        return 'bg-purple-100 dark:bg-purple-900';
                      case 'completion':
                        return 'bg-green-100 dark:bg-green-900';
                    }
                  };

                  return (
                    <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${getBgColor()}`}>
                          {getIcon()}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">
                            <span className="font-semibold">{activity.student}</span>
                            {' '}{activity.message}{' '}
                            <span className="font-medium text-primary-600 dark:text-primary-400">
                              {activity.course}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
