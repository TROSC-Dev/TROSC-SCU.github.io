import React from 'react';

interface Track {
  imageUrl: string;
  title: string;
  description: string;
}

const TrackCard: React.FC<{ track: Track }> = ({ track }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={track.imageUrl}
        alt={track.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://placehold.co/600x400/1a0e0e/ffffff?text=Image+Not+Found';
        }}
      />
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{track.title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{track.description}</p>
        <a href="#" className="text-primary-dark font-semibold text-sm hover:underline">
          View track
        </a>
      </div>
    </div>
  );
};

export default TrackCard;