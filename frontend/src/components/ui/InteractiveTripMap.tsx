import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoLocation } from '../../services/geoService';

// Fix dos ícones padrão do Leaflet no empacotamento Vite
const iconOrigin = L.divIcon({
  className: 'custom-map-pin-origin',
  html: `<div style="background-color: #2563EB; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">A</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const iconDestination = L.divIcon({
  className: 'custom-map-pin-dest',
  html: `<div style="background-color: #E11D48; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">B</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const iconWaypoint = L.divIcon({
  className: 'custom-map-pin-wp',
  html: `<div style="background-color: #F59E0B; width: 22px; height: 22px; border-radius: 50%; border: 2px solid white; box-shadow: 0 3px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">•</div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

// Componente para ajustar automaticamente os limites da câmera do mapa
function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length >= 2) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    } else if (points.length === 1) {
      map.setView(points[0], 13);
    }
  }, [points, map]);

  return null;
}

interface InteractiveTripMapProps {
  originGeo?: GeoLocation | null;
  destGeo?: GeoLocation | null;
  originLabel?: string;
  destLabel?: string;
  waypoints?: { address: string; lat?: number; lon?: number }[];
}

export const InteractiveTripMap: React.FC<InteractiveTripMapProps> = ({
  originGeo,
  destGeo,
  originLabel = 'Origem (Embarque)',
  destLabel = 'Destino Final',
  waypoints = [],
}) => {
  // Centro padrão em São Paulo (Praça da Sé)
  const defaultCenter: [number, number] = [-23.5505, -46.6333];

  const points: [number, number][] = [];
  if (originGeo) points.push([originGeo.lat, originGeo.lon]);
  waypoints.forEach((wp) => {
    if (wp.lat && wp.lon) points.push([wp.lat, wp.lon]);
  });
  if (destGeo) points.push([destGeo.lat, destGeo.lon]);

  const hasRoute = points.length >= 2;

  return (
    <div className="relative w-full h-72 sm:h-80 rounded-3xl overflow-hidden border-2 border-brand-border-strong shadow-towel z-10">
      <MapContainer
        center={points[0] || defaultCenter}
        zoom={11}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {originGeo && (
          <Marker position={[originGeo.lat, originGeo.lon]} icon={iconOrigin}>
            <Popup>
              <div className="text-xs space-y-1">
                <strong className="text-blue-600 block">Embarque Inicial</strong>
                <span>{originLabel}</span>
              </div>
            </Popup>
          </Marker>
        )}

        {waypoints.map((wp, idx) =>
          wp.lat && wp.lon ? (
            <Marker key={idx} position={[wp.lat, wp.lon]} icon={iconWaypoint}>
              <Popup>
                <div className="text-xs space-y-1">
                  <strong className="text-amber-600 block">Parada #{idx + 1}</strong>
                  <span>{wp.address}</span>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}

        {destGeo && (
          <Marker position={[destGeo.lat, destGeo.lon]} icon={iconDestination}>
            <Popup>
              <div className="text-xs space-y-1">
                <strong className="text-rose-600 block">Destino Final</strong>
                <span>{destLabel}</span>
              </div>
            </Popup>
          </Marker>
        )}

        {hasRoute && (
          <Polyline
            positions={points}
            color="#2563EB"
            weight={4}
            opacity={0.8}
            dashArray="8, 6"
          />
        )}

        {points.length > 0 && <FitBounds points={points} />}
      </MapContainer>

      {/* Badge Flutuante no Mapa */}
      <div className="absolute top-3 right-3 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-border text-[11px] font-bold text-brand-ink shadow-sm flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        {hasRoute ? 'Traçado de Rota Ativo' : 'Visualização da Grande SP'}
      </div>
    </div>
  );
};
