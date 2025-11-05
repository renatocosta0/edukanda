import type {
  PlatformStats,
  AdminUser,
  AdminCourse,
  RevenueReport,
  SystemActivity,
  PlatformSettings,
  UserFilters,
  CourseFilters,
} from '../types/admin';
import { http, BASE_URL } from './http';

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockPlatformStats: PlatformStats = {
  totalUsers: 1247,
  totalStudents: 1089,
  totalTeachers: 156,
  totalCourses: 342,
  totalRevenue: 2847500,
  activeUsers: 892,
  newUsersThisMonth: 127,
  coursesPublished: 298,
  averageRating: 4.6,
  completionRate: 67,
};

const mockUsers: AdminUser[] = [
  {
    id: 1,
    name: 'Renato Costa',
    email: 'renato@edukanda.ao',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=renato',
    status: 'active',
    joinedDate: '2024-01-15',
    lastLogin: '2024-01-20T10:30:00',
  },
  {
    id: 2,
    name: 'Ana Silva',
    email: 'ana@edukanda.ao',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    status: 'active',
    joinedDate: '2024-02-01',
    lastLogin: '2024-01-19T15:20:00',
  },
  {
    id: 3,
    name: 'Prof. Carlos Mendes',
    email: 'carlos@edukanda.ao',
    role: 'teacher',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    status: 'active',
    joinedDate: '2023-11-01',
    lastLogin: '2024-01-20T08:15:00',
    coursesCount: 8,
    studentsCount: 342,
  },
  {
    id: 4,
    name: 'Prof. João Silva',
    email: 'joao@edukanda.ao',
    role: 'teacher',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
    status: 'active',
    joinedDate: '2023-10-15',
    lastLogin: '2024-01-18T14:45:00',
    coursesCount: 5,
    studentsCount: 198,
  },
  {
    id: 5,
    name: 'Admin EduKanda',
    email: 'admin@edukanda.ao',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    status: 'active',
    joinedDate: '2023-09-01',
    lastLogin: '2024-01-20T11:00:00',
  },
];

const mockCourses: AdminCourse[] = [
  {
    id: 1,
    title: 'React do Zero ao Avançado',
    instructor: 'Prof. Carlos Mendes',
    instructorId: 3,
    category: 'Programação',
    status: 'published',
    studentsCount: 156,
    rating: 4.8,
    revenue: 234000,
    createdAt: '2023-12-01',
    lastUpdated: '2024-01-10',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'JavaScript Moderno (ES6+)',
    instructor: 'Prof. Carlos Mendes',
    instructorId: 3,
    category: 'Programação',
    status: 'published',
    studentsCount: 203,
    rating: 4.9,
    revenue: 243600,
    createdAt: '2023-11-15',
    lastUpdated: '2024-01-08',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
    isFeatured: false,
  },
  {
    id: 8,
    title: 'MongoDB - Banco de Dados NoSQL',
    instructor: 'Prof. Carlos Mendes',
    instructorId: 3,
    category: 'Programação',
    status: 'pending',
    studentsCount: 0,
    rating: 0,
    revenue: 0,
    createdAt: '2024-01-14',
    lastUpdated: '2024-01-14',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    isFeatured: false,
  },
];

const mockActivities: SystemActivity[] = [
  {
    id: 1,
    type: 'user_registered',
    description: 'Novo usuário registrado',
    userId: 10,
    userName: 'Maria Santos',
    timestamp: '2024-01-20T10:30:00',
  },
  {
    id: 2,
    type: 'course_published',
    description: 'Novo curso publicado: TypeScript Avançado',
    userId: 3,
    userName: 'Prof. Carlos Mendes',
    timestamp: '2024-01-20T09:15:00',
  },
  {
    id: 3,
    type: 'payment',
    description: 'Pagamento recebido: 15.000 Kz',
    userId: 7,
    userName: 'Pedro Costa',
    timestamp: '2024-01-20T08:45:00',
  },
];

class AdminApiService {
  // Estatísticas da plataforma
  async getPlatformStats(): Promise<PlatformStats> {
    if (BASE_URL) {
      return http.get<PlatformStats>('/admin/stats');
    }
    await delay();
    return mockPlatformStats;
  }

