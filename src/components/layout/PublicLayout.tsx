import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface PublicLayoutProps {
  children: ReactNode;
}

/**
 * Layout para páginas públicas (login, registro, onboarding)
 * Navbar simples apenas com logo
 */
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navbar simples */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                EduKanda
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
