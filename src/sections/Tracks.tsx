import { useState, useEffect, useCallback } from "react";
import { X, Loader2 } from "lucide-react";
import TrackCard from "./trackCard";
import * as api from "../services/api";
import type { BackendTrack } from "../services/api";
import type { TrackItem } from "../data/tracksData";

// Placeholder URL used by the backend when no cover image is set
const BACKEND_PLACEHOLDER = "https://placehold.co/800x400?text=Trosc+Track";

// Stable gradient per ObjectId: hash first char for colour bucket
const GRADIENTS = [
  "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)",
  "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
  "linear-gradient(135deg, #16a34a 0%, #14532d 100%)",
  "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
  "linear-gradient(135deg, #ea580c 0%, #9a3412 100%)",
  "linear-gradient(135deg, #0d9488 0%, #134e4a 100%)",
];

function mapTrack(t: BackendTrack): TrackItem {
  const hasRealImage = t.coverImage && t.coverImage !== BACKEND_PLACEHOLDER;
  // Derive a stable gradient from the ObjectId's last character
  const bucket = parseInt(t._id.slice(-1), 16) % GRADIENTS.length;
  return {
    id: t._id,
    imageUrl: hasRealImage ? t.coverImage : undefined,
    gradient: GRADIENTS[bucket],
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

// ── All-Tracks Modal (with pagination) ────────────────────────

const PAGE_SIZE = 9;

const AllTracksModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const close = useCallback(onClose, [onClose]);

  // Paginated state inside the modal
  const [tracks, setTracks] = useState<TrackItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch one page of tracks
  const fetchPage = useCallback(
    (pageNum: number) => {
      const isFirst = pageNum === 1;
      if (isFirst) setInitialLoading(true);
      else setLoadingMore(true);

      let cancelled = false;
      api
        .getTracks(`published=true&limit=${PAGE_SIZE}&page=${pageNum}`)
        .then((res) => {
          if (cancelled) return;
          setTotal(res.total);
          setTracks((prev) =>
            isFirst
              ? res.data.tracks.map(mapTrack)
              : [...prev, ...res.data.tracks.map(mapTrack)],
          );
          setPage(pageNum);
        })
        .catch(() => {
          // Keep what we have — show no more results
        })
        .finally(() => {
          if (cancelled) return;
          if (isFirst) setInitialLoading(false);
          else setLoadingMore(false);
        });

      return () => { cancelled = true; };
    },
    [],
  );

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  // Lock body scroll
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

  const hasMore = tracks.length < total;

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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">All Tracks</h2>
            {!initialLoading && (
              <p className="text-sm text-gray-500 mt-0.5">
                {total} track{total !== 1 ? "s" : ""} available — pick your path
              </p>
            )}
          </div>
          <button
            onClick={close}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 flex flex-col gap-6">
          {initialLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <TrackSkeleton key={n} />
              ))}
            </div>
          ) : tracks.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No tracks published yet — check back soon!
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tracks.map((track) => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => fetchPage(page + 1)}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 py-2.5 px-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Loading…
                      </>
                    ) : (
                      `Load More (${total - tracks.length} remaining)`
                    )}
                  </button>
                </div>
              )}

              {/* All loaded indicator */}
              {!hasMore && tracks.length > PAGE_SIZE && (
                <p className="text-center text-sm text-gray-400">
                  All {total} tracks loaded
                </p>
              )}
            </>
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

  // Landing page shows first 3 published tracks
  useEffect(() => {
    let cancelled = false;
    api
      .getTracks("published=true&limit=3")
      .then((res) => {
        if (cancelled) return;
        setTracks(res.data.tracks.map(mapTrack));
      })
      .catch(() => {
        if (!cancelled) setTracks([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = tracks === null;
  const featured = tracks ?? [];

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
            [1, 2, 3].map((n) => <TrackSkeleton key={n} />)
          ) : featured.length === 0 ? (
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

        {/* Only show "See All Tracks" when there are tracks to browse */}
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
        <AllTracksModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Tracks;
