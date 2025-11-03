import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { api } from '../services/api';
import { type Course } from '../data/courses';
import { useAuth } from '../context/AuthContext';

export function Progress() {
  const [coursesInProgress, setCoursesInProgress] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    setIsLoading(true);
    try {
      const data = await api.getUserProgress();
      setCoursesInProgress(data);
    } finally {
      setIsLoading(false);
    }
  };

  const totalProgress = coursesInProgress.length > 0
    ? Math.round(
        coursesInProgress.reduce((acc, course) => acc + course.progress, 0) /
          coursesInProgress.length
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Meu Progresso
        </h1>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.coursesInProgress}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Em andamento
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.coursesCompleted}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Concluídos
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.totalHoursWatched}h
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Horas assistidas
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
                  {totalProgress}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Progresso médio
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cursos em andamento */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Cursos em Andamento
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : coursesInProgress.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                Você ainda não iniciou nenhum curso
              </p>
              <Link
                to="/home"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Explorar cursos
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {coursesInProgress.map(course => (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {course.instructor}
                      </p>
                      <ProgressBar progress={course.progress} />
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-primary-600">
                        {course.progress}%
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        concluído
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
