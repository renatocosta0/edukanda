import type { UserRole } from './user';

// Estatísticas gerais da plataforma
export interface PlatformStats {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersThisMonth: number;
  coursesPublished: number;
  averageRating: number;
  completionRate: number;
}

// Usuário para gerenciamento
export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: 'active' | 'suspended' | 'pending';
  joinedDate: string;
  lastLogin?: string;
  coursesCount?: number;
  studentsCount?: number;
}

// Curso para moderação
export interface AdminCourse {
  id: number;
  title: string;
  instructor: string;
  instructorId: number;
  category: string;
  status: 'published' | 'draft' | 'pending' | 'rejected';
  studentsCount: number;
  rating: number;
  revenue: number;
  createdAt: string;
  lastUpdated: string;
  thumbnail?: string;
  isFeatured?: boolean;
}

// Relatório de receita
export interface RevenueReport {
  period: string;
  totalRevenue: number;
  courseSales: number;
  subscriptions: number;
  refunds: number;
  netRevenue: number;
}

// Atividade do sistema
export interface SystemActivity {
  id: number;
  type: 'user_registered' | 'course_published' | 'course_completed' | 'payment' | 'report';
  description: string;
  userId?: number;
  userName?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Configurações da plataforma
export interface PlatformSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  supportEmail: string;
  logo?: string;
  favicon?: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  features: {
    allowRegistration: boolean;
    requireEmailVerification: boolean;
    enableCertificates: boolean;
    enableRanking: boolean;
    enableReviews: boolean;
  };
  payment: {
    currency: string;
    commissionRate: number;
    minWithdrawal: number;
  };
}

// Filtros para listagens
export interface UserFilters {
  role?: UserRole;
  status?: 'active' | 'suspended' | 'pending';
  search?: string;
  sortBy?: 'name' | 'email' | 'joinedDate' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
}

export interface CourseFilters {
  status?: 'published' | 'draft' | 'pending' | 'rejected';
  category?: string;
  search?: string;
  sortBy?: 'title' | 'studentsCount' | 'rating' | 'revenue' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
