import { useState } from "react";
import { Calendar, BookOpen, GraduationCap, BarChart3, Users, Layers } from "lucide-react";
import toast from "react-hot-toast";
import * as api from "../../services/api";
import type { BackendTrack } from "../../services/api";
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";

interface ScheduleSummary {
  nextSession: string;
  projectDeadline: string;
  finalExam: string;
}

interface TrackOverviewProps {
  trackId: string;
  track: BackendTrack | null;
  overview: string;
  scheduleSummary: ScheduleSummary;
  resourcesSummary: string[];
}

const TrackOverview = ({
  trackId,
  track,
  overview,
  scheduleSummary,
  resourcesSummary,
}: TrackOverviewProps) => {
  const { user, loading: authLoading } = useAuth();
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = async () => {
    if (!trackId) return;
    setEnrolling(true);
    try {
      const res = await api.enrollInTrack(trackId);
      toast.success(res.message);
      setEnrolled(true);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to enroll. Please try again.",
      );
    } finally {
      setEnrolling(false);
    }
  };

  const isEnrolled = !!user && user.enrolledTrack === trackId;
  const isPending = !!user && !!track?.pendingStudents?.includes(user._id);

  const renderEnrollAction = () => {
    if (enrolled) {
      return (
        <div className="rounded-xl px-4 py-3 text-sm font-semibold bg-green-50 text-green-700 border border-green-200 text-center">
          Enrollment request submitted ✓
        </div>
      );
    }

    if (authLoading) {
      return (
        <button
          disabled
          className="w-full bg-gray-200 text-gray-500 font-bold py-3 px-4 rounded-xl cursor-not-allowed"
        >
          Loading...
        </button>
      );
    }

    if (!user) {
      return (
        <Link
          to="/signin"
          className="block w-full text-center bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
        >
          Sign in to enroll
        </Link>
      );
    }

    if (isEnrolled) {
      return (
        <div className="rounded-xl px-4 py-3 text-sm font-semibold bg-green-50 text-green-700 border border-green-200 text-center">
          You are enrolled ✓
        </div>
      );
    }

    if (isPending) {
      return (
        <div className="rounded-xl px-4 py-3 text-sm font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200 text-center">
          Pending approval
        </div>
      );
    }

    return (
      <button
        onClick={handleEnroll}
        disabled={enrolling}
        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {enrolling ? "Submitting..." : "Join the Track"}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{overview}</p>
      </div>

      <div className="space-y-6">
        {renderEnrollAction()}

        {track && (
          <div className="bg-gray-100 rounded-xl p-5 border border-gray-200">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-gray-700" />
              Track Info
            </h3>
            <ul className="space-y-3 text-sm text-gray-800">
              <li className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                <span>Instructor: {track.instructor?.name ?? "TBA"}</span>
              </li>
              <li className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary shrink-0" />
                <span className="capitalize">Level: {track.level}</span>
              </li>
              <li className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary shrink-0" />
                <span>Courses: {track.courseCount}</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary shrink-0" />
                <span>Students enrolled: {track.studentCount}</span>
              </li>
            </ul>
          </div>
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
