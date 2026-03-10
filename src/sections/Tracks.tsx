import React from 'react';
import TrackCard from './trackCard';

interface Track {
  imageUrl: string;
  title: string;
  description: string;
}

const tracksData: Track[] = [
  {
    imageUrl: 'https://placehold.co/600x400/1a0e0e/ffffff?text=Cyber+Security&font=raleway',
    title: 'Cyber security',
    description: 'Safeguarding digital assets through proactive threat management and robust security protocols.',
  },
  {
    imageUrl: 'https://placehold.co/600x400/1a0e0e/ffffff?text=Mobile&font=raleway',
    title: 'Mobile',
    description: 'Involves creating user-friendly mobile apps for Android and iOS platforms.',
  },
  {
    imageUrl: 'https://placehold.co/600x400/1a0e0e/ffffff?text=Backend&font=raleway',
    title: 'Backend',
    description: 'Deals with servers, databases, and logic that power applications behind the scenes.',
  },
];

const Tracks: React.FC = () => {
  return (
    <div id='tracks' className="bg-white px-6 py-16 w-full flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12" style={{ fontFamily: "'Georgia', serif" }}>
          Our Tracks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tracksData.map((track, index) => (
            <TrackCard key={index} track={track} />
          ))}
        </div>

        <div className="text-center">
          <button className="py-3 px-10 bg-primary text-white font-semibold rounded-full hover:bg-primary-hover transition-colors duration-300 shadow-md">
            See All  Tracks
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
