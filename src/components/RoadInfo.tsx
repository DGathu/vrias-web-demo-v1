import React from 'react';
import { Info } from 'lucide-react';

interface RoadInfoProps {
  description: string;
}

export function RoadInfo({ description }: RoadInfoProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Road Condition Report</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Info className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">About Project</h3>
        </div>
        <p className="text-gray-600">
          RoadWatch AI is an advanced road monitoring system that uses deep learning
          to detect and analyze road defects in real-time. Our AI model identifies
          potholes, cracks, and other surface anomalies, helping authorities
          maintain road infrastructure efficiently.
        </p>
        <div className="mt-4 text-sm text-gray-500">
          <p>Features:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Real-time defect detection</li>
            <li>GPS-synchronized video analysis</li>
            <li>Automated road condition grading</li>
            <li>Historical data tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}