export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  materials?: {
    title: string;
    url: string;
    type: 'pdf' | 'link';
  }[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  duration: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  progress: number;
  isFavorite: boolean;
  lessons: Lesson[];
}

export const categories = [
  { id: 1, name: 'Matemática', icon: '📐' },
  { id: 2, name: 'Física', icon: '⚛️' },
  { id: 3, name: 'Química', icon: '🧪' },
  { id: 4, name: 'Programação', icon: '💻' },
  { id: 5, name: 'História', icon: '📚' },
  { id: 6, name: 'Geografia', icon: '🌍' },
  { id: 7, name: 'Biologia', icon: '🧬' },
  { id: 8, name: 'Literatura', icon: '📖' },
];

export const courses: Course[] = [
  {
    id: 1,
    title: 'Fundamentos de Programação com Python',
    description: 'Aprenda os conceitos básicos de programação usando Python, uma das linguagens mais populares do mundo. Ideal para iniciantes que querem começar sua jornada na tecnologia.',
    category: 'Programação',
    instructor: 'Prof. João Silva',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop',
    duration: '8h 30min',
    lessonsCount: 24,
    studentsCount: 1250,
    rating: 4.8,
    progress: 45,
    isFavorite: true,
    lessons: [
      {
        id: 1,
        title: 'Introdução ao Python',
        duration: '15:30',
        videoUrl: 'https://example.com/video1',
        completed: true,
        materials: [
          { title: 'Slides da Aula', url: '/materials/python-intro.pdf', type: 'pdf' },
          { title: 'Documentação Python', url: 'https://python.org', type: 'link' },
        ],
      },
      {
        id: 2,
        title: 'Variáveis e Tipos de Dados',
        duration: '20:45',
        videoUrl: 'https://example.com/video2',
        completed: true,
      },
      {
        id: 3,
        title: 'Estruturas de Controle',
        duration: '25:15',
        videoUrl: 'https://example.com/video3',
        completed: false,
      },
      {
        id: 4,
        title: 'Funções em Python',
        duration: '30:00',
        videoUrl: 'https://example.com/video4',
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Cálculo I - Limites e Derivadas',
    description: 'Domine os conceitos fundamentais do cálculo diferencial. Aprenda sobre limites, continuidade e derivadas com exemplos práticos e exercícios resolvidos.',
    category: 'Matemática',
    instructor: 'Prof. Maria Santos',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
    duration: '12h 15min',
    lessonsCount: 36,
    studentsCount: 890,
    rating: 4.9,
    progress: 0,
    isFavorite: false,
    lessons: [
      {
        id: 1,
        title: 'Introdução ao Cálculo',
        duration: '18:20',
        videoUrl: 'https://example.com/video5',
        completed: false,
      },
      {
        id: 2,
        title: 'Limites - Parte 1',
        duration: '22:30',
        videoUrl: 'https://example.com/video6',
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: 'Física Mecânica - Cinemática',
    description: 'Estude os movimentos dos corpos, velocidade, aceleração e as leis de Newton. Curso completo com teoria e exercícios práticos.',
    category: 'Física',
    instructor: 'Prof. Carlos Mendes',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=450&fit=crop',
    duration: '10h 45min',
    lessonsCount: 28,
    studentsCount: 654,
    rating: 4.7,
    progress: 20,
    isFavorite: true,
    lessons: [
      {
        id: 1,
        title: 'Movimento Uniforme',
        duration: '16:40',
        videoUrl: 'https://example.com/video7',
        completed: true,
      },
      {
        id: 2,
        title: 'Movimento Uniformemente Variado',
        duration: '24:15',
        videoUrl: 'https://example.com/video8',
        completed: false,
      },
    ],
  },
  {
    id: 4,
    title: 'Química Orgânica Básica',
    description: 'Introdução à química orgânica: hidrocarbonetos, funções orgânicas e reações químicas. Perfeito para estudantes do ensino médio.',
    category: 'Química',
    instructor: 'Prof. Ana Paula',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop',
    duration: '9h 20min',
    lessonsCount: 22,
    studentsCount: 432,
    rating: 4.6,
    progress: 0,
    isFavorite: false,
    lessons: [
      {
        id: 1,
        title: 'Introdução à Química Orgânica',
        duration: '14:30',
        videoUrl: 'https://example.com/video9',
        completed: false,
      },
    ],
  },
  {
    id: 5,
    title: 'História de Angola - Independência',
    description: 'Conheça a história da independência de Angola, os movimentos de libertação e a construção da nação angolana.',
    category: 'História',
    instructor: 'Prof. Pedro Neto',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedro',
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&h=450&fit=crop',
    duration: '6h 50min',
    lessonsCount: 18,
    studentsCount: 789,
    rating: 4.9,
    progress: 0,
    isFavorite: false,
    lessons: [
      {
        id: 1,
        title: 'Contexto Colonial',
        duration: '20:00',
        videoUrl: 'https://example.com/video10',
        completed: false,
      },
    ],
  },
  {
    id: 6,
    title: 'Desenvolvimento Web com React',
    description: 'Aprenda a criar aplicações web modernas usando React, a biblioteca JavaScript mais popular para interfaces de usuário.',
    category: 'Programação',
    instructor: 'Prof. João Silva',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    duration: '15h 30min',
    lessonsCount: 42,
    studentsCount: 1567,
    rating: 4.9,
    progress: 0,
    isFavorite: false,
    lessons: [
      {
        id: 1,
        title: 'Introdução ao React',
        duration: '18:45',
        videoUrl: 'https://example.com/video11',
        completed: false,
      },
    ],
  },
];
