// src/components/ImageCard.tsx

import React from 'react';
import { ImageItem } from '../data/image-data'; 

interface Props {
  image: ImageItem;
  onImageLoad: () => void; // Add this new prop
  // Add a prop for when the image fails to load, for robustness
  onImageError: () => void; 
}

const ImageCard: React.FC<Props> = ({ image, onImageLoad, onImageError }) => {
  return (
    <div 
      className="mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-md flex items-center justify-center"
      style={{ 
        width: '400px', 
        height: '400px'
      }}
    >
      <img
        src={image.url}
        alt={`Image ${image.id}`}
        // Add onLoad and onError handlers here
        onLoad={onImageLoad}
        onError={onImageError}
        style={{
          maxWidth: '400px',
          maxHeight: '400px',
          width: 'auto',
          height: 'auto'
        }}
        className="object-contain"
      />
    </div>
  );
};

export default ImageCard;