import React from "react";
import { CheckSquare, Square } from "lucide-react";

interface WeeklyTask {
  id: number;
  week: string;
  description: string;
  completed: boolean;
}

interface TrackWeeklyTasksProps {
  tasks: WeeklyTask[];
}

const TrackWeeklyTasks: React.FC<TrackWeeklyTasksProps> = ({ tasks }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Tasks</h2>
      <div className="space-y-4 max-w-3xl">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-100 rounded-xl p-4 border border-gray-200 flex items-start gap-4">
            <div className="mt-0.5">
              {task.completed ? (
                <div className="bg-primary text-white rounded shrink-0 w-5 h-5 flex items-center justify-center">
                  <CheckSquare className="w-5 h-5" />
                </div>
              ) : (
                <div className="text-gray-400 shrink-0 w-5 h-5 flex items-center justify-center">
                  <Square className="w-5 h-5" />
                </div>
              )}
            </div>
            <div>
              <p className="text-gray-800 text-sm">
                <span className="font-semibold">{task.week}:</span> {task.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackWeeklyTasks;
