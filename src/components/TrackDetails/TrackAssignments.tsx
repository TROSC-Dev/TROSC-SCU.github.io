import React from "react";
import { CheckSquare, X, Hourglass } from "lucide-react";

interface Assignment {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

interface TrackAssignmentsProps {
  assignments: Assignment[];
}

const getStatusIcon = (status: string) => {
  if (status === "completed") {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckSquare className="w-5 h-5" />
        <span className="text-sm font-medium text-gray-800">completed</span>
      </div>
    );
  }
  if (status === "in-progress") {
    return (
      <div className="flex items-center gap-2 text-yellow-500">
        <Hourglass className="w-5 h-5" />
        <span className="text-sm font-medium text-gray-800">In progress</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-red-600">
      <X className="w-5 h-5" />
      <span className="text-sm font-medium text-gray-800">Not started</span>
    </div>
  );
};

const TrackAssignments: React.FC<TrackAssignmentsProps> = ({ assignments }) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Assignments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="py-3 px-4 text-left font-bold text-gray-900">task</th>
              <th className="py-3 px-4 text-left font-bold text-gray-900">title</th>
              <th className="py-3 px-4 text-left font-bold text-gray-900">description</th>
              <th className="py-3 px-4 text-left font-bold text-gray-900">deadline</th>
              <th className="py-3 px-4 text-left font-bold text-gray-900">submission</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment.id} className={index !== assignments.length - 1 ? "border-b border-gray-300" : ""}>
                <td className="py-6 px-4 font-bold text-center align-top">{assignment.id}</td>
                <td className="py-6 px-4 text-sm text-gray-800 align-top w-1/5">{assignment.title}</td>
                <td className="py-6 px-4 text-sm text-gray-700 align-top w-2/5">{assignment.description}</td>
                <td className="py-6 px-4 text-sm text-gray-800 align-top">{assignment.deadline}</td>
                <td className="py-6 px-4 align-top">
                  {getStatusIcon(assignment.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackAssignments;
