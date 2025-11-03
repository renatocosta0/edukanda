import { BookOpen, Users, Award, Target, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-6">
            <span className="text-white font-bold text-5xl">E</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre o EduKanda
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Democratizando o acesso à educação de qualidade em Angola
          </p>
        </div>

        {/* Missão */}
        <div className="card p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nossa Missão
            </h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            O EduKanda nasceu com o objetivo de tornar a educação de qualidade acessível a todos os 
            estudantes angolanos. Acreditamos que o conhecimento é a chave para o desenvolvimento 
            individual e coletivo, e por isso oferecemos cursos gratuitos nas mais diversas áreas 
            do conhecimento.
          </p>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Educação Gratuita
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Todos os nossos cursos são 100% gratuitos, sem taxas ocultas ou mensalidades.
            </p>
          </div>

          <div className="card p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Comunidade Ativa
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Aprenda junto com milhares de estudantes angolanos em uma comunidade colaborativa.
            </p>
          </div>

          <div className="card p-6">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Certificados Reconhecidos
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Receba certificados ao concluir os cursos e destaque-se no mercado de trabalho.
            </p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="card p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Nosso Impacto
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">5.000+</p>
              <p className="text-gray-600 dark:text-gray-400">Estudantes</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary-600 mb-2">50+</p>
              <p className="text-gray-600 dark:text-gray-400">Cursos</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 mb-2">2.000+</p>
              <p className="text-gray-600 dark:text-gray-400">Certificados</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600 mb-2">20+</p>
              <p className="text-gray-600 dark:text-gray-400">Instrutores</p>
            </div>
          </div>
        </div>

        {/* Por que escolher */}
        <div className="card p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Por que escolher o EduKanda?
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Aprenda no seu ritmo
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Acesse os cursos quando e onde quiser, sem horários fixos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Conteúdo de qualidade
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Cursos desenvolvidos por professores experientes e qualificados.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Suporte da comunidade
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tire dúvidas e interaja com outros estudantes através dos comentários.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Junte-se a milhares de estudantes e comece sua jornada de aprendizado hoje mesmo.
          </p>
          <Link to="/home">
            <Button size="lg">
              Explorar Cursos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
