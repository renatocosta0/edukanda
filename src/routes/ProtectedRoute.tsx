import { type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { type UserRole } from '../data/users';

interface ProtectedRouteProps {
  children?: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * Componente para proteger rotas baseado em autenticação e roles
 * Suporta tanto children direto quanto Outlet para rotas aninhadas
 * 
 * @param children - Componente filho a ser renderizado se autorizado (opcional, usa Outlet se não fornecido)
 * @param allowedRoles - Array de roles permitidas (opcional). Se não fornecido, apenas verifica autenticação
 * @param redirectTo - Caminho para redirecionar se não autorizado (padrão: /login)
 */
export function ProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole, user } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Redireciona se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Se allowedRoles foi fornecido, verifica se o usuário tem permissão
  if (allowedRoles && allowedRoles.length > 0) {
    if (!hasRole(allowedRoles)) {
      // Redireciona para dashboard apropriado baseado no role do usuário
      const dashboardMap: Record<UserRole, string> = {
        student: '/student/dashboard',
        teacher: '/teacher/dashboard',
        admin: '/admin/dashboard',
      };
      const redirectPath = user?.role ? dashboardMap[user.role] : '/';
      return <Navigate to={redirectPath} replace />;
    }
  }

  // Usuário autenticado e autorizado
  // Se children foi fornecido, renderiza children, senão usa Outlet para rotas aninhadas
  return children ? <>{children}</> : <Outlet />;
}
