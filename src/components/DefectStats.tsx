import React from 'react';
import { AlertCircle, Construction } from 'lucide-react';

interface DefectStatsProps {
  potholes: number;
  cracks: number;
}

function calculateGrade(potholes: number, cracks: number): string {
  const total = potholes + cracks;
  if (total <= 5) return 'A+';
  if (total <= 10) return 'A';
  if (total <= 20) return 'B+';
  if (total <= 30) return 'B';
  if (total <= 40) return 'C+';
  if (total <= 50) return 'C';
  return 'D';
}

export function DefectStats({ potholes, cracks }: DefectStatsProps) {
  const grade = calculateGrade(potholes, cracks);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Potholes</p>
              <p className="text-2xl font-bold">{potholes}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cracks</p>
              <p className="text-2xl font-bold">{cracks}</p>
            </div>
            <Construction className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-sm text-gray-500 mb-2">Road Grade</p>
        <div className="relative inline-block">
          <div className="text-4xl font-bold font-serif" style={{
            background: `linear-gradient(45deg, 
              ${grade.startsWith('A') ? '#4ade80' : 
                grade.startsWith('B') ? '#60a5fa' : 
                grade.startsWith('C') ? '#fbbf24' : '#ef4444'
            }, transparent)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}>
            {grade}
          </div>
          <div className="absolute -top-1 -right-2 transform rotate-12 text-red-500 text-xs font-bold">
            {grade === 'A+' && '★'}
          </div>
        </div>
      </div>
    </div>
  );
}