import type {
  TeacherStats,
  StudentProgress,
  CourseAnalytics,
  LessonAnalytics,
  QuestionThread,
  QuestionReply,
  CourseFormData,
  LessonFormData,
} from '../types/teacher';
import type { Course, Lesson } from '../types';
import { http, BASE_URL } from './http';

// Simula delay de rede
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data para desenvolvimento
const mockTeacherStats: TeacherStats = {
  totalCourses: 12,
  totalStudents: 487,
  averageRating: 4.7,
  totalRevenue: 45890,
  coursesPublished: 10,
  coursesDraft: 2,
  newStudentsThisMonth: 89,
  completionRate: 68,
};

const mockStudentProgress: StudentProgress[] = [
  {
    studentId: 1,
    studentName: 'Ana Silva',
    studentEmail: 'ana@example.com',
    studentAvatar: 'https://i.pravatar.cc/150?img=1',
    courseId: 1,
    courseName: 'React Avançado',
    progress: 75,
    lastAccess: '2024-01-15T10:30:00',
    completedLessons: 15,
    totalLessons: 20,
    timeSpent: 450,
    grade: 8.5,
  },
  {
    studentId: 2,
    studentName: 'João Santos',
    studentEmail: 'joao@example.com',
    studentAvatar: 'https://i.pravatar.cc/150?img=2',
    courseId: 1,
    courseName: 'React Avançado',
    progress: 45,
    lastAccess: '2024-01-14T15:20:00',
    completedLessons: 9,
    totalLessons: 20,
    timeSpent: 280,
  },
];

const mockCourseAnalytics: CourseAnalytics[] = [
  {
    courseId: 1,
    courseName: 'React Avançado',
    totalStudents: 156,
    activeStudents: 98,
    averageProgress: 62,
    completionRate: 45,
    averageRating: 4.8,
    totalReviews: 89,
    revenue: 15600,
    enrollmentsThisMonth: 23,
    viewsThisMonth: 1245,
  },
];

const mockQuestions: QuestionThread[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Ana Silva',
    studentAvatar: 'https://i.pravatar.cc/150?img=1',
    courseId: 1,
    courseName: 'React Avançado',
    lessonId: 3,
    lessonTitle: 'Hooks Avançados',
    question: 'Como posso otimizar o useEffect para evitar renderizações desnecessárias?',
    createdAt: '2024-01-15T10:30:00',
    status: 'pending',
    replies: [],
    isUrgent: true,
  },
];

class TeacherApiService {
  // Estatísticas do Professor
  async getTeacherStats(teacherId: number): Promise<TeacherStats> {
    if (BASE_URL) {
      return http.get<TeacherStats>(`/teacher/${teacherId}/stats`);
    }
    await delay();
    return mockTeacherStats;
  }

