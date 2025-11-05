export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  completed?: boolean;
  thumbnail?: string;
  description?: string;
  type?: string;
  order?: number;
  isFree?: boolean;
  materials?: Array<{
    title: string;
    url: string;
    type: string; // e.g. 'pdf' | 'link'
  }>;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  instructor: string;
  instructorAvatar?: string;
  thumbnail?: string;
  duration?: string;
  lessonsCount?: number;
  studentsCount?: number;
  students?: number;
  rating?: number;
  progress?: number;
  isFavorite?: boolean;
  completedLessons?: number;
  lastActivity?: string;
  lastUpdated?: string;
  lessons: Lesson[];
  level?: 'beginner' | 'intermediate' | 'advanced';
  price?: number;
  tags?: string[];
  prerequisites?: string[];
  learningObjectives?: string[];
  status?: 'draft' | 'published';
}
