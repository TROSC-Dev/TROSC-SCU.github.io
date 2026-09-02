import React from "react";

interface TrackResourcesData {
  pdfs: string[];
  recordings: string[];
}

interface TrackResourcesProps {
  resources: TrackResourcesData;
}

const TrackResources: React.FC<TrackResourcesProps> = ({ resources }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Cyber Security Resources</h2>
      <p className="text-gray-700 mb-8">All the materials you need — in one place</p>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-gray-900 rounded-full"></span>
            PDF Guides
          </h3>
          <ul className="space-y-4 pl-6">
            {resources.pdfs.map((pdf, index) => (
              <li key={index} className="flex items-center justify-between group">
                <span className="text-gray-800 text-sm">{pdf}</span>
                <button className="text-primary font-bold text-sm underline decoration-2 underline-offset-4 hover:text-primary-hover transition-colors">
                  open
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-gray-900 rounded-full"></span>
            Sessions recordings
          </h3>
          <ul className="space-y-4 pl-6">
            {resources.recordings.map((rec, index) => (
              <li key={index} className="flex items-center justify-between group">
                <span className="text-gray-800 text-sm">{rec}</span>
                <button className="text-primary font-bold text-sm underline decoration-2 underline-offset-4 hover:text-primary-hover transition-colors">
                  Click here to watch
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-b border-red-200 mt-12 mb-12 max-w-3xl"></div>
    </div>
  );
};

export default TrackResources;
