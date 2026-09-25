/**
 * Open-Meteo Weather Forecast API Service
 * Endpoint: https://api.open-meteo.com/v1/forecast
 * Open-access atmospheric and meteorological telemetry for astronomical observation.
 */

import { ObservationConditions, HourlyForecastItem } from '../types';

export interface OpenMeteoRawResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current?: {
    time: string;
    interval?: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    cloud_cover: number;
    visibility: number; // in meters (e.g. 24140, 10000)
    wind_speed_10m: number; // in km/h
    weather_code: number;
    is_day: number; // 0 = night, 1 = day
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    cloud_cover: number[];
    cloud_cover_low?: number[];
    cloud_cover_mid?: number[];
    cloud_cover_high?: number[];
    visibility: number[];
    precipitation_probability?: number[];
    wind_speed_10m: number[];
    weather_code: number[];
  };
}

/**
 * Maps standard WMO Weather interpretation codes to human-readable astronomical weather terms
 */
export function getWmoWeatherDescription(code: number): string {
  switch (code) {
    case 0:
      return 'Clear Sky (Optimal)';
    case 1:
      return 'Mainly Clear';
    case 2:
      return 'Partly Cloudy';
    case 3:
      return 'Overcast';
    case 45:
    case 48:
      return 'Fog / High Haze';
    case 51:
    case 53:
    case 55:
      return 'Light Drizzle';
    case 56:
    case 57:
      return 'Freezing Drizzle';
    case 61:
    case 63:
    case 65:
      return 'Rain';
    case 66:
    case 67:
      return 'Freezing Rain';
    case 71:
    case 73:
    case 75:
      return 'Snow Fall';
    case 77:
      return 'Snow Grains';
    case 80:
    case 81:
    case 82:
      return 'Rain Showers';
    case 85:
    case 86:
      return 'Snow Showers';
    case 95:
      return 'Thunderstorm';
    case 96:
    case 99:
      return 'Thunderstorm with Hail';
    default:
      return 'Atmospheric Clarity Normal';
  }
}

// In-flight promise tracker to prevent duplicate concurrent network requests
const inFlightRequests = new Map<string, Promise<ObservationConditions | null>>();

// Short memory cache (2 minutes) to prevent redundant refetches on quick navigation
interface CacheEntry {
  data: ObservationConditions;
  timestamp: number;
}
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

export async function getWeatherData(
  latitude: number,
  longitude: number,
  locationName: string = 'Observation Site',
  country?: string,
  region?: string
): Promise<ObservationConditions | null> {
  // 1. Validate latitude and longitude
  if (
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    isNaN(latitude) ||
    isNaN(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    console.warn(`[Open-Meteo] Invalid coordinates: lat=${latitude}, lng=${longitude}`);
    return null;
  }

  const cacheKey = `${latitude.toFixed(4)}_${longitude.toFixed(4)}`;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return {
      ...cached.data,
      location: locationName || cached.data.location,
      country: country || cached.data.country,
      region: region || cached.data.region,
    };
  }

  // Deduplicate in-flight requests for identical coordinates
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey)!;
  }

  const requestPromise = (async (): Promise<ObservationConditions | null> => {
    const currentParams = [
      'temperature_2m',
      'relative_humidity_2m',
      'cloud_cover',
      'visibility',
      'wind_speed_10m',
      'weather_code',
      'is_day',
    ].join(',');

    const hourlyParams = [
      'temperature_2m',
      'relative_humidity_2m',
      'cloud_cover',
      'cloud_cover_low',
      'cloud_cover_mid',
      'cloud_cover_high',
      'visibility',
      'precipitation_probability',
      'wind_speed_10m',
      'weather_code',
    ].join(',');

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${currentParams}&hourly=${hourlyParams}&timezone=auto`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000); // 9-second timeout

      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`[Open-Meteo] Forecast HTTP Error: ${response.status} ${response.statusText}`);
        return null;
      }

      const data: OpenMeteoRawResponse = await response.json();

      if (!data || !data.current) {
        console.warn('[Open-Meteo] Malformed payload received (missing current data block)');
        return null;
      }

      const current = data.current;
      const hourly = data.hourly;

      // Parse hourly forecast items (take next 12 hours)
      const hourlyItems: HourlyForecastItem[] = [];
      if (hourly && Array.isArray(hourly.time)) {
        const count = Math.min(12, hourly.time.length);
        for (let i = 0; i < count; i++) {
          hourlyItems.push({
            time: hourly.time[i],
            temperature: hourly.temperature_2m ? hourly.temperature_2m[i] : current.temperature_2m,
            humidity: hourly.relative_humidity_2m ? hourly.relative_humidity_2m[i] : current.relative_humidity_2m,
            cloudCover: hourly.cloud_cover ? hourly.cloud_cover[i] : current.cloud_cover,
            cloudCoverLow: hourly.cloud_cover_low ? hourly.cloud_cover_low[i] : undefined,
            cloudCoverMid: hourly.cloud_cover_mid ? hourly.cloud_cover_mid[i] : undefined,
            cloudCoverHigh: hourly.cloud_cover_high ? hourly.cloud_cover_high[i] : undefined,
            visibility: hourly.visibility ? hourly.visibility[i] : current.visibility,
            precipitationProbability: hourly.precipitation_probability ? hourly.precipitation_probability[i] : 0,
            windSpeed: hourly.wind_speed_10m ? hourly.wind_speed_10m[i] : current.wind_speed_10m,
            weatherCode: hourly.weather_code ? hourly.weather_code[i] : current.weather_code,
          });
        }
      }

      // Convert visibility (meters to km)
      const visibilityMeters = typeof current.visibility === 'number' ? current.visibility : 20000;
      const visibilityKm = Number((visibilityMeters / 1000).toFixed(1));

      const conditions: ObservationConditions = {
        location: locationName,
        country: country,
        region: region,
        latitude,
        longitude,
        elevation: data.elevation !== undefined ? data.elevation : undefined,
        temperature: Math.round(current.temperature_2m * 10) / 10,
        humidity: Math.round(current.relative_humidity_2m),
        cloudCover: Math.round(current.cloud_cover),
        visibility: visibilityMeters,
        visibilityKm,
        windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
        weatherCode: current.weather_code,
        weatherCondition: getWmoWeatherDescription(current.weather_code),
        isDay: current.is_day === 1,
        isLive: true,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hourlyForecast: hourlyItems,
      };

      // Store in memory cache
      cache.set(cacheKey, {
        data: conditions,
        timestamp: Date.now(),
      });

      return conditions;
    } catch (err: any) {
      console.warn('[Open-Meteo] Network/API fetch failed:', err.message || err);
      return null;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, requestPromise);
  return requestPromise;
}
