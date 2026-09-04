import React from "react";
import { Lightbulb, Workflow, ShieldQuestion } from "lucide-react";
import type { BackendSession } from "../../services/api";

interface TrackSessionsSummaryProps {
  sessions: BackendSession[];
}

const icons = [Lightbulb, Workflow, ShieldQuestion];

const TrackSessionsSummary: React.FC<TrackSessionsSummaryProps> = ({ sessions }) => {
  if (sessions.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sessions</h2>
      <div className="space-y-4">
        {sessions.map((session, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={session._id} className="bg-gray-100 rounded-xl p-5 border border-gray-200 flex gap-4">
              <div className="mt-1">
                <Icon className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Session {index + 1} : {session.title}
                </h3>
                <p className="text-primary text-sm font-medium">{session.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackSessionsSummary;
