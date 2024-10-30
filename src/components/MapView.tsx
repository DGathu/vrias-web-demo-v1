import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Note: You'll need to replace this with your actual Mapbox token
mapboxgl.accessToken = 'pk.your_mapbox_token_here';

interface MapViewProps {
  route?: {
    coordinates: [number, number][];
    grade: string;
  }[];
}

export function MapView({ route }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [36.8219, 1.2921], // Nairobi coordinates
      zoom: 8
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !route) return;

    map.current.on('load', () => {
      if (!map.current) return;

      // Add the route line
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route.map(segment => segment.coordinates[0])
          }
        }
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': [
            'match',
            ['get', 'grade'],
            'A+', '#4ade80',
            'A', '#86efac',
            'B+', '#60a5fa',
            'B', '#93c5fd',
            'C+', '#fbbf24',
            'C', '#fcd34d',
            '#ef4444'
          ],
          'line-width': 8
        }
      });
    });
  }, [route]);

  return (
    <div ref={mapContainer} className="w-full h-full rounded-lg shadow-md" />
  );
}