import React from "react";

interface TrackCertificateProps {
  certificate: {
    includes: string[];
  };
}

const TrackCertificate: React.FC<TrackCertificateProps> = ({ certificate }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">End-of-Track Appreciation Certificate</h2>
      <p className="text-gray-800 text-lg mb-6">
        After completing all sessions and assignments, you'll receive an official 
        Certificate of Appreciation from Trosc Team
      </p>

      <div className="pl-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">This certificate will include:</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-800 text-sm">
          {certificate.includes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="border-b border-red-200 mt-12 mb-12 max-w-3xl"></div>
    </div>
  );
};

export default TrackCertificate;
