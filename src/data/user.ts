export interface User {
  id: number;
  name: string;
  email: string;
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

export interface Comment {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  courseId: number;
  lessonId?: number;
  content: string;
  timestamp: string;
  likes: number;
}

export const currentUser: User = {
  id: 1,
  name: 'Renato',
  email: 'renato@edukanda.ao',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=renato',
  bio: 'Estudante apaixonado por tecnologia e educação',
  joinedDate: '2024-01-15',
  coursesCompleted: 5,
  coursesInProgress: 3,
  totalHoursWatched: 45,
  certificates: 5,
  points: 1250,
  rank: 15,
};

export const comments: Comment[] = [
  {
    id: 1,
    userId: 2,
    userName: 'Ana Costa',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    courseId: 1,
    lessonId: 1,
    content: 'Excelente aula! Muito bem explicado, professor.',
    timestamp: '2024-03-15T10:30:00',
    likes: 12,
  },
  {
    id: 2,
    userId: 3,
    userName: 'Miguel Santos',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=miguel',
    courseId: 1,
    lessonId: 1,
    content: 'Poderia explicar melhor a parte sobre variáveis?',
    timestamp: '2024-03-15T14:20:00',
    likes: 5,
  },
  {
    id: 3,
    userId: 4,
    userName: 'Sofia Pereira',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
    courseId: 1,
    content: 'Curso maravilhoso! Recomendo para todos que querem aprender programação.',
    timestamp: '2024-03-16T09:15:00',
    likes: 20,
  },
];

export const rankingUsers = [
  { id: 1, name: 'Renato', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=renato', points: 1250, rank: 15 },
  { id: 5, name: 'Lucas Fernandes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucas', points: 2850, rank: 1 },
  { id: 6, name: 'Beatriz Lima', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=beatriz', points: 2640, rank: 2 },
  { id: 7, name: 'Rafael Alves', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rafael', points: 2430, rank: 3 },
  { id: 8, name: 'Juliana Rocha', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juliana', points: 2210, rank: 4 },
  { id: 9, name: 'André Martins', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=andre', points: 2050, rank: 5 },
  { id: 10, name: 'Carla Sousa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carla', points: 1890, rank: 6 },
  { id: 11, name: 'Bruno Costa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bruno', points: 1720, rank: 7 },
  { id: 12, name: 'Mariana Silva', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariana', points: 1580, rank: 8 },
  { id: 13, name: 'Paulo Nunes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=paulo', points: 1450, rank: 9 },
  { id: 14, name: 'Isabela Dias', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=isabela', points: 1320, rank: 10 },
];
