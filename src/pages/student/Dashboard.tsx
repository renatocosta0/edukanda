import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Award, Clock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CourseCard } from '../../components/course';
import { Button } from '../../components/ui';
import { useUserProgress } from '../../hooks/useUserProgress';

export function Dashboard() {
  const { user } = useAuth();
  const { courses, loading } = useUserProgress();
  const coursesInProgress = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with welcome message */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Olá, {user?.name}! <span className="animate-pulse-slow inline-block">👋</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Continue de onde parou e alcance seus objetivos
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 p-3 rounded-lg">
              <div className="relative">
                <img 
                  src={user?.userAvatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User")} 
                  alt="Perfil" 
                  className="w-12 h-12 rounded-full border-2 border-primary-200 dark:border-primary-700"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  Nível {user?.level || 1}
                </p>
                <div className="w-32 h-2 bg-primary-100 dark:bg-primary-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500" 
                    style={{ width: `${user?.levelProgress || 45}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="badge badge-primary">{user?.coursesInProgress || 0} curso(s)</span>
              </div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Em andamento</h3>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.coursesInProgress || 0}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <span className={`${(user?.coursesInProgressChange || 0) > 0 ? 'text-success-500' : 'text-danger-500'}`}>
                    {(user?.coursesInProgressChange || 0) > 0 ? '+' : ''}{user?.coursesInProgressChange || 0}%
                  </span>
                  <span className="ml-1">este mês</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="badge badge-success">{user?.certificates || 0} certificado(s)</span>
              </div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Concluídos</h3>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.coursesCompleted || 0}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <span className="text-success-500">+{user?.completedLastMonth || 2}</span>
                  <span className="ml-1">último mês</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="badge badge-warning">Tempo</span>
              </div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Horas assistidas</h3>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.totalHoursWatched || 0}h
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <span className="text-success-500">+{user?.hoursLastWeek || 3}h</span>
                  <span className="ml-1">esta semana</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl shadow-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="badge badge-secondary">Ranking #{user?.rank || 0}</span>
              </div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Pontos</h3>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.points || 0}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <span className="text-success-500">+{user?.pointsLastWeek || 120}</span>
                  <span className="ml-1">esta semana</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title text-2xl md:text-3xl mb-2">
                Continue aprendendo
              </h2>
              <div className="w-16 h-1 bg-primary-500 rounded-full"></div>
            </div>
            <Link to="/student/my-courses">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Ver todos
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : coursesInProgress.length === 0 ? (
            <div className="card p-12 text-center glass-effect">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Nenhum curso em andamento
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Explore nosso catálogo e comece a aprender hoje mesmo. Temos diversos cursos gratuitos para você.
              </p>
              <Link to="/student/courses">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explorar cursos
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesInProgress.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <div className="flex items-center mb-6">
            <h2 className="section-title text-2xl md:text-3xl mb-2">
              Ações Rápidas
            </h2>
            <div className="ml-4 w-16 h-1 bg-primary-500 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/student/courses" className="card-interactive p-6 group">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Explorar Cursos
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Descubra novos cursos para sua jornada
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/student/certificates" className="card-interactive p-6 group">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-success-500 to-success-600 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-success-600 dark:group-hover:text-success-400 transition-colors">
                    Meus Certificados
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.certificates || 0} certificados conquistados
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/student/ranking" className="card-interactive p-6 group">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">
                    Ranking
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Posição #{user?.rank || 0} entre os estudantes
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
