import React from 'react';
import { Sidebar } from './components/Sidebar';
import { DefectStats } from './components/DefectStats';
import { MapView } from './components/MapView';
import { VideoPlayer } from './components/VideoPlayer';
import { RoadInfo } from './components/RoadInfo';
import { useAppStore } from './store';
import { Menu } from 'lucide-react';

// Mock data - replace with actual data from your backend
const mockRoute = {
  id: '1',
  name: 'Nairobi-Mombasa Highway',
  coordinates: [
    [39.6682, -4.0435],
    [36.8219, -1.2921]
  ],
  grade: 'B+',
  potholes: 15,
  cracks: 23,
  description: 'This major highway connects Nairobi to Mombasa. Recent inspections show moderate wear in several sections, with increasing pothole formation in the Machakos area. Scheduled maintenance is recommended within the next 3 months.',
  videoUrl: 'https://example.com/road-inspection.mp4',
  date: '2024-03-01'
};

const mockVideoMarkers = [
  { time: 15, type: 'pothole' as const, coordinates: [39.0, -3.0] },
  { time: 45, type: 'crack' as const, coordinates: [38.0, -2.5] },
];

function App() {
  const { isSidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div className="flex h-full bg-gray-100">
      <Sidebar />
      
      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        {/* Toggle button for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="container p-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Stats */}
            <div className="space-y-6">
              <DefectStats
                potholes={mockRoute.potholes}
                cracks={mockRoute.cracks}
              />
            </div>

            {/* Column 2: Map and Video */}
            <div className="lg:col-span-1 space-y-6">
              <div className="h-[400px] bg-white rounded-lg shadow-md overflow-hidden">
                <MapView route={[{
                  coordinates: mockRoute.coordinates,
                  grade: mockRoute.grade
                }]} />
              </div>
              <div className="h-[300px] bg-white rounded-lg shadow-md overflow-hidden">
                <VideoPlayer
                  url={mockRoute.videoUrl}
                  markers={mockVideoMarkers}
                  onProgress={(progress) => {
                    // Update map position based on video progress
                    console.log(progress);
                  }}
                />
              </div>
            </div>

            {/* Column 3: Info */}
            <div>
              <RoadInfo description={mockRoute.description} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;