import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicLayout, PrivateLayout } from '../components/layout';

// Public Pages
import { 
  LandingPage, 
  Login, 
  Register, 
  ForgotPassword, 
  About, 
  Contact, 
  Onboarding 
} from '../pages/public';

// Student Pages
import { 
  Dashboard as StudentDashboard,
  Courses,
  CourseDetail,
  LessonPage,
  MyCourses,
  Certificates,
  Ranking,
  Profile
} from '../pages/student';

// Teacher Pages
import { 
  Dashboard as TeacherDashboard,
  Courses as TeacherCourses,
  CourseEditor,
  Students as TeacherStudents,
  Analytics,
  Profile as TeacherProfile
} from '../pages/teacher';

// Admin Pages
import { 
  Dashboard as AdminDashboard,
  Users as AdminUsers,
  Courses as AdminCourses,
  Reports as AdminReports,
  Settings as AdminSettings
} from '../pages/admin';

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

  return isAuthenticated ? <Navigate to="/student/dashboard" replace /> : <PublicLayout>{children}</PublicLayout>;
}

/**
 * Layout wrapper para rotas privadas com Outlet
 */
function PrivateLayoutWrapper() {
  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== ROTAS PÚBLICAS ========== */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/onboarding"
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* ========== ÁREA DO ESTUDANTE ========== */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student" element={<PrivateLayoutWrapper />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="course/:courseId/lesson/:lessonId" element={<LessonPage />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* ========== ÁREA DO PROFESSOR ========== */}
        <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
          <Route path="/teacher" element={<PrivateLayoutWrapper />}>
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="courses/new" element={<CourseEditor />} />
            <Route path="courses/:courseId/edit" element={<CourseEditor />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="profile" element={<TeacherProfile />} />
          </Route>
        </Route>

        {/* ========== ÁREA ADMINISTRATIVA ========== */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<PrivateLayoutWrapper />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* ========== ROTAS LEGADAS (COMPATIBILIDADE) ========== */}
        {/* Redirecionar rotas antigas para nova estrutura */}
        <Route path="/home" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="/course/:id" element={<Navigate to="/student/courses" replace />} />
        <Route path="/progress" element={<Navigate to="/student/my-courses" replace />} />
        <Route path="/certificates" element={<Navigate to="/student/certificates" replace />} />
        <Route path="/ranking" element={<Navigate to="/student/ranking" replace />} />
        <Route path="/profile" element={<Navigate to="/student/profile" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
