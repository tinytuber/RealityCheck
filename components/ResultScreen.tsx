import React from 'react';

interface ResultScreenProps {
  score: number;
  total: number;
  totalTime: number;
  onRetry: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, totalTime, onRetry }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Game Over!</h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="text-2xl mb-4">Score: <span className="font-mono">{score} / {total}</span></p>
        <p className="text-lg mb-6">Time: <span className="font-mono">{totalTime}s</span></p>
        <button
          onClick={onRetry}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
