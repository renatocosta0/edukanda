import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Save, ArrowLeft, Plus, Trash2, GripVertical, Video, FileText, 
  Eye, Settings, Users as UsersIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { teacherApi } from '../../services/teacherApi';
import { api } from '../../services/api';
import { Button } from '../../components/ui';
import type { Lesson, CourseFormData, LessonFormData } from '../../types';

type TabType = 'details' | 'lessons' | 'students' | 'settings';

export function CourseEditor() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNewCourse = !courseId;

  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [loading, setLoading] = useState(!isNewCourse);
  const [saving, setSaving] = useState(false);
  
  // Course data
  const [courseData, setCourseData] = useState<CourseFormData>({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    thumbnail: '',
    tags: [],
    prerequisites: [],
    learningObjectives: [],
    status: 'draft',
  });

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [editingLesson, setEditingLesson] = useState<LessonFormData | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);

  useEffect(() => {
    if (!isNewCourse) {
      loadCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const course = await api.getCourseById(Number(courseId));
      if (!course) {
        throw new Error('Curso não encontrado');
      }
      setCourseData({
        title: course.title,
        description: course.description,
        category: course.category,
        level: course.level || 'beginner',
        price: course.price || 0,
        thumbnail: course.thumbnail || '',
        tags: course.tags || [],
        prerequisites: course.prerequisites || [],
        learningObjectives: course.learningObjectives || [],
        status: course.status || 'draft',
      });
      setLessons(course.lessons || []);
    } catch (error) {
      console.error('Erro ao carregar curso:', error);
      alert('Erro ao carregar curso');
      navigate('/teacher/courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCourse = async () => {
    if (!courseData.title || !courseData.description) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setSaving(true);
      if (isNewCourse) {
        const newCourse = await teacherApi.createCourse(user?.id || 0, courseData);
        navigate(`/teacher/courses/${newCourse.id}/edit`);
      } else {
        await teacherApi.updateCourse(Number(courseId), courseData);
        alert('Curso atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar curso:', error);
      alert('Erro ao salvar curso');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishCourse = async () => {
    if (lessons.length === 0) {
      alert('Adicione pelo menos uma aula antes de publicar');
      return;
    }

    try {
      setSaving(true);
      await teacherApi.publishCourse(Number(courseId));
      setCourseData({ ...courseData, status: 'published' });
      alert('Curso publicado com sucesso!');
    } catch (error) {
      console.error('Erro ao publicar curso:', error);
      alert('Erro ao publicar curso');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLesson = async () => {
    if (!editingLesson || !editingLesson.title || !editingLesson.videoUrl) {
      alert('Preencha todos os campos obrigatórios da aula');
      return;
    }

    try {
      if (editingLesson.id) {
        await teacherApi.updateLesson(editingLesson.id, editingLesson);
        setLessons(lessons.map(l => l.id === editingLesson.id ? { 
          ...l, 
          title: editingLesson.title,
          description: editingLesson.description,
          duration: editingLesson.duration.toString(),
          videoUrl: editingLesson.videoUrl,
          order: editingLesson.order,
          isFree: editingLesson.isFree
        } : l));
      } else {
        const newLesson = await teacherApi.createLesson(Number(courseId), editingLesson);
        setLessons([...lessons, newLesson]);
      }
      setShowLessonModal(false);
      setEditingLesson(null);
    } catch (error) {
      console.error('Erro ao salvar aula:', error);
      alert('Erro ao salvar aula');
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (!confirm('Tem certeza que deseja excluir esta aula?')) return;

    try {
      await teacherApi.deleteLesson(lessonId);
      setLessons(lessons.filter(l => l.id !== lessonId));
    } catch (error) {
      console.error('Erro ao excluir aula:', error);
      alert('Erro ao excluir aula');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Carregando curso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/teacher/courses">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isNewCourse ? 'Criar Novo Curso' : 'Editar Curso'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {courseData.status === 'published' ? 'Publicado' : 'Rascunho'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {!isNewCourse && courseData.status === 'draft' && (
              <Button
                variant="secondary"
                onClick={handlePublishCourse}
                disabled={saving}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Publicar
              </Button>
            )}
            <Button
              variant="primary"
              onClick={handleSaveCourse}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'details'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Detalhes
            </button>
            {!isNewCourse && (
              <>
                <button
                  onClick={() => setActiveTab('lessons')}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === 'lessons'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Video className="w-5 h-5 inline mr-2" />
                  Aulas ({lessons.length})
                </button>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === 'students'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <UsersIcon className="w-5 h-5 inline mr-2" />
                  Alunos
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === 'settings'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Settings className="w-5 h-5 inline mr-2" />
                  Configurações
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div className="card p-6">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="form-label">Título do Curso *</label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  className="input-field"
                  placeholder="Ex: React Avançado - Do Zero ao Profissional"
                />
              </div>

              {/* Description */}
              <div>
                <label className="form-label">Descrição *</label>
                <textarea
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  className="input-field"
                  rows={4}
                  placeholder="Descreva o que os alunos vão aprender neste curso..."
                />
              </div>

              {/* Category and Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Categoria *</label>
                  <select
                    value={courseData.category}
                    onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Programação">Programação</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Negócios">Negócios</option>
                    <option value="Fotografia">Fotografia</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Nível *</label>
                  <select
                    value={courseData.level}
                    onChange={(e) => setCourseData({ ...courseData, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                    className="input-field"
                  >
                    <option value="beginner">Iniciante</option>
                    <option value="intermediate">Intermediário</option>
                    <option value="advanced">Avançado</option>
                  </select>
                </div>
              </div>

              {/* Price and Thumbnail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Preço (Kz) *</label>
                  <input
                    type="number"
                    value={courseData.price}
                    onChange={(e) => setCourseData({ ...courseData, price: Number(e.target.value) })}
                    className="input-field"
                    min="0"
                    step="100"
                  />
                </div>

                <div>
                  <label className="form-label">Imagem do Curso (Thumbnail) *</label>
                  <input
                    type="url"
                    value={courseData.thumbnail}
                    onChange={(e) => setCourseData({ ...courseData, thumbnail: e.target.value })}
                    className="input-field"
                    placeholder="Cole a URL da imagem ou use uma sugestão abaixo"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Dica: Use <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Unsplash</a> ou <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Picsum</a> para imagens gratuitas
                  </p>
                  {courseData.thumbnail && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Preview:</p>
                      <img 
                        src={courseData.thumbnail} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Imagem+Inv%C3%A1lida';
                        }}
                      />
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setCourseData({ ...courseData, thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800' })}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      💻 Programação
                    </button>
                    <button
                      type="button"
                      onClick={() => setCourseData({ ...courseData, thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800' })}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      🎨 Design
                    </button>
                    <button
                      type="button"
                      onClick={() => setCourseData({ ...courseData, thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800' })}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      📊 Marketing
                    </button>
                    <button
                      type="button"
                      onClick={() => setCourseData({ ...courseData, thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800' })}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      💼 Negócios
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="form-label">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={courseData.tags?.join(', ')}
                  onChange={(e) => setCourseData({ 
                    ...courseData, 
                    tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                  })}
                  className="input-field"
                  placeholder="react, javascript, frontend"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && !isNewCourse && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Aulas do Curso
              </h2>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingLesson({
                    title: '',
                    description: '',
                    duration: 0,
                    videoUrl: '',
                    order: lessons.length + 1,
                    isFree: false,
                  });
                  setShowLessonModal(true);
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar Aula
              </Button>
            </div>

            {lessons.length === 0 ? (
              <div className="card p-12 text-center">
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Nenhuma aula criada ainda
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Comece adicionando a primeira aula do seu curso
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="card p-4 flex items-center gap-4">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {index + 1}. {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lesson.duration} {lesson.isFree && '• Aula gratuita'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setEditingLesson({
                            id: lesson.id,
                            title: lesson.title,
                            description: lesson.description || '',
                            duration: parseInt(lesson.duration) || 0,
                            videoUrl: lesson.videoUrl,
                            order: lesson.order || 0,
                            isFree: lesson.isFree || false,
                          });
                          setShowLessonModal(true);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="text-danger-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && !isNewCourse && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Alunos Matriculados
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Funcionalidade em desenvolvimento...
            </p>
          </div>
        )}

        {activeTab === 'settings' && !isNewCourse && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Configurações do Curso
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Funcionalidade em desenvolvimento...
            </p>
          </div>
        )}

        {/* Lesson Modal */}
        {showLessonModal && editingLesson && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {editingLesson.id ? 'Editar Aula' : 'Nova Aula'}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Título da Aula *</label>
                    <input
                      type="text"
                      value={editingLesson.title}
                      onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="form-label">Descrição</label>
                    <textarea
                      value={editingLesson.description}
                      onChange={(e) => setEditingLesson({ ...editingLesson, description: e.target.value })}
                      className="input-field"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Duração (minutos) *</label>
                      <input
                        type="number"
                        value={editingLesson.duration}
                        onChange={(e) => setEditingLesson({ ...editingLesson, duration: Number(e.target.value) })}
                        className="input-field"
                        min="0"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-8">
                      <input
                        type="checkbox"
                        id="isFree"
                        checked={editingLesson.isFree}
                        onChange={(e) => setEditingLesson({ ...editingLesson, isFree: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label htmlFor="isFree" className="text-sm text-gray-700 dark:text-gray-300">
                        Aula gratuita
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">URL do Vídeo *</label>
                    <input
                      type="url"
                      value={editingLesson.videoUrl}
                      onChange={(e) => setEditingLesson({ ...editingLesson, videoUrl: e.target.value })}
                      className="input-field"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="primary"
                    onClick={handleSaveLesson}
                    className="flex-1"
                  >
                    Salvar Aula
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowLessonModal(false);
                      setEditingLesson(null);
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
