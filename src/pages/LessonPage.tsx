import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Download, ExternalLink, Play } from 'lucide-react';
import { Button } from '../components/Button';
import { api } from '../services/api';
import { type Course, type Lesson } from '../data/courses';

export function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    loadLesson();
  }, [courseId, lessonId]);

  const loadLesson = async () => {
    if (!courseId || !lessonId) return;

    const courseData = await api.getCourseById(Number(courseId));
    if (courseData) {
      setCourse(courseData);
      const lessonData = courseData.lessons.find(l => l.id === Number(lessonId));
      if (lessonData) {
        setLesson(lessonData);
        setIsCompleted(lessonData.completed);
      }
    }
  };

  const handleMarkComplete = async () => {
    if (!courseId || !lessonId) return;

    await api.markLessonComplete(Number(courseId), Number(lessonId));
    setIsCompleted(true);
  };

  const handleNextLesson = () => {
    if (!course || !lesson) return;

    const currentIndex = course.lessons.findIndex(l => l.id === lesson.id);
    if (currentIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[currentIndex + 1];
      navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const currentIndex = course.lessons.findIndex(l => l.id === lesson.id);
  const isLastLesson = currentIndex === course.lessons.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Botão voltar */}
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Voltar ao curso</span>
        </button>

        {/* Player de vídeo simulado */}
        <div className="card overflow-hidden mb-6">
          <div className="relative bg-black aspect-video flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20" />
            <img
              src={course.thumbnail}
              alt={lesson.title}
              className="w-full h-full object-cover opacity-50"
            />
            <button className="relative z-10 w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110">
              <Play className="w-10 h-10 text-primary-600 ml-1" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {lesson.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Aula {currentIndex + 1} de {course.lessons.length} • {lesson.duration}
                </p>
              </div>
              {isCompleted && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">Concluída</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {!isCompleted && (
                <Button onClick={handleMarkComplete} variant="secondary">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Marcar como concluída
                </Button>
              )}
              <Button onClick={handleNextLesson}>
                {isLastLesson ? 'Voltar ao curso' : 'Próxima aula'}
              </Button>
            </div>
          </div>
        </div>

        {/* Material complementar */}
        {lesson.materials && lesson.materials.length > 0 && (
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Material Complementar
            </h2>
            <div className="space-y-3">
              {lesson.materials.map((material, index) => (
                <a
                  key={index}
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {material.type === 'pdf' ? (
                    <Download className="w-5 h-5 text-primary-600" />
                  ) : (
                    <ExternalLink className="w-5 h-5 text-primary-600" />
                  )}
                  <span className="flex-1 font-medium text-gray-900 dark:text-white">
                    {material.title}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 uppercase">
                    {material.type}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
