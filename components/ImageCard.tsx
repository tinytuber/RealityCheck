import React from 'react';
import { ImageItem } from '../data/images';

interface Props {
  image: ImageItem;
}

const ImageCard: React.FC<Props> = ({ image }) => {
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