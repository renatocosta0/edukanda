import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Validação
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;
  
  const emailError = emailTouched && !isEmailValid ? 
    'Por favor, insira um email válido' : '';
  const passwordError = passwordTouched && !isPasswordValid ? 
    'A senha deve ter pelo menos 6 caracteres' : '';

  // Verificar se há credenciais salvas
  useEffect(() => {
    const savedEmail = localStorage.getItem('edukanda_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validação final antes de enviar
    if (!isEmailValid) {
      setError('Por favor, insira um email válido');
      setEmailTouched(true);
      return;
    }
    
    if (!isPasswordValid) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setPasswordTouched(true);
      return;
    }
    
    setIsLoading(true);

    try {
      await login({ email, password });
      
      // Salvar email se "lembrar-me" estiver marcado
      if (rememberMe) {
        localStorage.setItem('edukanda_email', email);
      } else {
        localStorage.removeItem('edukanda_email');
      }
      
      setSuccess('Login realizado com sucesso!');
      
      // Pequeno delay para mostrar mensagem de sucesso
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 800);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Credenciais inválidas. Por favor, verifique seu email e senha.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEmailBlur = () => {
    setEmailTouched(true);
  };
  
  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="text-white font-bold text-4xl">E</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-display">
            Bem-vindo ao EduKanda
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Entre para continuar aprendendo
          </p>
        </div>

        <div className="card p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-danger-50 dark:bg-danger-900/30 border border-danger-200 dark:border-danger-700 rounded-lg flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-danger-500 flex-shrink-0" />
                <p className="text-sm text-danger-600 dark:text-danger-300">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-3 bg-success-50 dark:bg-success-900/30 border border-success-200 dark:border-success-700 rounded-lg flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-success-500 flex-shrink-0" />
                <p className="text-sm text-success-600 dark:text-success-300">{success}</p>
              </div>
            )}

            <div>
              <label className="form-label">
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${emailError ? 'text-danger-500' : emailTouched && isEmailValid ? 'text-success-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  className={`input-field pl-10 ${emailError ? 'input-field-error border-danger-500 focus:ring-danger-500' : emailTouched && isEmailValid ? 'border-success-500 focus:ring-success-500' : ''}`}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
              </div>
              {emailError && <p className="form-error">{emailError}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="form-label">
                  Senha
                </label>
                <Link to="/forgot-password" className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${passwordError ? 'text-danger-500' : passwordTouched && isPasswordValid ? 'text-success-500' : 'text-gray-400'}`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  className={`input-field pl-10 ${passwordError ? 'input-field-error border-danger-500 focus:ring-danger-500' : passwordTouched && isPasswordValid ? 'border-success-500 focus:ring-success-500' : ''}`}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete="current-password"
                />
              </div>
              {passwordError && <p className="form-error">{passwordError}</p>}
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Lembrar meu email
              </label>
            </div>

            <Button
              type="submit"
              className="w-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              size="lg"
              isLoading={isLoading}
              disabled={isLoading || (emailTouched && !isEmailValid) || (passwordTouched && !isPasswordValid)}
            >
              Entrar
            </Button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">ou</span>
              </div>
            </div>
            
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              Não tem uma conta?{' '}
              <Link
                to="/register"
                className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 hover:underline"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
