import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Download, ExternalLink, Play, List, Clock, BookOpen, Menu } from 'lucide-react';
import { Button } from '../../components/ui';
import { VideoPlayer } from '../../components/player/VideoPlayer';
import { api } from '../../services/api';
import type { Course, Lesson } from '../../types';

export function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (!courseId || !lessonId) return;
    (async () => {
      const courseData = await api.getCourseById(Number(courseId));
      if (courseData) {
        setCourse(courseData);
        const lessonData = courseData.lessons.find(l => l.id === Number(lessonId));
        if (lessonData) {
          setLesson(lessonData);
          setIsCompleted(!!lessonData.completed);
        }
      }
    })();
  }, [courseId, lessonId]);

  const handleMarkComplete = async () => {
    if (!courseId || !lessonId) return;

    await api.markLessonComplete(Number(courseId), Number(lessonId));
    setIsCompleted(true);
  };
  
  const handleVideoProgress = (videoProgress: number) => {
    // Marcar como concluído automaticamente quando atingir 90% do vídeo
    if (videoProgress >= 90 && !isCompleted) {
      handleMarkComplete();
    }
  };
  
  const handleVideoComplete = () => {
    if (!isCompleted) {
      handleMarkComplete();
    }
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleNextLesson = () => {
    if (!course || !lesson) return;

    const currentIndex = course.lessons.findIndex(l => l.id === lesson.id);
    if (currentIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[currentIndex + 1];
      navigate(`/student/course/${courseId}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/student/course/${courseId}`);
    }
  };

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">Carregando aula...</p>
        </div>
      </div>
    );
  }

  const currentIndex = course.lessons.findIndex(l => l.id === lesson.id);
  const isLastLesson = currentIndex === course.lessons.length - 1;

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Barra superior */}
      <div className="bg-gray-800 border-b border-gray-700 fixed top-0 left-0 right-0 z-20 h-16 flex items-center px-4">
        <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/student/course/${courseId}`)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Voltar ao curso"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar ao curso</span>
            </button>
            
            <div className="hidden md:block h-6 w-px bg-gray-700"></div>
            
            <div className="hidden md:block">
              <h1 className="text-white font-medium truncate max-w-md">
                {course.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSidebar}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors md:hidden"
              aria-label="Mostrar conteúdo do curso"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{lesson.duration}</span>
            </div>
            
            {isCompleted && (
              <div className="flex items-center gap-1.5 text-success-500 bg-success-900/20 py-1 px-2.5 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Concluída</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar com lista de aulas (visível em desktop ou quando toggleSidebar=true) */}
        <div className={`fixed inset-0 z-30 md:relative md:w-80 md:h-auto md:block transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="absolute inset-0 bg-black/50 md:hidden" onClick={toggleSidebar}></div>
          
          <div className="relative h-full w-3/4 max-w-xs md:w-full bg-gray-800 border-r border-gray-700 overflow-y-auto pb-20">
            <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>Conteúdo do curso</span>
              </h2>
              <button 
                onClick={toggleSidebar}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg md:hidden"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-2">
              {course.lessons.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(`/student/course/${courseId}/lesson/${item.id}`);
                    setShowSidebar(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left mb-1 ${item.id === lesson.id 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${item.completed 
                    ? 'bg-success-900/30 text-success-500' 
                    : 'bg-gray-700 text-gray-300'}`}
                  >
                    {item.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 truncate">{item.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-1 md:ml-80">
          {/* Player de vídeo */}
          <div className="bg-black">
            <div className="max-w-5xl mx-auto">
              <VideoPlayer
                videoUrl={lesson.videoUrl || 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'}
                poster={lesson.thumbnail || course.thumbnail}
                onProgress={handleVideoProgress}
                onComplete={handleVideoComplete}
                className="aspect-video w-full"
              />
            </div>
          </div>
          
          {/* Informações da aula */}
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="card overflow-hidden mb-8">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {lesson.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <List className="w-4 h-4" />
                    <span>Aula {currentIndex + 1} de {course.lessons.length}</span>
                  </div>
                </div>
                
                <div className="prose dark:prose-invert max-w-none mb-6">
                  <p>{lesson.description || 'Nesta aula você aprenderá conceitos fundamentais sobre ' + course.category + ' com exemplos práticos e exercícios para fixação do conteúdo.'}</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {!isCompleted && (
                    <Button onClick={handleMarkComplete} variant="secondary">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Marcar como concluída
                    </Button>
                  )}
                  <Button onClick={handleNextLesson} rightIcon={isLastLesson ? undefined : <ChevronLeft className="w-5 h-5 rotate-180" />}>
                    {isLastLesson ? 'Finalizar curso' : 'Próxima aula'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Material complementar */}
        {Array.isArray(lesson.materials) && lesson.materials.length > 0 && (
          <div className="card overflow-hidden mb-8">
            <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Material Complementar
              </h2>
            </div>
            <div className="p-6 pt-4 space-y-3">
              {(lesson.materials ?? []).map((material: { title: string; url: string; type: string }, index: number) => (
                <a
                  key={index}
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-interactive flex items-center gap-4 p-4 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`p-3 rounded-lg ${material.type === 'pdf' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                    {material.type === 'pdf' ? (
                      <Download className="w-6 h-6" />
                    ) : (
                      <ExternalLink className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {material.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {material.type === 'pdf' ? 'Documento PDF para download' : 'Link externo para recurso adicional'}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full uppercase font-medium">
                    {material.type}
                  </span>
                </a>
              ))}
            </div>
          </div>
            )}
            
            {/* Próximas aulas sugeridas */}
            <div className="card overflow-hidden mb-8">
              <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Próximas aulas
                </h2>
              </div>
              <div className="p-6 pt-4 space-y-3">
            {course.lessons.slice(currentIndex + 1, currentIndex + 3).map((nextLesson, idx) => (
              <button
                key={nextLesson.id}
                onClick={() => navigate(`/student/course/${courseId}/lesson/${nextLesson.id}`)}
                className="card-interactive w-full flex items-center gap-4 p-4 text-left hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                  {currentIndex + idx + 2}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {nextLesson.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {nextLesson.duration}
                  </p>
                </div>
                <Play className="w-5 h-5 text-gray-400" />
              </button>
            ))}
            
            {isLastLesson && (
              <div className="text-center py-4">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Você chegou ao final do curso!</p>
                <Button 
                  onClick={() => navigate(`/student/course/${courseId}`)}
                  variant="outline"
                >
                  Ver resumo do curso
                </Button>
              </div>
            )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
