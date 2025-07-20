import { useState, useEffect } from 'react';
import ImageCard, { ImageItem } from '../components/ImageCard';
import imagesData from '../data/images.json';
import ResultScreen from '../components/ResultScreen';

const TOTAL_IMAGES = 20;
const shuffle = (arr: ImageItem[]) => [...arr].sort(() => Math.random() - 0.5);

export default function PlayPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [totalTime, setTotalTime] = useState<number>(0);

  useEffect(() => {
    const selected = shuffle(imagesData).slice(0, TOTAL_IMAGES);
    setImages(selected);
    setStartTime(Date.now());
  }, []);

  const handleGuess = (guess: 'real' | 'ai') => {
    const current = images[currentIndex];
    const correct = current.label === guess;
    if (correct) {
      setScore(prev => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 >= images.length) {
        const endTime = Date.now();
        setTotalTime(Math.floor((endTime - startTime) / 1000));
        setShowResult(true);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 500);
  };

  if (!images.length) return <div>Loading...</div>;

  if (showResult) {
    return (
      <ResultScreen
        score={score}
        total={images.length}
        //totalTime={totalTime}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="mb-4">
        
        <ImageCard image={images[currentIndex]} />
      </div>
      
      <div className="space-x-4 mb-4">
        <button
          onClick={() => handleGuess('Real')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Real
        </button>
        <button
          onClick={() => handleGuess('AI')}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          AI Generated
        </button>
      </div>
      <div className="text-sm">
        Image {currentIndex + 1} of {images.length}
      </div>
      {feedback && (
        <div className={`mb-4 text-lg ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>  
          {feedback === 'correct' ? 'Correct!' : 'Wrong!'}
        </div>
      )}
    </div>
  );
}