  // Gerenciamento de Usuários
  async getUsers(filters?: UserFilters): Promise<AdminUser[]> {
    if (BASE_URL) {
      return http.get<AdminUser[]>('/admin/users');
    }
    await delay();
    let users = [...mockUsers];

    if (filters?.role) {
      users = users.filter(u => u.role === filters.role);
    }
    if (filters?.status) {
      users = users.filter(u => u.status === filters.status);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      users = users.filter(u => 
        u.name.toLowerCase().includes(search) || 
        u.email.toLowerCase().includes(search)
      );
    }

    return users;
  }

  async getUserById(userId: number): Promise<AdminUser> {
    if (BASE_URL) {
      return http.get<AdminUser>(`/admin/users/${userId}`);
    }
    await delay();
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  async updateUserStatus(userId: number, status: 'active' | 'suspended'): Promise<void> {
    if (BASE_URL) {
      return http.put(`/admin/users/${userId}/status`, { status });
    }
    await delay();
  }

  async updateUserRole(userId: number, role: 'student' | 'teacher' | 'admin'): Promise<void> {
    if (BASE_URL) {
      return http.put(`/admin/users/${userId}/role`, { role });
    }
    await delay();
  }

  async deleteUser(userId: number): Promise<void> {
    if (BASE_URL) {
      return http.delete(`/admin/users/${userId}`);
    }
    await delay();
  }

  // Gerenciamento de Cursos
  async getCourses(filters?: CourseFilters): Promise<AdminCourse[]> {
    if (BASE_URL) {
      return http.get<AdminCourse[]>('/admin/courses');
    }
    await delay();
    let courses = [...mockCourses];

    if (filters?.status) {
      courses = courses.filter(c => c.status === filters.status);
    }
    if (filters?.category) {
      courses = courses.filter(c => c.category === filters.category);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      courses = courses.filter(c => 
        c.title.toLowerCase().includes(search) || 
        c.instructor.toLowerCase().includes(search)
      );
    }

    return courses;
  }

  async approveCourse(courseId: number): Promise<void> {
    if (BASE_URL) {
      return http.put(`/admin/courses/${courseId}/approve`);
    }
    await delay();
  }

  async rejectCourse(courseId: number, reason: string): Promise<void> {
    if (BASE_URL) {
      return http.put(`/admin/courses/${courseId}/reject`, { reason });
    }
    await delay();
  }

  async toggleFeaturedCourse(courseId: number, isFeatured: boolean): Promise<void> {
    if (BASE_URL) {
      return http.put(`/admin/courses/${courseId}/featured`, { isFeatured });
    }
    await delay();
  }

  async deleteCourse(courseId: number): Promise<void> {
    if (BASE_URL) {
      return http.delete(`/admin/courses/${courseId}`);
    }
    await delay();
  }

  // Relatórios
  async getRevenueReport(period: 'week' | 'month' | 'year'): Promise<RevenueReport[]> {
    if (BASE_URL) {
      return http.get<RevenueReport[]>(`/admin/reports/revenue?period=${period}`);
    }
    await delay();
    return [
      {
        period: '2024-01',
        totalRevenue: 450000,
        courseSales: 420000,
        subscriptions: 35000,
        refunds: 5000,
        netRevenue: 445000,
      },
    ];
  }

  async getSystemActivities(limit: number = 20): Promise<SystemActivity[]> {
    if (BASE_URL) {
      return http.get<SystemActivity[]>(`/admin/activities?limit=${limit}`);
    }
    await delay();
    return mockActivities;
  }

  // Configurações
  async getSettings(): Promise<PlatformSettings> {
    if (BASE_URL) {
      return http.get<PlatformSettings>('/admin/settings');
    }
    await delay();
    return {
      siteName: 'EduKanda',
      siteDescription: 'Plataforma de ensino online em Angola',
      contactEmail: 'contato@edukanda.ao',
      supportEmail: 'suporte@edukanda.ao',
      socialMedia: {
        facebook: 'https://facebook.com/edukanda',
        instagram: 'https://instagram.com/edukanda',
      },
      features: {
        allowRegistration: true,
        requireEmailVerification: false,
        enableCertificates: true,
        enableRanking: true,
        enableReviews: true,
      },
      payment: {
        currency: 'AOA',
        commissionRate: 20,
        minWithdrawal: 50000,
      },
    };
  }

  async updateSettings(settings: Partial<PlatformSettings>): Promise<void> {
    if (BASE_URL) {
      return http.put('/admin/settings', settings);
    }
    await delay();
  }
}

export const adminApi = new AdminApiService();
