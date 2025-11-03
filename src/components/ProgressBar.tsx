interface ProgressBarProps {
  progress: number;
  height?: string;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ 
  progress, 
  height = 'h-2', 
  showLabel = false,
  className = '' 
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-gray-700 dark:text-gray-300">Progresso</span>
          <span className="font-semibold text-primary-600">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${height}`}>
        <div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
