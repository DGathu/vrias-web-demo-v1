export interface Route {
  id: string;
  name: string;
  coordinates: [number, number][];
  grade: string;
  potholes: number;
  cracks: number;
  description: string;
  videoUrl: string;
  date: string;
}

export interface RouteSegment {
  coordinates: [number, number][];
  grade: string;
}

export interface VideoMarker {
  time: number;
  type: 'pothole' | 'crack';
  coordinates: [number, number];
}