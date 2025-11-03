export interface Certificate {
  id: number;
  courseId: number;
  courseName: string;
  instructorName: string;
  completionDate: string;
  certificateUrl: string;
  hours: number;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    courseId: 1,
    courseName: 'Fundamentos de Programação com Python',
    instructorName: 'Prof. João Silva',
    completionDate: '2024-02-20',
    certificateUrl: '/certificates/cert-001.pdf',
    hours: 8.5,
  },
  {
    id: 2,
    courseId: 3,
    courseName: 'Física Mecânica - Cinemática',
    instructorName: 'Prof. Carlos Mendes',
    completionDate: '2024-03-05',
    certificateUrl: '/certificates/cert-002.pdf',
    hours: 10.75,
  },
];
