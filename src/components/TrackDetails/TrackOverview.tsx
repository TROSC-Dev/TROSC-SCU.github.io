import { useState } from "react";
import { Calendar, BookOpen } from "lucide-react";
import * as api from "../../services/api";

interface ScheduleSummary {
  nextSession: string;
  projectDeadline: string;
  finalExam: string;
}

interface TrackOverviewProps {
  trackId: string;
  overview: string;
  scheduleSummary: ScheduleSummary;
  resourcesSummary: string[];
}

const TrackOverview = ({
  trackId,
  overview,
  scheduleSummary,
  resourcesSummary,
}: TrackOverviewProps) => {
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState<{
    text: string;
    ok: boolean;
  } | null>(null);

  const handleEnroll = async () => {
    if (!trackId) return;
    setEnrolling(true);
    setEnrollMsg(null);
    try {
      const res = await api.enrollInTrack(trackId);
      setEnrollMsg({ text: res.message, ok: true });
    } catch (err) {
      setEnrollMsg({
        text:
          err instanceof Error
            ? err.message
            : "Failed to enroll. Please try again.",
        ok: false,
      });
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{overview}</p>
      </div>

      <div className="space-y-6">
        {enrollMsg ? (
          <div
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              enrollMsg.ok
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {enrollMsg.text}
          </div>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enrolling ? "Submitting..." : "Join the Track"}
          </button>
        )}

        <div className="bg-gray-100 rounded-xl p-5 border border-gray-200">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-700" />
            Schedule
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex flex-col">
              <span className="font-semibold text-primary">
                Next Session:{" "}
                <span className="text-gray-600 font-normal">
                  {scheduleSummary.nextSession}
                </span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-primary">
                Project Deadline:{" "}
                <span className="text-gray-600 font-normal">
                  {scheduleSummary.projectDeadline}
                </span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-primary">
                Final Exam:{" "}
                <span className="text-gray-600 font-normal">
                  {scheduleSummary.finalExam}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-5 border border-gray-200">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-gray-700" />
            Resources
          </h3>
          <ul className="space-y-2 text-sm text-gray-800">
            {resourcesSummary.map((res, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrackOverview;
