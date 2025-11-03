import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, BookOpen, Rocket, Award } from 'lucide-react';
import { Button } from '../components/Button';

const slides = [
  {
    icon: BookOpen,
    title: 'Aprenda no seu ritmo',
    description: 'Acesse cursos gratuitos de qualidade, disponíveis 24/7 para você estudar quando e onde quiser.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Rocket,
    title: 'Impulsione sua carreira',
    description: 'Desenvolva habilidades essenciais para o mercado de trabalho com professores experientes.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Award,
    title: 'Conquiste certificados',
    description: 'Receba certificados reconhecidos ao concluir os cursos e destaque-se no mercado.',
    color: 'from-orange-500 to-orange-600',
  },
];

export function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className={`inline-flex p-6 rounded-full bg-gradient-to-br ${slide.color} mb-6 animate-bounce-slow`}>
            <Icon className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {slide.title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {slide.description}
          </p>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-primary-600'
                  : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Botões */}
        <div className="space-y-3">
          <Button
            onClick={handleNext}
            className="w-full"
            size="lg"
          >
            {currentSlide < slides.length - 1 ? (
              <span className="flex items-center justify-center gap-2">
                Próximo
                <ChevronRight className="w-5 h-5" />
              </span>
            ) : (
              'Começar agora'
            )}
          </Button>
          
          {currentSlide < slides.length - 1 && (
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="w-full"
              size="lg"
            >
              Pular
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
