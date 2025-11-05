import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Campos tocados para validação
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  // Validação
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isNameValid = name.trim().length >= 3;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;
  const doPasswordsMatch = password === confirmPassword;
  
  // Mensagens de erro
  const nameError = nameTouched && !isNameValid ? 
    'O nome deve ter pelo menos 3 caracteres' : '';
  const emailError = emailTouched && !isEmailValid ? 
    'Por favor, insira um email válido' : '';
  const passwordError = passwordTouched && !isPasswordValid ? 
    'A senha deve ter pelo menos 6 caracteres' : '';
  const confirmPasswordError = confirmPasswordTouched && !doPasswordsMatch ? 
    'As senhas não coincidem' : '';

  const handleNameBlur = () => setNameTouched(true);
  const handleEmailBlur = () => setEmailTouched(true);
  const handlePasswordBlur = () => setPasswordTouched(true);
  const handleConfirmPasswordBlur = () => setConfirmPasswordTouched(true);
  
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Verificar força da senha
  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return Math.min(strength + 1, 4);
  };
  
  const passwordStrength = getPasswordStrength();
  const passwordStrengthText = [
    '',
    'Muito fraca',
    'Fraca',
    'Média',
    'Forte'
  ];
  
  const passwordStrengthColor = [
    '',
    'bg-danger-500',
    'bg-warning-500',
    'bg-warning-400',
    'bg-success-500'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validação final antes de enviar
    if (!isNameValid) {
      setError('O nome deve ter pelo menos 3 caracteres');
      setNameTouched(true);
      return;
    }
    
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

    if (!doPasswordsMatch) {
      setError('As senhas não coincidem');
      setConfirmPasswordTouched(true);
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password });
      setSuccess('Conta criada com sucesso!');
      
      // Pequeno delay para mostrar mensagem de sucesso
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta. Verifique seus dados e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="text-white font-bold text-4xl">E</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-display">
            Criar conta
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comece sua jornada de aprendizado
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
                Nome completo
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${nameError ? 'text-danger-500' : nameTouched && isNameValid ? 'text-success-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleNameBlur}
                  className={`input-field pl-10 ${nameError ? 'input-field-error border-danger-500 focus:ring-danger-500' : nameTouched && isNameValid ? 'border-success-500 focus:ring-success-500' : ''}`}
                  placeholder="Seu nome completo"
                  required
                  autoComplete="name"
                />
              </div>
              {nameError && <p className="form-error">{nameError}</p>}
            </div>

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
              <label className="form-label">
                Senha
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${passwordError ? 'text-danger-500' : passwordTouched && isPasswordValid ? 'text-success-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  className={`input-field pl-10 pr-10 ${passwordError ? 'input-field-error border-danger-500 focus:ring-danger-500' : passwordTouched && isPasswordValid ? 'border-success-500 focus:ring-success-500' : ''}`}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <button 
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Indicador de força da senha */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex space-x-1 w-full">
                      {[1, 2, 3, 4].map((index) => (
                        <div 
                          key={index}
                          className={`h-1.5 flex-1 rounded-full ${index <= passwordStrength ? passwordStrengthColor[passwordStrength] : 'bg-gray-200 dark:bg-gray-700'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs ml-2 min-w-20 text-right">
                      {passwordStrength > 0 && (
                        <span className={`
                          ${passwordStrength === 1 ? 'text-danger-600 dark:text-danger-400' : ''}
                          ${passwordStrength === 2 ? 'text-warning-600 dark:text-warning-400' : ''}
                          ${passwordStrength === 3 ? 'text-warning-600 dark:text-warning-400' : ''}
                          ${passwordStrength === 4 ? 'text-success-600 dark:text-success-400' : ''}
                        `}>
                          {passwordStrengthText[passwordStrength]}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}
              
              {passwordError && <p className="form-error">{passwordError}</p>}
            </div>

            <div>
              <label className="form-label">
                Confirmar senha
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${confirmPasswordError ? 'text-danger-500' : confirmPasswordTouched && doPasswordsMatch ? 'text-success-500' : 'text-gray-400'}`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={handleConfirmPasswordBlur}
                  className={`input-field pl-10 pr-10 ${confirmPasswordError ? 'input-field-error border-danger-500 focus:ring-danger-500' : confirmPasswordTouched && doPasswordsMatch ? 'border-success-500 focus:ring-success-500' : ''}`}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <button 
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPasswordError && <p className="form-error">{confirmPasswordError}</p>}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                size="lg"
                isLoading={isLoading}
                disabled={isLoading || !isNameValid || !isEmailValid || !isPasswordValid || !doPasswordsMatch}
              >
                Criar conta
              </Button>
            </div>
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
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 hover:underline"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
