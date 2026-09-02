import { Link } from "react-router-dom";
import type { TrackItem } from "../data/tracksData";

const TrackCard = ({ track }: { track: TrackItem }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {track.imageUrl ? (
        <img
          src={track.imageUrl}
          alt={track.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e2e8f0'/%3E%3Ctext x='300' y='200' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif' font-size='18' fill='%23718096'%3EImage not found%3C/text%3E%3C/svg%3E";
          }}
        />
      ) : (
        <div
          className="w-full h-48 flex items-center justify-center"
          style={{ background: track.gradient }}
        >
          <span className="text-white text-5xl font-black opacity-40 select-none">
            {track.title[0]}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{track.title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
          {track.description}
        </p>
        <Link
          to={`/track/${track.id}`}
          className="text-primary-dark font-semibold text-sm hover:underline w-fit"
        >
          View track →
        </Link>
      </div>
    </div>
  );
};

export default TrackCard;
