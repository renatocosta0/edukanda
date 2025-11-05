import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, Award, User, Moon, Sun, TrendingUp, 
  LayoutDashboard, Users, BarChart3, GraduationCap, Settings 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return null;

  // Links dinâmicos baseados no role do usuário
  const getLinks = () => {
    switch (user?.role) {
      case 'teacher':
        return [
          { to: '/teacher/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/teacher/courses', icon: BookOpen, label: 'Cursos' },
          { to: '/teacher/students', icon: Users, label: 'Alunos' },
          { to: '/teacher/analytics', icon: BarChart3, label: 'Análises' },
          { to: '/teacher/profile', icon: User, label: 'Perfil' },
        ];
      case 'admin':
        return [
          { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/admin/users', icon: Users, label: 'Usuários' },
          { to: '/admin/courses', icon: BookOpen, label: 'Cursos' },
          { to: '/admin/reports', icon: BarChart3, label: 'Relatórios' },
          { to: '/admin/settings', icon: Settings, label: 'Configurações' },
        ];
      default: // student
        return [
          { to: '/student/dashboard', icon: Home, label: 'Início' },
          { to: '/student/courses', icon: BookOpen, label: 'Cursos' },
          { to: '/student/my-courses', icon: GraduationCap, label: 'Meus Cursos' },
          { to: '/student/ranking', icon: TrendingUp, label: 'Ranking' },
          { to: '/student/profile', icon: User, label: 'Perfil' },
        ];
    }
  };

  const links = getLinks();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:top-0 md:bottom-auto md:border-b md:border-t-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - apenas desktop */}
          <Link 
            to={user?.role === 'teacher' ? '/teacher/dashboard' : user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} 
            className="hidden md:flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              EduKanda
            </span>
          </Link>

          {/* Links de navegação */}
          <div className="flex items-center justify-around md:justify-center flex-1 md:flex-initial md:gap-8">
            {links.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs md:text-sm font-medium">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Botão de tema - apenas desktop */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
