export interface TeacherStats {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  totalRevenue: number;
  coursesPublished: number;
  coursesDraft: number;
  newStudentsThisMonth: number;
  completionRate: number;
}

export interface StudentProgress {
  studentId: number;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  courseId: number;
  courseName: string;
  progress: number;
  lastAccess: string;
  completedLessons: number;
  totalLessons: number;
  timeSpent: number; // em minutos
  grade?: number;
}

export interface CourseAnalytics {
  courseId: number;
  courseName: string;
  totalStudents: number;
  activeStudents: number;
  averageProgress: number;
  completionRate: number;
  averageRating: number;
  totalReviews: number;
  revenue: number;
  enrollmentsThisMonth: number;
  viewsThisMonth: number;
}

export interface LessonAnalytics {
  lessonId: number;
  lessonTitle: string;
  views: number;
  averageWatchTime: number; // em minutos
  completionRate: number;
  dropOffRate: number;
  averageRating?: number;
}

export interface QuestionThread {
  id: number;
  studentId: number;
  studentName: string;
  studentAvatar: string;
  courseId: number;
  courseName: string;
  lessonId?: number;
  lessonTitle?: string;
  question: string;
  createdAt: string;
  status: 'pending' | 'answered' | 'resolved';
  replies: QuestionReply[];
  isUrgent?: boolean;
}

export interface QuestionReply {
  id: number;
  authorId: number;
  authorName: string;
  authorRole: 'teacher' | 'student';
  content: string;
  createdAt: string;
}

export interface CourseFormData {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  thumbnail: string;
  tags: string[];
  prerequisites?: string[];
  learningObjectives?: string[];
  status: 'draft' | 'published';
}

export interface LessonFormData {
  id?: number;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  order: number;
  isFree: boolean;
  resources?: LessonResource[];
}

export interface LessonResource {
  id?: number;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'file';
  url: string;
  size?: number;
}
