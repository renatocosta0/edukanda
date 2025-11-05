import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with animated background */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,var(--color-primary-100),transparent_70%),radial-gradient(circle_at_top_right,var(--color-secondary-100),transparent_70%)] dark:bg-[radial-gradient(circle_at_bottom_left,var(--color-primary-900),transparent_70%),radial-gradient(circle_at_top_right,var(--color-secondary-900),transparent_70%)]">
          <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-[100px]"></div>
        </div>
        
        {/* Floating shapes */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary-200/30 dark:bg-primary-900/20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-secondary-200/20 dark:bg-secondary-900/10 animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full mb-6">
                <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                  🎓 Educação gratuita e de qualidade
                </span>
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                Aprenda sem limites com o{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  EduKanda
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
                A plataforma angolana de ensino online que democratiza o acesso à educação de qualidade.
                Cursos gratuitos, certificados reconhecidos e uma comunidade ativa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} className="w-full sm:w-auto shadow-lg">
                    Começar agora
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Já tenho conta
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block animate-slide-up">
              <div className="relative z-10 glass-effect rounded-2xl shadow-xl p-4 rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  alt="Estudantes aprendendo"
                  className="rounded-lg w-full h-auto shadow-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-primary-500/10 dark:bg-primary-500/5 rounded-2xl -rotate-2"></div>
              <div className="absolute -top-6 -right-6 w-full h-full bg-secondary-500/10 dark:bg-secondary-500/5 rounded-2xl rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl md:text-4xl">Nosso Impacto</h2>
            <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mt-4 mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Ajudando estudantes angolanos a alcançar seus objetivos educacionais</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="card p-8 text-center hover:scale-105 transition-transform duration-300">
              <p className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-3">5.000+</p>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Estudantes</p>
            </div>
            <div className="card p-8 text-center hover:scale-105 transition-transform duration-300">
              <p className="text-5xl font-bold text-secondary-600 dark:text-secondary-400 mb-3">50+</p>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Cursos</p>
            </div>
            <div className="card p-8 text-center hover:scale-105 transition-transform duration-300">
              <p className="text-5xl font-bold text-success-600 dark:text-success-400 mb-3">2.000+</p>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Certificados</p>
            </div>
            <div className="card p-8 text-center hover:scale-105 transition-transform duration-300">
              <p className="text-5xl font-bold text-secondary-600 dark:text-secondary-400 mb-3">20+</p>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Professores</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl md:text-4xl">Por que escolher o EduKanda?</h2>
            <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full mt-4 mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Uma plataforma completa para sua jornada de aprendizado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-interactive p-8 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                Cursos Gratuitos
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Acesso ilimitado a todos os cursos sem nenhum custo. Aprenda no seu ritmo, quando e onde quiser.
              </p>
            </div>

            <div className="card-interactive p-8 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                Certificados
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Certificados reconhecidos ao concluir os cursos para destacar suas conquistas no mercado de trabalho.
              </p>
            </div>

            <div className="card-interactive p-8 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                Comunidade
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Aprenda junto com milhares de estudantes angolanos em uma comunidade colaborativa e engajada.
              </p>
            </div>

            <div className="card-interactive p-8 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                Progresso
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Acompanhe seu desenvolvimento com ferramentas de análise de progresso e estatísticas personalizadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comece sua jornada em 3 passos simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Crie sua conta
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Cadastre-se gratuitamente em menos de 1 minuto
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Escolha seu curso
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Navegue por dezenas de cursos em diversas áreas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Comece a aprender
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Estude no seu ritmo e conquiste seus certificados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgMGw2MDAgNjAwSDBWMHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')] opacity-20"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4">
          <div className="glass-effect p-12 md:p-16 rounded-3xl text-center shadow-2xl border border-white/30 dark:border-white/10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Pronto para transformar seu futuro?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Junte-se a milhares de estudantes e comece sua jornada de aprendizado hoje mesmo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="success"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  Criar conta gratuita
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  Saiba mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">EduKanda</h3>
              <p className="text-sm">
                Democratizando o acesso à educação de qualidade em Angola
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">Sobre nós</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Termos de uso</a></li>
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 EduKanda. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
