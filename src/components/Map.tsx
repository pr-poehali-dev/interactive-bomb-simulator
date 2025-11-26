import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  impactRadius?: number;
  radiationRadius?: number;
  blastRadius?: number;
  thermalRadius?: number;
  type?: 'meteor' | 'bomb';
}

const targetIcon = L.divIcon({
  html: `<div style="color: #ef4444; font-size: 32px; text-align: center; line-height: 1; margin-left: -16px; margin-top: -32px;">📍</div>`,
  className: 'custom-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const Map = ({ onLocationSelect, impactRadius, radiationRadius, blastRadius, thermalRadius, type = 'meteor' }: MapProps) => {
  const [position, setPosition] = useState<[number, number]>([55.7558, 37.6173]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationSelect(lat, lng);
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border-2 border-border relative">
      <MapContainer
        center={position}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onLocationSelect={handleLocationSelect} />
        
        <Marker position={position} icon={targetIcon} />

        {type === 'meteor' && impactRadius && (
          <>
            {impactRadius > 0 && (
              <Circle
                center={position}
                radius={impactRadius * 1000}
                pathOptions={{ 
                  color: '#ef4444', 
                  fillColor: '#ef4444', 
                  fillOpacity: 0.3,
                  weight: 2 
                }}
              />
            )}
          </>
        )}

        {type === 'bomb' && (
          <>
            {thermalRadius && thermalRadius > 0 && (
              <Circle
                center={position}
                radius={thermalRadius * 1000}
                pathOptions={{ 
                  color: '#facc15', 
                  fillColor: '#facc15', 
                  fillOpacity: 0.15,
                  weight: 1 
                }}
              />
            )}
            {blastRadius && blastRadius > 0 && (
              <Circle
                center={position}
                radius={blastRadius * 1000}
                pathOptions={{ 
                  color: '#a855f7', 
                  fillColor: '#a855f7', 
                  fillOpacity: 0.25,
                  weight: 2 
                }}
              />
            )}
            {radiationRadius && radiationRadius > 0 && (
              <Circle
                center={position}
                radius={radiationRadius * 1000}
                pathOptions={{ 
                  color: '#06b6d4', 
                  fillColor: '#06b6d4', 
                  fillOpacity: 0.3,
                  weight: 2 
                }}
              />
            )}
            {impactRadius && impactRadius > 0 && (
              <Circle
                center={position}
                radius={impactRadius * 1000}
                pathOptions={{ 
                  color: '#ef4444', 
                  fillColor: '#ef4444', 
                  fillOpacity: 0.4,
                  weight: 3 
                }}
              />
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
