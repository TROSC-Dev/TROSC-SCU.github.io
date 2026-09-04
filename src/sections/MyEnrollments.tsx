import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Video } from "lucide-react";
import * as api from "../services/api";
import type { EnrollmentsResponse } from "../services/api";
import { useAuth } from "../context/useAuth";

const MyEnrollments = () => {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<EnrollmentsResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    api
      .getMyEnrollments()
      .then((res) => {
        if (!cancelled) setData(res.data);
      })
      .catch(() => {
        // No enrollments yet or request failed — section just won't render details
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Not logged in, or still resolving auth — don't show this section at all.
  if (authLoading || !user) return null;

  return (
    <section className="w-full bg-neutral-light px-6 py-10 font-family-poppins">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="mb-6 text-3xl font-extrabold text-primary-darker">
          My Track
        </h2>

        {loading ? (
          <div className="h-24 rounded-2xl bg-gray-200 animate-pulse" />
        ) : data?.track ? (
          <div className="flex flex-col gap-4 rounded-2xl border border-neutral-light-active bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-neutral-darker mb-1">
                {data.track.title}
              </h3>
              <p className="text-sm text-neutral-dark flex flex-wrap gap-4">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={16} /> {data.courses.length} course
                  {data.courses.length === 1 ? "" : "s"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Video size={16} /> {data.sessions.length} session
                  {data.sessions.length === 1 ? "" : "s"}
                </span>
              </p>
            </div>
            <Link
              to={`/track/${data.track._id}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-base font-bold text-white transition-colors hover:bg-primary-hover"
            >
              <GraduationCap size={18} />
              Go to Track
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-light-active bg-white p-6 text-center text-neutral-dark">
            You haven't joined a track yet.{" "}
            <a href="/#tracks" className="text-primary font-semibold hover:text-primary-hover">
              Browse tracks
            </a>{" "}
            to get started.
          </div>
        )}
      </div>
    </section>
  );
};

export default MyEnrollments;
