import React from "react";
import type { BackendSession } from "../../services/api";

interface TrackSessionsTableProps {
  sessions: BackendSession[];
}

const formatDate = (date?: string): string =>
  date ? new Date(date).toLocaleDateString() : "TBA";

const formatDuration = (duration?: number): string =>
  duration ? `${duration} min` : "—";

const TrackSessionsTable: React.FC<TrackSessionsTableProps> = ({ sessions }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-600 text-sm">No sessions available yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-800">
                <th className="py-3 px-4 text-left font-bold text-gray-900">Session</th>
                <th className="py-3 px-4 text-left font-bold text-gray-900">title</th>
                <th className="py-3 px-4 text-left font-bold text-gray-900">description</th>
                <th className="py-3 px-4 text-left font-bold text-gray-900">instructor</th>
                <th className="py-3 px-4 text-left font-bold text-gray-900">date</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr
                  key={session._id}
                  className={index !== sessions.length - 1 ? "border-b border-gray-300" : ""}
                >
                  <td className="py-6 px-4 font-bold text-center align-top">{index + 1}</td>
                  <td className="py-6 px-4 text-sm text-gray-800 align-top w-1/5">{session.title}</td>
                  <td className="py-6 px-4 text-sm text-gray-700 align-top w-2/5">
                    {session.description}
                  </td>
                  <td className="py-6 px-4 text-sm text-gray-800 align-top">
                    {session.instructor?.name ?? "TBA"}
                  </td>
                  <td className="py-6 px-4 text-sm text-gray-800 align-top">
                    <div>{formatDate(session.startDate)}</div>
                    <div className="text-xs text-gray-500">{formatDuration(session.duration)}</div>
                    {(session.url || session.embedUrl) && (
                      <a
                        href={session.url || session.embedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold py-1.5 px-3 rounded"
                      >
                        View session
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrackSessionsTable;