  // Gerenciamento de Cursos
  async getTeacherCourses(teacherId: number): Promise<Course[]> {
    if (BASE_URL) {
      return http.get<Course[]>(`/teacher/${teacherId}/courses`);
    }
    await delay();
    // Cursos mockados do professor
    return [
      {
        id: 1,
        title: 'React do Zero ao Avançado',
        category: 'Programação',
        description: 'Aprenda React desde os fundamentos até conceitos avançados como Hooks, Context API e otimização de performance.',
        instructor: 'Prof. Carlos Mendes',
        instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        duration: '12h',
        lessonsCount: 45,
        studentsCount: 156,
        students: 156,
        rating: 4.8,
        status: 'published',
        level: 'intermediate',
        price: 15000,
        tags: ['React', 'JavaScript', 'Frontend'],
        lastUpdated: '2024-01-10',
        lessons: [],
      },
      {
        id: 2,
        title: 'JavaScript Moderno (ES6+)',
        category: 'Programação',
        description: 'Domine as funcionalidades modernas do JavaScript incluindo arrow functions, destructuring, async/await e muito mais.',
        instructor: 'Prof. Carlos Mendes',
        instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
        thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
        duration: '8h',
        lessonsCount: 32,
        studentsCount: 203,
        students: 203,
        rating: 4.9,
        status: 'published',
        level: 'beginner',
        price: 12000,
        tags: ['JavaScript', 'ES6', 'Programming'],
        lastUpdated: '2024-01-08',
        lessons: [],
      },
      {
        id: 3,
        title: 'TypeScript na Prática',
        category: 'Programação',
        description: 'Aprenda TypeScript e como ele pode melhorar a qualidade e manutenibilidade do seu código JavaScript.',
        instructor: 'Prof. Carlos Mendes',
        instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        duration: '10h',
        lessonsCount: 38,
        studentsCount: 142,
        students: 142,
        rating: 4.7,
        status: 'published',
        level: 'intermediate',
        price: 14000,
        tags: ['TypeScript', 'JavaScript', 'Types'],
        lastUpdated: '2024-01-05',
        lessons: [],
      },
      {
        id: 4,
        title: 'Node.js e Express - Backend Completo',
        category: 'Programação',
        description: 'Construa APIs RESTful robustas e escaláveis com Node.js e Express, incluindo autenticação, banco de dados e deploy.',
        instructor: 'Prof. Carlos Mendes',
        instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        duration: '15h',
        lessonsCount: 52,
        studentsCount: 178,
        students: 178,
        rating: 4.8,
        status: 'published',
        level: 'advanced',
        price: 18000,
        tags: ['Node.js', 'Express', 'Backend', 'API'],
        lastUpdated: '2024-01-12',
        lessons: [],
      },
      {
        id: 5,
        title: 'Git e GitHub para Iniciantes',
        category: 'Programação',
        description: 'Aprenda controle de versão com Git e colaboração em projetos usando GitHub.',
        instructor: 'Prof. Carlos Mendes',
        instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
        thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800',
        duration: '5h',
        lessonsCount: 20,
        studentsCount: 289,
        students: 289,
        rating: 4.9,
        status: 'published',
        level: 'beginner',
        price: 8000,
        tags: ['Git', 'GitHub', 'Version Control'],
        lastUpdated: '2024-01-15',
        lessons: [],
      },
      {
        id: 6,
        title: 'Tailwind CSS - Design Moderno',
        category: 'Design',
        description: 'Crie interfaces modernas e responsivas rapidamente usando Tailwind CSS.',
        instructor: 'Prof. Carlos Mendes',
        instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
        duration: '6h',
        lessonsCount: 24,
        studentsCount: 167,
        students: 167,
        rating: 4.6,
        status: 'published',
        level: 'beginner',
        price: 10000,
        tags: ['Tailwind', 'CSS', 'Design', 'UI'],
        lastUpdated: '2024-01-07',
        lessons: [],
      },
      {
        id: 7,
        title: 'Next.js - Framework React Avançado',
        category: 'Programação',
        description: 'Construa aplicações React com SSR, SSG e rotas API usando Next.js.',
        instructor: 'Prof. Carlos Mendes',
        instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
        duration: '14h',
        lessonsCount: 48,
        studentsCount: 134,
        students: 134,
        rating: 4.7,
        status: 'published',
        level: 'advanced',
        price: 16000,
        tags: ['Next.js', 'React', 'SSR', 'Framework'],
        lastUpdated: '2024-01-09',
        lessons: [],
      },
      {
        id: 8,
        title: 'MongoDB - Banco de Dados NoSQL',
        category: 'Programação',
        description: 'Aprenda a trabalhar com MongoDB, desde operações básicas até agregações complexas e otimização.',
        instructor: 'Prof. Carlos Mendes',
        instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
        thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
        duration: '9h',
        lessonsCount: 35,
        studentsCount: 98,
        students: 98,
        rating: 4.5,
        status: 'draft',
        level: 'intermediate',
        price: 13000,
        tags: ['MongoDB', 'NoSQL', 'Database'],
        lastUpdated: '2024-01-14',
        lessons: [],
      },
    ];
  }

  async createCourse(teacherId: number, courseData: CourseFormData): Promise<Course> {
    if (BASE_URL) {
      return http.post<Course>(`/teacher/${teacherId}/courses`, courseData);
    }
    await delay();
    const newCourse: Course = {
      id: Date.now(),
      ...courseData,
      instructor: 'Professor Mock',
      instructorAvatar: 'https://i.pravatar.cc/150?img=10',
      rating: 0,
      students: 0,
      lessons: [],
      duration: '0h',
      lastUpdated: new Date().toISOString(),
      progress: 0,
    };
    return newCourse;
  }

  async updateCourse(courseId: number, courseData: Partial<CourseFormData>): Promise<Course> {
    if (BASE_URL) {
      return http.put<Course>(`/courses/${courseId}`, courseData);
    }
    await delay();
    // Mock: retorna curso atualizado
    throw new Error('Curso atualizado com sucesso');
  }

