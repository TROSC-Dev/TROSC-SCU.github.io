import React from "react";

interface PathStage {
  level: string;
  title: string;
  description: string;
}

interface TrackLearningPathProps {
  path: PathStage[];
}

const TrackLearningPath: React.FC<TrackLearningPathProps> = ({ path }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cyber Security Learning Path</h2>
      <p className="text-gray-700 mb-8">Follow your path from beginner to pro — each stage unlocks new skills, concepts, and challenges.</p>

      <div className="relative border-l-2 border-gray-300 ml-3 space-y-10 pb-8">
        {path.map((stage, index) => (
          <div key={index} className="relative pl-8">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-gray-900 rounded-full"></div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{stage.level}</h3>
            <p className="text-gray-800 font-medium mb-1">{stage.title}</p>
            {stage.description && (
              <p className="text-gray-600 text-sm flex items-start gap-1">
                <span className="text-gray-400 mt-0.5">→</span>
                <span>{stage.description}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="text-primary font-bold flex items-center gap-2 mt-4 text-lg">
        🎯 Each stage gives you a badge and new access to exclusive resources.
      </p>
    </div>
  );
};

export default TrackLearningPath;
