import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api, type LoginCredentials, type RegisterData } from '../services/api';
import { type User, type UserRole } from '../data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  hasRole: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'edukanda_auth';
const USER_STORAGE_KEY = 'edukanda_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recupera dados do usuário do localStorage na inicialização
    const loadUserFromStorage = () => {
      try {
        const token = localStorage.getItem(AUTH_STORAGE_KEY);
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);
        
        if (token && savedUser) {
          const userData = JSON.parse(savedUser) as User;
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        // Limpa dados corrompidos
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.login(credentials);
      
      // Salva token e dados do usuário
      localStorage.setItem(AUTH_STORAGE_KEY, response.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
      
      setUser(response.user);
    } catch (error) {
      // Limpa qualquer dado anterior em caso de erro
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await api.register(data);
      
      // Salva token e dados do usuário
      localStorage.setItem(AUTH_STORAGE_KEY, response.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
      
      setUser(response.user);
    } catch (error) {
      // Limpa qualquer dado anterior em caso de erro
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      throw error;
    }
  };

  const logout = () => {
    // Remove dados do localStorage
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    
    // Limpa estado
    setUser(null);
  };

  const hasRole = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        role: user?.role || null,
        login,
        register,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
