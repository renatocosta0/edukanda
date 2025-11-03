import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { api } from '../services/api';
import { rankingUsers } from '../data/user';
import { useAuth } from '../context/AuthContext';

export function Ranking() {
  const [ranking, setRanking] = useState(rankingUsers);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = async () => {
    setIsLoading(true);
    try {
      const data = await api.getRanking();
      setRanking(data);
    } finally {
      setIsLoading(false);
    }
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Ranking de Estudantes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Veja sua posição e compete com outros estudantes
          </p>
        </div>

        {/* Top 3 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {ranking.slice(0, 3).map((student, index) => {
            const positions = [1, 0, 2]; // Ordem: 2º, 1º, 3º
            const actualStudent = ranking[positions[index]];
            const heights = ['h-32', 'h-40', 'h-28'];
            
            return (
              <div key={actualStudent.id} className="flex flex-col items-center">
                <div className={`card p-4 w-full ${heights[index]} flex flex-col items-center justify-end mb-3`}>
                  <div className="relative mb-2">
                    <img
                      src={actualStudent.avatar}
                      alt={actualStudent.name}
                      className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800"
                    />
                    <div className="absolute -bottom-2 -right-2">
                      {getMedalIcon(actualStudent.rank)}
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white text-center text-sm">
                    {actualStudent.name}
                  </p>
                  <p className="text-primary-600 font-bold text-lg">
                    {actualStudent.points}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">pontos</p>
                </div>
                <div className={`text-2xl font-bold ${
                  actualStudent.rank === 1
                    ? 'text-yellow-500'
                    : actualStudent.rank === 2
                    ? 'text-gray-400'
                    : 'text-orange-600'
                }`}>
                  #{actualStudent.rank}
                </div>
              </div>
            );
          })}
        </div>

        {/* Posição do usuário */}
        {user && (
          <div className="card p-4 mb-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="text-2xl font-bold text-primary-600 w-12 text-center">
                  #{user.rank}
                </div>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {user.name} (Você)
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>{user.points} pontos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista completa */}
        <div className="card">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Classificação Geral
            </h2>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {ranking.map(student => (
                <div
                  key={student.id}
                  className={`p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    student.id === user?.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                  }`}
                >
                  <div className="w-12 text-center">
                    {student.rank <= 3 ? (
                      getMedalIcon(student.rank)
                    ) : (
                      <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
                        #{student.rank}
                      </span>
                    )}
                  </div>
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {student.name}
                      {student.id === user?.id && (
                        <span className="ml-2 text-sm text-primary-600">(Você)</span>
                      )}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Award className="w-4 h-4" />
                      <span>{student.points} pontos</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
