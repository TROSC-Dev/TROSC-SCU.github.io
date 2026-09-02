import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trackData } from "../data/mockTrackData";
import * as api from "../services/api";
import type { BackendTrack } from "../services/api";
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

const BACKEND_PLACEHOLDER = "https://placehold.co/800x400?text=Trosc+Track";

const TrackDetailsPage = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const [liveTrack, setLiveTrack] = useState<BackendTrack | null>(null);

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

  // Resolve hero data: prefer live API, fall back to mock
  const heroTitle = liveTrack?.title ?? trackData.title;
  const heroSubtitle = liveTrack?.description ?? trackData.subtitle;
  const heroImage =
    liveTrack && liveTrack.coverImage !== BACKEND_PLACEHOLDER
      ? liveTrack.coverImage
      : trackData.image;

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

      <TrackHero title={heroTitle} subtitle={heroSubtitle} image={heroImage} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <TrackTabs />

        <div className="mt-8 space-y-16">
          <section id="overview" className="scroll-mt-32">
            <TrackOverview
              trackId={trackId ?? ""}
              overview={trackData.overview}
              scheduleSummary={trackData.scheduleSummary}
              resourcesSummary={trackData.resourcesSummary}
            />
            <div className="py-4">
              <Divider />
            </div>
            <TrackSessionsSummary sessions={trackData.sessionsSummary} />
          </section>

          <Divider />

          <section id="weekly-tasks" className="scroll-mt-32">
            <TrackWeeklyTasks tasks={trackData.weeklyTasks} />
          </section>

          <Divider />

          <section id="sessions" className="scroll-mt-32">
            <TrackSessionsTable sessions={trackData.sessions} />
          </section>

          <Divider />

          <section id="assignments" className="scroll-mt-32">
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
