import { courses, type Course } from '../data/courses';
import { comments, type Comment, rankingUsers } from '../data/user';
import { certificates } from '../data/certificates';
import { users, validateCredentials, type User } from '../data/users';

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
  role?: 'student' | 'instructor' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

class ApiService {
  // Autenticação
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay();
    
    // TODO: Substituir mock por chamada real
    // const response = await axios.post('/api/auth/login', credentials);
    
    // Validação com usuários mockados
    const user = validateCredentials(credentials.email, credentials.password);
    
    if (user) {
      return {
        token: 'fake_jwt_token_' + Date.now(),
        user: user, // TODO: Em produção, remover senha antes de retornar
      };
    }
    
    throw new Error('Email ou senha inválidos');
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    await delay();
    
    // TODO: Substituir mock por chamada real
    // const response = await axios.post('/api/auth/register', data);
    
    // Simulação de registro
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
    await delay();
    return courses.find(c => c.id === id);
  }

  async toggleFavorite(courseId: number): Promise<void> {
    await delay(200);
    const course = courses.find(c => c.id === courseId);
    if (course) {
      course.isFavorite = !course.isFavorite;
    }
  }

  async getFavoriteCourses(): Promise<Course[]> {
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
    await delay();
    // TODO: Substituir por chamada real
    // const response = await axios.get(`/api/users/${userId}`);
    const user = userId ? users.find(u => u.id === userId) : users[0];
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    await delay();
    // TODO: Substituir por chamada real
    // const response = await axios.put(`/api/users/${userId}`, data);
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Usuário não encontrado');
    Object.assign(user, data);
    return user;
  }

  async getUserProgress(): Promise<Course[]> {
    await delay();
    return courses.filter(c => c.progress > 0);
  }

  // Comentários
  async getComments(courseId: number, lessonId?: number): Promise<Comment[]> {
    await delay();
    
    let filtered = comments.filter(c => c.courseId === courseId);
    
    if (lessonId !== undefined) {
      filtered = filtered.filter(c => c.lessonId === lessonId);
    }
    
    return filtered;
  }

  async addComment(userId: number, courseId: number, content: string, lessonId?: number): Promise<Comment> {
    await delay();
    
    // TODO: Substituir por chamada real
    // const response = await axios.post('/api/comments', { userId, courseId, content, lessonId });
    
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
    await delay();
    return certificates;
  }

  // Ranking
  async getRanking(): Promise<typeof rankingUsers> {
    await delay();
    return rankingUsers;
  }
}

export const api = new ApiService();
