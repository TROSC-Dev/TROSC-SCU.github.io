import React from "react";

interface TrackHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

const TrackHero: React.FC<TrackHeroProps> = ({ title, subtitle, image }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div
        className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 p-8 w-full text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
          <p className="text-lg md:text-xl font-medium">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackHero;
