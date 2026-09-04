import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { trackData } from "../data/mockTrackData";
import * as api from "../services/api";
import { ApiError } from "../services/api";
import type { BackendTrack, BackendSession } from "../services/api";
import TrackHero from "../components/TrackDetails/TrackHero";
import TrackTabs from "../components/TrackDetails/TrackTabs";
import TrackOverview from "../components/TrackDetails/TrackOverview";
import TrackSessionsSummary from "../components/TrackDetails/TrackSessionsSummary";
import TrackWeeklyTasks from "../components/TrackDetails/TrackWeeklyTasks";
import TrackSessionsTable from "../components/TrackDetails/TrackSessionsTable";
import TrackAssignments from "../components/TrackDetails/TrackAssignments";
import TrackLearningPath from "../components/TrackDetails/TrackLearningPath";
import TrackResources from "../components/TrackDetails/TrackResources";
import TrackSchedule from "../components/TrackDetails/TrackSchedule";
import TrackCertificate from "../components/TrackDetails/TrackCertificate";
import TrackFeedback from "../components/TrackDetails/TrackFeedback";
import Divider from "../components/Divider";
import ComingSoonNotice from "../components/ComingSoonNotice";

const BACKEND_PLACEHOLDER = "https://placehold.co/800x400?text=Trosc+Track";

/** Returns true only for valid 24-character hex MongoDB ObjectIds. */
const isValidObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

const TrackDetailsPage = () => {
  const { trackId } = useParams<{ trackId: string }>();

  // Guard: if the URL segment isn't a valid MongoDB ObjectId we know it won't
  // match anything in the database — show a clear message instead of firing
  // requests that will always 400/500.
  if (!trackId || !isValidObjectId(trackId)) {
    return (
      <div className="bg-gray-50 min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Track not found</h1>
          <p className="text-gray-600 mb-6">
            This track doesn't exist yet or hasn't been published.
          </p>
          <Link
            to="/#tracks"
            className="inline-block bg-primary text-white font-bold py-2.5 px-6 rounded-xl hover:bg-primary-hover transition-colors"
          >
            Browse Tracks
          </Link>
        </div>
      </div>
    );
  }

  const [liveTrack, setLiveTrack] = useState<BackendTrack | null>(null);
  const [sessions, setSessions] = useState<BackendSession[]>([]);
  const [sessionsUnauthorized, setSessionsUnauthorized] = useState(false);

  useEffect(() => {
    if (!trackId) return;
    let cancelled = false;
    api
      .getTrack(trackId)
      .then((res) => {
        if (!cancelled) setLiveTrack(res.data.track);
      })
      .catch(() => {
        // Invalid ID or network error — hero falls back to mock data below
      });
    return () => {
      cancelled = true;
    };
  }, [trackId]);

  useEffect(() => {
    if (!trackId) return;
    let cancelled = false;
    api
      .getSessionsByTrack(trackId)
      .then((res) => {
        if (!cancelled) setSessions(res.data.sessions);
      })
      .catch((err) => {
        if (cancelled) return;
        // The sessions routes require auth on the backend — treat 401s as
        // "sign in to view sessions" rather than a hard error.
        if (err instanceof ApiError && err.status === 401) {
          setSessionsUnauthorized(true);
        }
        setSessions([]);
      });
    return () => {
      cancelled = true;
    };
  }, [trackId]);

  // Sort sessions chronologically (soonest first) for display + scheduling.
  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => {
      const aTime = a.startDate ? new Date(a.startDate).getTime() : Infinity;
      const bTime = b.startDate ? new Date(b.startDate).getTime() : Infinity;
      return aTime - bTime;
    });
  }, [sessions]);

  const nextSessionLabel = useMemo(() => {
    const now = Date.now();
    const upcoming = sortedSessions.find(
      (s) => s.startDate && new Date(s.startDate).getTime() > now,
    );
    return upcoming?.startDate
      ? new Date(upcoming.startDate).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : trackData.scheduleSummary.nextSession;
  }, [sortedSessions]);

  // Resolve hero data: prefer live API, fall back to mock
  const heroTitle = liveTrack?.title ?? trackData.title;
  const heroSubtitle = liveTrack?.description ?? trackData.subtitle;
  const heroImage =
    liveTrack && liveTrack.coverImage !== BACKEND_PLACEHOLDER
      ? liveTrack.coverImage
      : trackData.image;

  const scheduleSummary = {
    ...trackData.scheduleSummary,
    nextSession: nextSessionLabel,
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-full pl-10 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <TrackHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImage}
        level={liveTrack?.level}
        studentCount={liveTrack?.studentCount}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <TrackTabs />

        <div className="mt-8 space-y-16">
          <section id="overview" className="scroll-mt-32">
            <TrackOverview
              trackId={trackId ?? ""}
              track={liveTrack}
              overview={trackData.overview}
              scheduleSummary={scheduleSummary}
              resourcesSummary={trackData.resourcesSummary}
            />
            <div className="py-4">
              <Divider />
            </div>
            {sessionsUnauthorized ? (
              <ComingSoonNotice message="Sign in to view this track's sessions." />
            ) : (
              <TrackSessionsSummary sessions={sortedSessions.slice(0, 3)} />
            )}
          </section>

          <Divider />

          <section id="weekly-tasks" className="scroll-mt-32">
            <ComingSoonNotice
              message="Weekly tasks aren't tracked by the backend yet — the items below are illustrative examples only."
              className="mb-6"
            />
            <TrackWeeklyTasks tasks={trackData.weeklyTasks} />
          </section>

          <Divider />

          <section id="sessions" className="scroll-mt-32">
            {sessionsUnauthorized ? (
              <ComingSoonNotice message="Sign in to view this track's sessions." />
            ) : (
              <TrackSessionsTable sessions={sortedSessions} />
            )}
          </section>

          <Divider />

          <section id="assignments" className="scroll-mt-32">
            <ComingSoonNotice
              message="Assignments aren't wired up on the backend yet — the items below are illustrative examples only."
              className="mb-6"
            />
            <TrackAssignments assignments={trackData.assignments} />
            <TrackLearningPath path={trackData.learningPath} />
          </section>

          <Divider />

          <section id="resources" className="scroll-mt-32">
            <TrackResources resources={trackData.resources} />
          </section>

          <section id="schedule" className="scroll-mt-32">
            <TrackSchedule upcoming={trackData.upcomingSessions} />
            <TrackCertificate certificate={trackData.certificate} />
          </section>

          <section id="feedback" className="scroll-mt-32">
            <TrackFeedback trackId={trackId ?? ""} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TrackDetailsPage;
