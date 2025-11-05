import { useState, useEffect } from 'react';
import { Award, Download, Calendar, Clock } from 'lucide-react';
import { Button } from '../../components/ui';
import { api } from '../../services/api';
import { type Certificate } from '../../data/certificates';

export function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setIsLoading(true);
    try {
      const data = await api.getCertificates();
      setCertificates(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Meus Certificados
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Certificados dos cursos que você concluiu
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : certificates.length === 0 ? (
          <div className="card p-12 text-center">
            <Award className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum certificado ainda
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete cursos para ganhar certificados reconhecidos
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map(certificate => (
              <div key={certificate.id} className="card overflow-hidden">
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Certificado de Conclusão</p>
                      <p className="text-xs opacity-75">EduKanda</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {certificate.courseName}
                  </h3>
                  <p className="text-sm opacity-90">
                    Instrutor: {certificate.instructorName}
                  </p>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(certificate.completionDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{certificate.hours}h</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(certificate.certificateUrl, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Certificado
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
