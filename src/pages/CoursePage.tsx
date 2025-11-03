import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Play, MessageCircle, ChevronLeft, Heart, BookOpen } from 'lucide-react';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { api } from '../services/api';
import { type Course, type Lesson } from '../data/courses';
import { type Comment } from '../data/user';

export function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState<'lessons' | 'comments'>('lessons');
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const courseData = await api.getCourseById(Number(id));
      if (courseData) {
        setCourse(courseData);
        setIsFavorite(courseData.isFavorite);
        const commentsData = await api.getComments(Number(id));
        setComments(commentsData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!course) return;
    await api.toggleFavorite(course.id);
    setIsFavorite(!isFavorite);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !newComment.trim()) return;

    const comment = await api.addComment(course.id, newComment);
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleStartLesson = (lesson: Lesson) => {
    navigate(`/course/${id}/lesson/${lesson.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Curso não encontrado</p>
          <Button onClick={() => navigate('/home')}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Botão voltar */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        {/* Header do curso */}
        <div className="card overflow-hidden mb-6">
          <div className="relative h-64 md:h-96">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {course.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.studentsCount} alunos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Instrutor</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {course.instructor}
                  </p>
                </div>
              </div>
              <button
                onClick={handleToggleFavorite}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
                />
              </button>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">{course.description}</p>

            {course.progress > 0 && (
              <div className="mb-6">
                <ProgressBar progress={course.progress} showLabel />
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={() => handleStartLesson(course.lessons[0])}
                className="flex-1"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                {course.progress > 0 ? 'Continuar curso' : 'Iniciar curso'}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('lessons')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'lessons'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <BookOpen className="w-5 h-5 inline mr-2" />
                Aulas ({course.lessonsCount})
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'comments'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <MessageCircle className="w-5 h-5 inline mr-2" />
                Comentários ({comments.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'lessons' ? (
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleStartLesson(lesson)}
                    className="w-full flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      lesson.completed
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                        : 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    }`}>
                      {lesson.completed ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lesson.duration}
                      </p>
                    </div>
                    <Play className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <form onSubmit={handleAddComment} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                    rows={3}
                  />
                  <Button type="submit" className="mt-2">
                    Comentar
                  </Button>
                </form>

                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <p className="font-semibold text-gray-900 dark:text-white mb-1">
                            {comment.userName}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            {comment.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <button className="hover:text-primary-600">
                            👍 {comment.likes}
                          </button>
                          <span>
                            {new Date(comment.timestamp).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