  async deleteCourse(courseId: number): Promise<void> {
    if (BASE_URL) {
      return http.delete(`/courses/${courseId}`);
    }
    await delay();
  }

  async publishCourse(courseId: number): Promise<Course> {
    if (BASE_URL) {
      return http.post<Course>(`/courses/${courseId}/publish`);
    }
    await delay();
    throw new Error('Curso publicado com sucesso');
  }

  // Gerenciamento de Aulas
  async createLesson(courseId: number, lessonData: LessonFormData): Promise<Lesson> {
    if (BASE_URL) {
      return http.post<Lesson>(`/courses/${courseId}/lessons`, lessonData);
    }
    await delay();
    const newLesson: Lesson = {
      id: Date.now(),
      title: lessonData.title,
      description: lessonData.description,
      duration: lessonData.duration.toString() + ' min',
      videoUrl: lessonData.videoUrl,
      order: lessonData.order,
      isFree: lessonData.isFree,
      completed: false,
    };
    return newLesson;
  }

  async updateLesson(lessonId: number, lessonData: Partial<LessonFormData>): Promise<Lesson> {
    if (BASE_URL) {
      return http.put<Lesson>(`/lessons/${lessonId}`, lessonData);
    }
    await delay();
    throw new Error('Aula atualizada com sucesso');
  }

  async deleteLesson(lessonId: number): Promise<void> {
    if (BASE_URL) {
      return http.delete(`/lessons/${lessonId}`);
    }
    await delay();
  }

  async reorderLessons(courseId: number, lessonIds: number[]): Promise<void> {
    if (BASE_URL) {
      return http.put(`/courses/${courseId}/lessons/reorder`, { lessonIds });
    }
    await delay();
  }

  // Acompanhamento de Alunos
  async getCourseStudents(courseId: number): Promise<StudentProgress[]> {
    if (BASE_URL) {
      return http.get<StudentProgress[]>(`/courses/${courseId}/students`);
    }
    await delay();
    return mockStudentProgress;
  }

  async getAllStudents(teacherId: number): Promise<StudentProgress[]> {
    if (BASE_URL) {
      return http.get<StudentProgress[]>(`/teacher/${teacherId}/students`);
    }
    await delay();
    return mockStudentProgress;
  }

  // Analytics
  async getCourseAnalytics(courseId: number): Promise<CourseAnalytics> {
    if (BASE_URL) {
      return http.get<CourseAnalytics>(`/courses/${courseId}/analytics`);
    }
    await delay();
    return mockCourseAnalytics[0];
  }

  async getAllCoursesAnalytics(teacherId: number): Promise<CourseAnalytics[]> {
    if (BASE_URL) {
      return http.get<CourseAnalytics[]>(`/teacher/${teacherId}/analytics`);
    }
    await delay();
    return mockCourseAnalytics;
  }

  async getLessonAnalytics(lessonId: number): Promise<LessonAnalytics> {
    if (BASE_URL) {
      return http.get<LessonAnalytics>(`/lessons/${lessonId}/analytics`);
    }
    await delay();
    return {
      lessonId,
      lessonTitle: 'Aula Mock',
      views: 245,
      averageWatchTime: 18,
      completionRate: 78,
      dropOffRate: 22,
      averageRating: 4.6,
    };
  }

  // Perguntas e Respostas
  async getQuestions(teacherId: number, status?: 'pending' | 'answered' | 'resolved'): Promise<QuestionThread[]> {
    if (BASE_URL) {
      const params = status ? `?status=${status}` : '';
      return http.get<QuestionThread[]>(`/teacher/${teacherId}/questions${params}`);
    }
    await delay();
    return status ? mockQuestions.filter(q => q.status === status) : mockQuestions;
  }

  async replyToQuestion(questionId: number, content: string): Promise<QuestionReply> {
    if (BASE_URL) {
      return http.post<QuestionReply>(`/questions/${questionId}/replies`, { content });
    }
    await delay();
    return {
      id: Date.now(),
      authorId: 1,
      authorName: 'Professor',
      authorRole: 'teacher',
      content,
      createdAt: new Date().toISOString(),
    };
  }

  async updateQuestionStatus(questionId: number, status: 'pending' | 'answered' | 'resolved'): Promise<void> {
    if (BASE_URL) {
      return http.put(`/questions/${questionId}/status`, { status });
    }
    await delay();
  }
}

export const teacherApi = new TeacherApiService();
