import { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { api } from '../services/api';
import { categories, type Course } from '../data/courses';
import { useAuth } from '../context/AuthContext';

export function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [selectedCategory, searchQuery, courses, showFavorites]);

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const data = await api.getCourses();
      setCourses(data);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCourses = async () => {
    let filtered = [...courses];

    if (showFavorites) {
      filtered = filtered.filter(c => c.isFavorite);
    }

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        c =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.instructor.toLowerCase().includes(query)
      );
    }

    setFilteredCourses(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Olá, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            O que você quer aprender hoje?
          </p>
        </div>

        {/* Barra de pesquisa */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cursos..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filtro de favoritos */}
        <div className="mb-6">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showFavorites
                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Heart className={`w-5 h-5 ${showFavorites ? 'fill-current' : ''}`} />
            <span className="font-medium">
              {showFavorites ? 'Mostrando favoritos' : 'Ver favoritos'}
            </span>
          </button>
        </div>

        {/* Categorias */}
        <div className="mb-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('Todos')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'Todos'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Todos
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de cursos */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {showFavorites
                ? 'Você ainda não tem cursos favoritos'
                : 'Nenhum curso encontrado'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
