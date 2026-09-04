import React from "react";
import { BarChart3, Users } from "lucide-react";

interface TrackHeroProps {
  title: string;
  subtitle: string;
  image: string;
  level?: string;
  studentCount?: number;
}

const TrackHero: React.FC<TrackHeroProps> = ({
  title,
  subtitle,
  image,
  level,
  studentCount,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div
        className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 p-8 w-full text-white">
          {(level || typeof studentCount === "number") && (
            <div className="flex flex-wrap gap-2 mb-4">
              {level && (
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-xs font-semibold capitalize">
                  <BarChart3 className="w-3.5 h-3.5" />
                  {level}
                </span>
              )}
              {typeof studentCount === "number" && (
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-xs font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  {studentCount} student{studentCount === 1 ? "" : "s"}
                </span>
              )}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
          <p className="text-lg md:text-xl font-medium">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackHero;
