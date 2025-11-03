import { Link } from 'react-router-dom';
import { Clock, Users, Star, Heart } from 'lucide-react';
import { type Course } from '../data/courses';
import { api } from '../services/api';
import { useState } from 'react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [isFavorite, setIsFavorite] = useState(course.isFavorite);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await api.toggleFavorite(course.id);
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/course/${course.id}`} className="card overflow-hidden group">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
          />
        </button>
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-primary-600"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded">
            {course.category}
          </span>
          {course.progress > 0 && (
            <span className="text-xs font-semibold px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded">
              {course.progress}% concluído
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {course.instructor}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.studentsCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{course.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
