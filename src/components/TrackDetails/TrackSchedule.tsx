import React from "react";

interface UpcomingEvent {
  date: string;
  event: string;
  type: string;
}

interface TrackScheduleProps {
  upcoming: UpcomingEvent[];
}

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "session":
      return "🧠";
    case "task":
      return "📨";
    case "meeting":
      return "💬";
    default:
      return "📅";
  }
};

const TrackSchedule: React.FC<TrackScheduleProps> = ({ upcoming }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Sessions & Deadlines</h2>
      <p className="text-gray-700 mb-8">Month View (November 2025)</p>

      <div className="overflow-x-auto max-w-4xl">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="py-3 px-4 text-left font-bold text-gray-900 w-1/4">Date</th>
              <th className="py-3 px-4 text-left font-bold text-gray-900 w-1/2">Event</th>
              <th className="py-3 px-4 text-left font-bold text-gray-900 w-1/4">Type</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-b-0">
                <td className="py-6 px-4 text-sm text-gray-800">{item.date}</td>
                <td className="py-6 px-4 text-sm text-gray-800">{item.event}</td>
                <td className="py-6 px-4 text-sm text-gray-800 flex items-center gap-2">
                  <span>{getTypeIcon(item.type)}</span>
                  {item.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-b border-red-200 mt-12 mb-12 max-w-3xl"></div>
    </div>
  );
};

export default TrackSchedule;
