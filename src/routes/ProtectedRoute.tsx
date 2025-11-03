import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { type UserRole } from '../data/users';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * Componente para proteger rotas baseado em autenticação e roles
 * 
 * @param children - Componente filho a ser renderizado se autorizado
 * @param allowedRoles - Array de roles permitidas (opcional). Se não fornecido, apenas verifica autenticação
 * @param redirectTo - Caminho para redirecionar se não autorizado (padrão: /login)
 */
export function ProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

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
      // Redireciona para home se não tiver a role necessária
      return <Navigate to="/home" replace />;
    }
  }

  // Usuário autenticado e autorizado
  return <>{children}</>;
}
