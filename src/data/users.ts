export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // Em produção, nunca armazenar senha em texto plano
  role: UserRole;
  avatar: string;
  bio: string;
  joinedDate: string;
  coursesCompleted: number;
  coursesInProgress: number;
  totalHoursWatched: number;
  certificates: number;
  points: number;
  rank: number;
}

// Usuários mockados para teste
export const users: User[] = [
  {
    id: 1,
    name: 'Renato',
    email: 'renato@edukanda.ao',
    password: '123456', // Senha mockada
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=renato',
    bio: 'Estudante apaixonado por tecnologia e educação',
    joinedDate: '2024-01-15',
    coursesCompleted: 5,
    coursesInProgress: 3,
    totalHoursWatched: 45,
    certificates: 5,
    points: 1250,
    rank: 15,
  },
  {
    id: 2,
    name: 'Ana Silva',
    email: 'ana@edukanda.ao',
    password: '123456',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    bio: 'Estudante de engenharia',
    joinedDate: '2024-02-01',
    coursesCompleted: 3,
    coursesInProgress: 2,
    totalHoursWatched: 28,
    certificates: 3,
    points: 890,
    rank: 25,
  },
  {
    id: 3,
    name: 'Prof. Carlos Mendes',
    email: 'carlos@edukanda.ao',
    password: '123456',
    role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    bio: 'Professor de Física com 10 anos de experiência',
    joinedDate: '2023-11-01',
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalHoursWatched: 0,
    certificates: 0,
    points: 0,
    rank: 0,
  },
  {
    id: 4,
    name: 'Prof. João Silva',
    email: 'joao@edukanda.ao',
    password: '123456',
    role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
    bio: 'Especialista em Programação e Desenvolvimento Web',
    joinedDate: '2023-10-15',
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalHoursWatched: 0,
    certificates: 0,
    points: 0,
    rank: 0,
  },
  {
    id: 5,
    name: 'Admin EduKanda',
    email: 'admin@edukanda.ao',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    bio: 'Administrador da plataforma EduKanda',
    joinedDate: '2023-09-01',
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalHoursWatched: 0,
    certificates: 0,
    points: 0,
    rank: 0,
  },
];

// Função auxiliar para buscar usuário por email
export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

// Função auxiliar para validar credenciais
export function validateCredentials(email: string, password: string): User | null {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
}
