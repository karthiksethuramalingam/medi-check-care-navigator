
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { HospitalWaitTime } from '../data/waitTimeData';

interface HospitalMapProps {
  waitTimes: HospitalWaitTime[];
  currentDiagnosis?: string;
}

interface HospitalLocation {
  name: string;
  coordinates: [number, number];
  address: string;
}

const hospitalLocations: HospitalLocation[] = [
  {
    name: "Wellington Hospital",
    coordinates: [174.7762, -41.3067],
    address: "Riddiford St, Newtown, Wellington"
  },
  {
    name: "Wakefield Hospital", 
    coordinates: [174.7833, -41.3000],
    address: "8 Hanson St, Newtown, Wellington"
  },
  {
    name: "City Medical Centre",
    coordinates: [174.7756, -41.2865],
    address: "12 Brandon St, Wellington Central"
  },
  {
    name: "Wellington After Hours Medical Centre",
    coordinates: [174.7700, -41.2900],
    address: "17 Adelaide Rd, Newtown, Wellington"
  },
  {
    name: "Wakefield Health Centre",
    coordinates: [174.7850, -41.2980],
    address: "381 Karori Rd, Karori, Wellington"
  }
];

const HospitalMap: React.FC<HospitalMapProps> = ({ waitTimes, currentDiagnosis }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [174.7756, -41.2865], // Wellington center
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      addHospitalMarkers();
    });
  };

  const addHospitalMarkers = () => {
    if (!map.current) return;

    hospitalLocations.forEach(hospital => {
      const waitTime = waitTimes.find(wt => wt.hospital === hospital.name);
      const avgWaitTime = waitTime ? waitTime.waitMinutes : 45; // Default if no diagnosis
      const cost = waitTime ? waitTime.cost : 'Contact for pricing';

      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'hospital-marker';
      markerEl.style.cssText = `
        width: 30px;
        height: 30px;
        background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      `;
      markerEl.innerHTML = '🏥';

      // Create popup
      const popupContent = `
        <div style="font-family: Inter, sans-serif; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 16px; font-weight: 600;">${hospital.name}</h3>
          <div style="margin-bottom: 8px;">
            <strong>Wait Time:</strong> ${Math.floor(avgWaitTime / 60)}h ${avgWaitTime % 60}m
          </div>
          <div style="margin-bottom: 8px;">
            <strong>Cost:</strong> ${cost}
          </div>
          <div style="font-size: 12px; color: #6b7280;">
            ${hospital.address}
          </div>
          ${currentDiagnosis ? `<div style="font-size: 12px; margin-top: 8px; padding: 4px 8px; background: #eff6ff; border-radius: 4px; color: #1e3a8a;">For: ${currentDiagnosis}</div>` : ''}
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(popupContent);

      new mapboxgl.Marker(markerEl)
        .setLngLat(hospital.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken);
      setShowTokenInput(false);
    }
  };

  if (showTokenInput) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-primary">Hospital Locations Map</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            To display the hospital locations map, please enter your Mapbox public token.
            You can get one free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
          </p>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter Mapbox public token (pk.eyJ1...)"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <button
              onClick={handleTokenSubmit}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Load Map
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-primary">Hospital Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapContainer} className="w-full h-96 rounded-lg" />
        <p className="text-xs text-gray-500 mt-2">
          Click on hospital markers to view wait times and costs
        </p>
      </CardContent>
    </Card>
  );
};

export default HospitalMap;
