import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Star, Users, DollarSign, Check, X, Eye } from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import type { AdminCourse, CourseFilters } from '../../types/admin';
import { Button, Modal } from '../../components/ui';

export function Courses() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CourseFilters>({});
  const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<'approve' | 'reject' | 'delete'>('approve');

  useEffect(() => {
    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getCourses(filters);
      setCourses(data);
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedCourse) return;

    try {
      switch (modalAction) {
        case 'approve':
          await adminApi.approveCourse(selectedCourse.id);
          break;
        case 'reject':
          await adminApi.rejectCourse(selectedCourse.id, 'Conteúdo inadequado');
          break;
        case 'delete':
          await adminApi.deleteCourse(selectedCourse.id);
          break;
      }
      setShowModal(false);
      setSelectedCourse(null);
      loadCourses();
    } catch (error) {
      console.error('Erro ao executar ação:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    const labels = {
      published: 'Publicado',
      draft: 'Rascunho',
      pending: 'Pendente',
      rejected: 'Rejeitado',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Gerenciamento de Cursos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Modere e gerencie todos os cursos da plataforma
          </p>
        </div>

        {/* Filtros */}
        <div className="card p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={filters.search || ''}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: (e.target.value || undefined) as 'published' | 'draft' | 'pending' | 'rejected' | undefined })}
                className="input-field"
              >
                <option value="">Todos os status</option>
                <option value="published">Publicados</option>
                <option value="draft">Rascunhos</option>
                <option value="pending">Pendentes</option>
                <option value="rejected">Rejeitados</option>
              </select>
            </div>
            <div>
              <select
                value={filters.category || ''}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="input-field"
              >
                <option value="">Todas as categorias</option>
                <option value="Programação">Programação</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Negócios">Negócios</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total de Cursos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Publicados</p>
            <p className="text-2xl font-bold text-green-600">{courses.filter(c => c.status === 'published').length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pendentes</p>
            <p className="text-2xl font-bold text-yellow-600">{courses.filter(c => c.status === 'pending').length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Receita Total</p>
            <p className="text-2xl font-bold text-purple-600">
              {courses.reduce((sum, c) => sum + c.revenue, 0).toLocaleString('pt-BR')} Kz
            </p>
          </div>
        </div>

        {/* Grid de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">Nenhum curso encontrado</p>
            </div>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="card overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {course.title}
                    </h3>
                    {getStatusBadge(course.status)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {course.instructor}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.studentsCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {course.rating.toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {course.revenue.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {course.status === 'pending' && (
                      <>
                        <Button
                          onClick={() => {
                            setSelectedCourse(course);
                            setModalAction('approve');
                            setShowModal(true);
                          }}
                          variant="primary"
                          className="flex-1 text-sm py-2"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedCourse(course);
                            setModalAction('reject');
                            setShowModal(true);
                          }}
                          variant="secondary"
                          className="flex-1 text-sm py-2"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Rejeitar
                        </Button>
                      </>
                    )}
                    {course.status === 'published' && (
                      <Link to={`/student/course/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full text-sm py-2">
                          <Eye className="w-4 h-4 mr-1" />
                          Visualizar
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal de Confirmação */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={
            modalAction === 'approve' ? 'Aprovar Curso' :
            modalAction === 'reject' ? 'Rejeitar Curso' :
            'Excluir Curso'
          }
        >
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {modalAction === 'approve' && `Aprovar o curso "${selectedCourse?.title}"?`}
            {modalAction === 'reject' && `Rejeitar o curso "${selectedCourse?.title}"?`}
            {modalAction === 'delete' && `Excluir permanentemente o curso "${selectedCourse?.title}"?`}
          </p>
          <div className="flex gap-3">
            <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleAction} variant="primary" className="flex-1">
              Confirmar
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
