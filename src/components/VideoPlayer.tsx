import React from 'react';
import ReactPlayer from 'react-player';
import { VideoMarker } from '../types';

interface VideoPlayerProps {
  url: string;
  markers: VideoMarker[];
  onProgress: (progress: { playedSeconds: number }) => void;
}

export function VideoPlayer({ url, markers, onProgress }: VideoPlayerProps) {
  return (
    <div className="relative w-full h-full">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        onProgress={onProgress}
      />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
        {markers.map((marker, index) => (
          <div
            key={index}
            className={`absolute h-full ${
              marker.type === 'pothole' ? 'bg-red-500' : 'bg-orange-500'
            }`}
            style={{
              left: `${(marker.time / 100) * 100}%`,
              width: '2px'
            }}
          />
        ))}
      </div>
    </div>
  );
}