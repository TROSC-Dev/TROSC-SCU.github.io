import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import TrackCard from "./trackCard";
import * as api from "../services/api";
import type { BackendTrack } from "../services/api";
import type { TrackItem } from "../data/tracksData";

// Placeholder URL used by the backend when no cover image is set
const BACKEND_PLACEHOLDER = "https://placehold.co/800x400?text=Trosc+Track";

// Cycle through gradients for tracks without real images
const GRADIENTS = [
  "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)",
  "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
  "linear-gradient(135deg, #16a34a 0%, #14532d 100%)",
  "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
  "linear-gradient(135deg, #ea580c 0%, #9a3412 100%)",
  "linear-gradient(135deg, #0d9488 0%, #134e4a 100%)",
];

function mapTrack(t: BackendTrack, index: number): TrackItem {
  const hasRealImage = t.coverImage && t.coverImage !== BACKEND_PLACEHOLDER;
  return {
    id: t._id,
    imageUrl: hasRealImage ? t.coverImage : undefined,
    gradient: GRADIENTS[index % GRADIENTS.length],
    title: t.title,
    description: t.description,
  };
}

// ── Loading skeleton ──────────────────────────────────────────

const TrackSkeleton = () => (
  <div className="bg-gray-100 rounded-xl overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

// ── All-Tracks Modal ──────────────────────────────────────────

const AllTracksModal = ({
  tracks,
  onClose,
}: {
  tracks: TrackItem[];
  onClose: () => void;
}) => {
  const close = useCallback(onClose, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", handleKey);
    };
  }, [close]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="All tracks"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              All Tracks
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {tracks.length} track{tracks.length !== 1 ? "s" : ""} available —
              pick your path
            </p>
          </div>
          <button
            onClick={close}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {tracks.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No tracks published yet — check back soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Tracks section ────────────────────────────────────────────

const Tracks = () => {
  // null = still loading, [] = loaded but empty, [...] = has tracks
  const [tracks, setTracks] = useState<TrackItem[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api
      .getTracks("published=true&limit=20")
      .then((res) => {
        if (cancelled) return;
        setTracks(res.data.tracks.map(mapTrack));
      })
      .catch(() => {
        if (!cancelled) setTracks([]); // API unavailable — show empty state
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = tracks === null;
  const featured = (tracks ?? []).slice(0, 3);

  return (
    <div className="bg-white px-6 py-16 w-full flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Our Tracks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            // Skeleton while the API request is in-flight
            [1, 2, 3].map((n) => <TrackSkeleton key={n} />)
          ) : featured.length === 0 ? (
            // API returned no published tracks yet
            <div className="col-span-full text-center py-16 text-gray-500">
              <p className="text-lg font-medium">No tracks published yet.</p>
              <p className="text-sm mt-1">
                Our team is working on it — check back soon!
              </p>
            </div>
          ) : (
            featured.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))
          )}
        </div>

        {!loading && featured.length > 0 && (
          <div className="text-center">
            <button
              onClick={() => setShowModal(true)}
              className="py-3 px-10 bg-primary text-white font-semibold rounded-full hover:bg-primary-hover transition-colors duration-300 shadow-md"
            >
              See All Tracks
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <AllTracksModal
          tracks={tracks ?? []}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Tracks;
