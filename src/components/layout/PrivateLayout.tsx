import { type ReactNode } from 'react';
import { Navbar } from './Navbar';

interface PrivateLayoutProps {
  children: ReactNode;
}

/**
 * Layout para páginas privadas (home, cursos, perfil, etc)
 * Inclui Navbar completa com navegação
 */
export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Conteúdo com padding para compensar navbar fixa */}
      <main className="pt-20 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}
