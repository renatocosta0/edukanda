export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  userAvatar?: string;
  bio: string;
  joinedDate: string;
  
  // Propriedades de Estudante
  coursesCompleted?: number;
  coursesInProgress?: number;
  coursesInProgressChange?: number;
  completedLastMonth?: number;
  totalHoursWatched?: number;
  hoursLastWeek?: number;
  certificates?: number;
  points?: number;
  pointsLastWeek?: number;
  rank?: number;
  level?: string;
  levelProgress?: number;
  
  // Propriedades de Professor
  totalCourses?: number;
  totalStudents?: number;
  averageRating?: number;
  totalRevenue?: number;
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
