import { courses } from '../data/courses';
import { comments, rankingUsers } from '../data/user';
import { certificates } from '../data/certificates';
import { users, validateCredentials } from '../data/users';
import type { Course, Comment, User } from '../types';
import { http, BASE_URL } from './http';

// Simula delay de rede
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'student' | 'teacher' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

class ApiService {
  // Autenticação
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (BASE_URL) {
      return http.post<AuthResponse>('/users/login', credentials);
    }
    await delay();
    const user = validateCredentials(credentials.email, credentials.password);
    if (user) {
      return { token: 'fake_jwt_token_' + Date.now(), user };
    }
    throw new Error('Email ou senha inválidos');
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    if (BASE_URL) {
      return http.post<AuthResponse>('/users/register', data);
    }
    await delay();
    // Simulação de registro (mock)
    if (data.name && data.email && data.password.length >= 6) {
      // Cria novo usuário mockado
      const newUser: User = {
        id: users.length + 1,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || 'student',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
        bio: 'Novo estudante na plataforma',
        joinedDate: new Date().toISOString().split('T')[0],
        coursesCompleted: 0,
        coursesInProgress: 0,
        totalHoursWatched: 0,
        certificates: 0,
        points: 0,
        rank: 0,
      };
      
      // Adiciona à lista mockada
      users.push(newUser);
      
      return {
        token: 'fake_jwt_token_' + Date.now(),
        user: newUser,
      };
    }
    
    throw new Error('Dados inválidos');
  }

  async logout(): Promise<void> {
    await delay(200);
    // Em produção, invalidar token no backend
    // await axios.post('/api/auth/logout');
  }

  // Cursos
  async getCourses(category?: string, search?: string): Promise<Course[]> {
    if (BASE_URL) {
      const list = await http.get<Course[]>('/courses');
      // Filtro client-side para manter API simples aqui
      let filteredCourses = [...list];
      if (category && category !== 'Todos') {
        filteredCourses = filteredCourses.filter(c => c.category === category);
      }
      if (search) {
        const searchLower = search.toLowerCase();
        filteredCourses = filteredCourses.filter(c =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower) ||
          c.instructor.toLowerCase().includes(searchLower)
        );
      }
      return filteredCourses;
    }
    await delay();
    let filteredCourses = [...courses];
    
    if (category && category !== 'Todos') {
      filteredCourses = filteredCourses.filter(c => c.category === category);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCourses = filteredCourses.filter(c => 
        c.title.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.instructor.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredCourses;
  }

  async getCourseById(id: number): Promise<Course | undefined> {
    if (BASE_URL) {
      return http.get<Course>(`/courses/${id}`);
    }
    await delay();
    return courses.find(c => c.id === id);
  }

  async toggleFavorite(courseId: number): Promise<void> {
    if (BASE_URL) {
      await http.post<void>(`/courses/${courseId}/favorite`);
      return;
    }
    await delay(200);
    const course = courses.find(c => c.id === courseId);
    if (course) {
      course.isFavorite = !course.isFavorite;
    }
  }

  async getFavoriteCourses(): Promise<Course[]> {
    if (BASE_URL) {
      return http.get<Course[]>('/courses?favorite=true');
    }
    await delay();
    return courses.filter(c => c.isFavorite);
  }

  async markLessonComplete(courseId: number, lessonId: number): Promise<void> {
    await delay(200);
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const lesson = course.lessons.find(l => l.id === lessonId);
      if (lesson) {
        lesson.completed = true;
        
        // Atualiza progresso do curso
        const completedLessons = course.lessons.filter(l => l.completed).length;
        course.progress = Math.round((completedLessons / course.lessons.length) * 100);
      }
    }
  }

  // Usuário
  async getUser(userId?: number): Promise<User> {
    if (BASE_URL) {
      const id = userId ?? 0;
      return http.get<User>(`/users/${id}`);
    }
    await delay();
    const user = userId ? users.find(u => u.id === userId) : users[0];
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    if (BASE_URL) {
      return http.put<User>(`/users/${userId}`, data);
    }
    await delay();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Usuário não encontrado');
    Object.assign(user, data);
    return user;
  }

  async getUserProgress(): Promise<Course[]> {
    if (BASE_URL) {
      return http.get<Course[]>(`/users/progress`);
    }
    await delay();
    return courses.filter(c => c.progress > 0);
  }

  // Comentários
  async getComments(courseId: number, lessonId?: number): Promise<Comment[]> {
    if (BASE_URL) {
      const query = lessonId !== undefined ? `&lessonId=${lessonId}` : '';
      return http.get<Comment[]>(`/comments?courseId=${courseId}${query}`);
    }
    await delay();
    let filtered = comments.filter(c => c.courseId === courseId);
    if (lessonId !== undefined) {
      filtered = filtered.filter(c => c.lessonId === lessonId);
    }
    return filtered;
  }

  async addComment(userId: number, courseId: number, content: string, lessonId?: number): Promise<Comment> {
    if (BASE_URL) {
      return http.post<Comment>('/comments', { userId, courseId, content, lessonId });
    }
    await delay();
    const user = users.find(u => u.id === userId) || users[0];
    const newComment: Comment = {
      id: comments.length + 1,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      courseId,
      lessonId,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    comments.push(newComment);
    return newComment;
  }

  // Certificados
  async getCertificates(): Promise<typeof certificates> {
    if (BASE_URL) {
      return http.get<typeof certificates>('/users/certificates');
    }
    await delay();
    return certificates;
  }

  // Ranking
  async getRanking(): Promise<typeof rankingUsers> {
    if (BASE_URL) {
      return http.get<typeof rankingUsers>('/ranking');
    }
    await delay();
    return rankingUsers;
  }
}

export const api = new ApiService();
