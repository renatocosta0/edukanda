import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicLayout, PrivateLayout } from '../components/layout';

// Pages
import { Onboarding } from '../pages/Onboarding';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { CoursePage } from '../pages/CoursePage';
import { LessonPage } from '../pages/LessonPage';
import { Progress } from '../pages/Progress';
import { Certificates } from '../pages/Certificates';
import { Ranking } from '../pages/Ranking';
import { Profile } from '../pages/Profile';
import { About } from '../pages/About';

/**
 * Componente para rotas públicas (redireciona se já autenticado)
 */
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/home" replace /> : <PublicLayout>{children}</PublicLayout>;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== ROTAS PÚBLICAS ========== */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Onboarding />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* ========== ROTAS PROTEGIDAS (STUDENT) ========== */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={['student', 'instructor', 'admin']}>
              <PrivateLayout>
                <Home />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute allowedRoles={['student', 'instructor', 'admin']}>
              <PrivateLayout>
                <CoursePage />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/lesson/:lessonId"
          element={
            <ProtectedRoute allowedRoles={['student', 'instructor', 'admin']}>
              <PrivateLayout>
                <LessonPage />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <PrivateLayout>
                <Progress />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <PrivateLayout>
                <Certificates />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ranking"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <PrivateLayout>
                <Ranking />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['student', 'instructor', 'admin']}>
              <PrivateLayout>
                <Profile />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute allowedRoles={['student', 'instructor', 'admin']}>
              <PrivateLayout>
                <About />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        {/* ========== ROTAS FUTURAS (INSTRUCTOR) ========== */}
        {/* TODO: Implementar rotas para instrutores */}
        {/* /instructor/dashboard */}
        {/* /instructor/courses */}
        {/* /instructor/students */}

        {/* ========== ROTAS FUTURAS (ADMIN) ========== */}
        {/* TODO: Implementar rotas para administradores */}
        {/* /admin/dashboard */}
        {/* /admin/users */}
        {/* /admin/courses */}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
