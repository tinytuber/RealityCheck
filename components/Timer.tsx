import React, { useEffect, useState } from 'react';

interface TimerProps {
  start: number; // timestamp when the game started
  onTimeUp: () => void; // callback if you want to enforce max time
}

const Timer: React.FC<TimerProps> = ({ start, onTimeUp }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const secs = Math.floor((now - start) / 1000);
      setElapsed(secs);
      // Example: enforce a 300s max game duration
      if (secs >= 300) {
        onTimeUp();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [start, onTimeUp]);

  return (
    <div className="flex items-center space-x-2">
      <svg
        className="h-6 w-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="font-mono text-lg text-gray-800">{elapsed}s</span>
    </div>
  );
};

export default Timer;
