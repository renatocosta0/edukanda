import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, Users, Star, Play, MessageCircle, ChevronLeft, Heart, BookOpen,
  Award, CheckCircle, Share2, Download, BookmarkPlus, Info, BarChart3
} from 'lucide-react';
import { Button, ProgressBar } from '../../components/ui';
import { api } from '../../services/api';
import type { Lesson, Comment } from '../../types';
import { useCourse } from '../../hooks/useCourse';
import { useAuth } from '../../context/AuthContext';

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { course, loading } = useCourse(id ? Number(id) : undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'comments'>('overview');
  const [newComment, setNewComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    if (!id) return;
    // sincroniza favorito com curso carregado
    if (course) setIsFavorite(!!course.isFavorite);
  }, [course, id]);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    api.getComments(Number(id)).then((data) => {
      if (!mounted) return;
      setComments(data);
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!course) return;
    await api.toggleFavorite(course.id);
    setIsFavorite(!isFavorite);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !newComment.trim()) return;
    if (!user) return;
    const comment = await api.addComment(user.id, course.id, newComment);
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleStartLesson = (lesson: Lesson) => {
    navigate(`/student/course/${id}/lesson/${lesson.id}`);
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // Poderia adicionar um toast/notificação aqui
    setShowShareOptions(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">Carregando curso...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="card p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Curso não encontrado</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">O curso que você está procurando não existe ou foi removido.</p>
          <Button onClick={() => navigate('/student/courses')} size="lg">
            Explorar outros cursos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navegação e ações */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Compartilhar curso"
              >
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10 animate-fade-in">
                  <button 
                    onClick={copyToClipboard}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2"
                  >
                    <span className="text-sm">Copiar link</span>
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={handleToggleFavorite}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
              />
            </button>
          </div>
        </div>

        {/* Header do curso - Hero section */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
          {/* Imagem de fundo com overlay */}
          <div className="relative h-72 md:h-96 lg:h-[28rem]">
            <img
              src={course.thumbnail || 'https://via.placeholder.com/1200x600?text=Curso'}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
            
            {/* Badge de categoria */}
            <div className="absolute top-6 left-6">
              <span className="badge badge-primary px-3 py-1.5 text-sm font-medium">
                {course.category}
              </span>
            </div>
            
            {/* Conteúdo sobreposto */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 text-white">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                  {course.title}
                </h1>
                
                <p className="text-lg text-white/90 mb-6 line-clamp-2 md:line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating} classificação</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">{course.studentsCount} alunos</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{course.duration} de conteúdo</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-medium">{course.lessonsCount} aulas</span>
                  </div>
                </div>
                
                {/* Botão de ação principal */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => handleStartLesson(course.lessons[0])}
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    rightIcon={<Play className="w-5 h-5" />}
                  >
                    {(course.progress ?? 0) > 0 ? 'Continuar curso' : 'Iniciar curso'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                    rightIcon={<BookmarkPlus className="w-5 h-5" />}
                  >
                    Salvar para depois
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Informações do instrutor e progresso */}
          <div className="p-6 md:p-8 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Coluna 1: Instrutor */}
              <div className="flex items-start gap-4">
                <img
                  src={course.instructorAvatar || 'https://via.placeholder.com/80?text=Instrutor'}
                  alt={course.instructor}
                  className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-700 shadow-md"
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Instrutor</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                    {course.instructor}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Professor especialista em {course.category}
                  </p>
                </div>
              </div>
              
              {/* Coluna 2: Progresso */}
              <div className="md:col-span-2">
                {(course.progress ?? 0) > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900 dark:text-white">Seu progresso</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {course.progress}% concluído
                      </p>
                    </div>
                    <ProgressBar 
                      progress={course.progress ?? 0} 
                      showLabel={false} 
                      height="h-2.5"
                      className="bg-gray-100 dark:bg-gray-700"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-success-500" />
                        <span>{course.completedLessons || Math.floor((course.lessonsCount || 10) * (course.progress || 0) / 100)} de {course.lessonsCount} aulas concluídas</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Última atividade: {course.lastActivity || 'há 2 dias'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-4">
                    <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-3">
                      <BarChart3 className="w-8 h-8 text-primary-500" />
                    </div>
                    <p className="text-center text-gray-700 dark:text-gray-300 mb-2">Você ainda não iniciou este curso</p>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">Comece agora para acompanhar seu progresso</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Info className="w-5 h-5 inline mr-2" />
                Visão Geral
              </button>
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
            {activeTab === 'overview' ? (
              <div className="space-y-8">
                {/* Descrição detalhada */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Sobre este curso</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300">
                      {course.description}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-4">
                      Este curso foi desenvolvido para ajudar estudantes a dominarem os conceitos fundamentais de {course.category}. 
                      Você aprenderá através de aulas teóricas e práticas, com exercícios e projetos reais.
                    </p>
                  </div>
                </div>
                
                {/* O que você vai aprender */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">O que você vai aprender</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Fundamentos teóricos de ' + course.category,
                      'Aplicações práticas em projetos reais',
                      'Técnicas avançadas de resolução de problemas',
                      'Melhores práticas da indústria',
                      'Ferramentas e tecnologias modernas',
                      'Preparação para o mercado de trabalho'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-1 bg-primary-100 dark:bg-primary-900/50 rounded-full">
                          <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Requisitos */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Requisitos</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Conhecimentos básicos em informática</li>
                    <li>Acesso a um computador com internet</li>
                    <li>Disposição para aprender</li>
                  </ul>
                </div>
                
                {/* Certificado */}
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl border border-primary-100 dark:border-primary-800">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-800 rounded-lg">
                      <Award className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Certificado de Conclusão</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Ao concluir este curso, você receberá um certificado que pode ser compartilhado em seu perfil profissional.
                      </p>
                      <Button variant="outline" rightIcon={<Download className="w-5 h-5" />}>
                        Ver exemplo de certificado
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'lessons' ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Conteúdo do curso</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {course.lessonsCount} aulas • {course.duration} total
                  </div>
                </div>
                
                <div className="space-y-4">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="card-interactive">
                      <button
                        onClick={() => handleStartLesson(lesson)}
                        className="w-full flex items-center gap-4 p-4 text-left"
                      >
                        <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          lesson.completed
                            ? 'bg-success-100 dark:bg-success-900/50 text-success-600 dark:text-success-400'
                            : 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                        }`}>
                          {lesson.completed ? <CheckCircle className="w-6 h-6" /> : <span className="text-lg font-semibold">{index + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {lesson.duration}
                            </p>
                            {lesson.type && (
                              <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                                {lesson.type}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0 ml-2">
                          <div className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <Play className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Discussão do curso</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {comments.length} comentário{comments.length !== 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="card mb-8">
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Deixe seu comentário</h4>
                    <form onSubmit={handleAddComment}>
                      <div className="flex gap-4">
                        <img
                          src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
                          alt="Seu avatar"
                          className="w-10 h-10 rounded-full shrink-0"
                        />
                        <div className="flex-1">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="O que você achou deste curso?"
                            className="input-field resize-none w-full"
                            rows={3}
                            required
                          />
                          <div className="flex justify-end mt-3">
                            <Button 
                              type="submit" 
                              disabled={!newComment.trim()}
                              size="sm"
                            >
                              Publicar comentário
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {comments.length > 0 ? (
                  <div className="space-y-6">
                    {comments.map(comment => (
                      <div key={comment.id} className="card-interactive p-5">
                        <div className="flex gap-4">
                          <img
                            src={comment.userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.userName)}&background=random`}
                            alt={comment.userName}
                            className="w-12 h-12 rounded-full shrink-0 border-2 border-white dark:border-gray-700 shadow-sm"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {comment.userName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(comment.timestamp).toLocaleDateString('pt-BR', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                              
                              {user?.id === comment.userId && (
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                  <span className="sr-only">Opções</span>
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                  </svg>
                                </button>
                              )}
                            </div>
                            
                            <div className="text-gray-700 dark:text-gray-300 mb-3">
                              {comment.content}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                <span>{comment.likes}</span>
                              </button>
                              
                              <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                                <MessageCircle className="w-5 h-5" />
                                <span>Responder</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nenhum comentário ainda</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Seja o primeiro a comentar sobre este curso</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
