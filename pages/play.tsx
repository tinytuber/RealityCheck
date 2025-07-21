import { useState, useEffect, useCallback } from 'react';
import ImageCard from '../components/ImageCard';
import { ImageItem, ImageList } from '../data/image-data';
import rawImageData from '../data/images.json';
import ResultScreen from '../components/ResultScreen';

const TOTAL_IMAGES = 20;
const shuffle = (arr: ImageItem[]): ImageItem[] => [...arr].sort(() => Math.random() - 0.5);

export default function PlayPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [totalTime, setTotalTime] = useState<number>(0);
  // NEW STATE: Tracks if the current image is loading
  const [isImageLoading, setIsImageLoading] = useState(true); 

  const initializeGame = useCallback(() => {
    const allImages: ImageList = rawImageData as ImageList;

    if (!Array.isArray(allImages) || allImages.length === 0) {
      console.error("No images loaded from images.json or it's not an array.");
      // Optionally show a user-friendly error message here
      return; 
    }

    const selected = shuffle(allImages).slice(0, Math.min(TOTAL_IMAGES, allImages.length));
    
    if (selected.length === 0) {
      console.error("No images selected after shuffle and slice. Check TOTAL_IMAGES or your data.");
      // Optionally show a user-friendly error message here
      return;
    }

    setImages(selected);
    setCurrentIndex(0); 
    setScore(0);        
    setShowResult(false); 
    setFeedback(null);   
    setStartTime(Date.now()); 
    setTotalTime(0);     
    setIsImageLoading(true); // Reset to true when starting a new game/loading first image
  }, []); 

  useEffect(() => {
    initializeGame(); 
  }, [initializeGame]);

  // NEW useEffect: Reset image loading state when currentIndex changes
  useEffect(() => {
    if (images.length > 0) {
      setIsImageLoading(true); // Set to true when a new image is about to be displayed
    }
  }, [currentIndex, images.length]); // Re-run when current index or image array length changes


  const handleGuess = (guess: 'Real' | 'AI') => {
    // Prevent guess if image is still loading
    if (isImageLoading) {
        return; 
    }

    if (!images[currentIndex]) {
      console.error("Attempted to guess on an undefined image. CurrentIndex:", currentIndex, "Images array:", images);
      return;
    }
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

  // Callback for ImageCard when image loads
  const handleImageLoaded = useCallback(() => {
    setIsImageLoading(false);
  }, []);

  // Callback for ImageCard when image fails to load
  const handleImageError = useCallback(() => {
    console.error("Failed to load image at URL:", images[currentIndex]?.url);
    // You might want to skip this image or show an error
    setIsImageLoading(false); // Still allow interaction even if image fails, or handle differently
    // Optionally: Automatically advance to the next image or mark as 'skipped'
    // setCurrentIndex(prev => prev + 1);
  }, [currentIndex, images]);


  // Initial loading state for the whole game
  if (images.length === 0) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-xl text-gray-700">Loading images, please wait...</p>
        </div>
    );
  }

  // Fallback if current image becomes undefined (should be caught by checks in useEffect and handleGuess)
  const currentImage = images[currentIndex];
  if (!currentImage) {
      console.error("Current image is undefined at render. This should not happen if previous checks are working.");
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <p className="text-xl text-red-500">Error: Image data corrupted. Please refresh.</p>
          </div>
      );
  }


  if (showResult) {
    return (
      <ResultScreen
        score={score}
        total={images.length}
        totalTime={totalTime}
        onRetry={initializeGame} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="mb-4">
        {/* Pass the loading callbacks to ImageCard */}
        <ImageCard 
          image={currentImage} 
          onImageLoad={handleImageLoaded}
          onImageError={handleImageError}
        />
        {/* Optional: Add a loading indicator over the image */}
        {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 text-gray-800 text-lg font-semibold">
                Loading Image...
            </div>
        )}
      </div>
      
      <div className="space-x-4 mb-4">
        <button
          onClick={() => handleGuess('Real')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isImageLoading || feedback !== null} // Disable if image is loading or feedback is showing
        >
          Real
        </button>
        <button
          onClick={() => handleGuess('AI')}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isImageLoading || feedback !== null} // Disable if image is loading or feedback is showing
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