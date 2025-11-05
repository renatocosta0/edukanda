import { Link } from 'react-router-dom';
import { Clock, Users, Star, Heart } from 'lucide-react';
import { type Course } from '../../types';
import { api } from '../../services/api';
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
    <Link to={`/student/course/${course.id}`} className="card-interactive group">
      <div className="relative overflow-hidden rounded-t-xl">
        {/* Thumbnail with overlay gradient */}
        <img
          src={course.thumbnail || 'https://via.placeholder.com/400x250?text=EduKanda'}
          alt={course.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        
        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:scale-110 hover:bg-white dark:hover:bg-gray-800 transition-all z-10"
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
          />
        </button>
        
        {/* Category badge */}
        <span className="badge badge-primary absolute top-3 left-3 z-10">
          {course.category}
        </span>
        
        {/* Progress bar */}
        {(course.progress ?? 0) > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200/50 dark:bg-gray-700/50">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
              style={{ width: `${course.progress ?? 0}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="p-5">
        {/* Title with hover effect */}
        <h3 className="font-display font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {course.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between">
          {/* Instructor info */}
          <div className="flex items-center gap-2">
            <img
              src={course.instructorAvatar || 'https://via.placeholder.com/40?text=Instructor'}
              alt={course.instructor}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {course.instructor}
            </span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-md">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-yellow-700 dark:text-yellow-300">
              {course.rating || '4.5'}
            </span>
          </div>
        </div>
        
        {/* Course details */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{course.duration || '2h 30m'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{course.studentsCount || '0'} alunos</span>
            </div>
          </div>
          
          {/* Progress indicator */}
          {(course.progress ?? 0) > 0 && (
            <span className="badge badge-secondary">
              {course.progress ?? 0}% concluído
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
