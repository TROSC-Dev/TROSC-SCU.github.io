import React from "react";

interface Session {
  id: number;
  title: string;
  description: string;
  instructor: string;
  date: string;
}

interface TrackSessionsTableProps {
  sessions: Session[];
}

const TrackSessionsTable: React.FC<TrackSessionsTableProps> = ({ sessions }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sessions</h2>
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
              <tr key={session.id} className={index !== sessions.length - 1 ? "border-b border-gray-300" : ""}>
                <td className="py-6 px-4 font-bold text-center align-top">{session.id}</td>
                <td className="py-6 px-4 text-sm text-gray-800 align-top w-1/5">{session.title}</td>
                <td className="py-6 px-4 text-sm text-gray-700 align-top w-2/5">{session.description}</td>
                <td className="py-6 px-4 text-sm text-gray-800 align-top">{session.instructor}</td>
                <td className="py-6 px-4 text-sm text-gray-800 align-top">
                  <div>{session.date}</div>
                  <button className="mt-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold py-1.5 px-3 rounded">
                    View session
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackSessionsTable;
