/**
 * Serviço de Geocodificação e Cálculo de Distâncias para Grande São Paulo
 * Utiliza OpenStreetMap / Nominatim (sem necessidade de API keys pagas)
 */

export interface GeoLocation {
  displayName: string;
  lat: number;
  lon: number;
  city?: string;
  suburb?: string;
}

// Bounding box aproximado do Estado de São Paulo para priorizar resultados locais
const SP_VIEWBOX = '-47.5,-24.5,-45.5,-23.0';

export async function searchAddress(query: string): Promise<GeoLocation[]> {
  if (!query || query.trim().length < 3) return [];

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query + ', São Paulo, Brasil'
    )}&viewbox=${SP_VIEWBOX}&bounded=0&limit=5&addressdetails=1`;

    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'pt-BR,pt;q=0.9',
      },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.map((item: any) => ({
      displayName: formatAddress(item),
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      city: item.address?.city || item.address?.town || item.address?.municipality || 'São Paulo',
      suburb: item.address?.suburb || item.address?.neighbourhood,
    }));
  } catch (err) {
    console.warn('Erro ao buscar endereços via Nominatim:', err);
    return [];
  }
}

function formatAddress(item: any): string {
  const parts: string[] = [];
  const road = item.address?.road || item.address?.pedestrian;
  const suburb = item.address?.suburb || item.address?.neighbourhood;
  const city = item.address?.city || item.address?.town || item.address?.municipality;

  if (road) parts.push(road);
  if (suburb) parts.push(suburb);
  if (city) parts.push(city);
  if (parts.length === 0) return item.display_name.split(',').slice(0, 3).join(',');

  return parts.join(' - ') + ' (SP)';
}

/**
 * Fórmula de Haversine para calcular a distância entre duas coordenadas em KM
 * Aplicamos um fator de correção rodoviário de 1.3x para aproximar da malha viária real
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightDistance = R * c;

  // Fator de rota urbana/estrada (asfalto nunca é linha reta perfeita)
  const roadFactor = 1.32;
  return Math.round(straightDistance * roadFactor);
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
