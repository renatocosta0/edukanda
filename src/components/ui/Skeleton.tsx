interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

/**
 * Componente Skeleton para estados de carregamento
 * Melhora a UX mostrando placeholders animados enquanto o conteúdo carrega
 */
export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200 dark:bg-gray-700';
  
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    />
  );
}

/**
 * Skeleton para Card de Curso
 */
export function CourseCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Skeleton variant="rectangular" className="w-full h-48" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" className="w-20" />
        <Skeleton variant="text" className="w-full h-6" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" className="w-6 h-6" />
          <Skeleton variant="text" className="w-24" />
        </div>
        <div className="flex justify-between">
          <Skeleton variant="text" className="w-16" />
          <Skeleton variant="text" className="w-16" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton para Lista de Cursos
 */
export function CourseListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
