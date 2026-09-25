/**
 * Open-Meteo Geocoding API Service
 * Endpoint: https://geocoding-api.open-meteo.com/v1/search
 * Free, non-commercial open-access geocoding service.
 */

import { GeocodingResult } from '../types';

interface OpenMeteoGeocodingResponse {
  results?: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation?: number;
    feature_code?: string;
    country_code?: string;
    country: string;
    admin1?: string; // State / Governorate / Region
    admin2?: string;
    admin3?: string;
    timezone?: string;
    population?: number;
    postcodes?: string[];
  }>;
  generationtime_ms?: number;
}

// In-flight request tracker to prevent duplicate concurrent searches
let activeAbortController: AbortController | null = null;

/**
 * Searches for global locations using Open-Meteo Geocoding API
 * @param query City or area name (e.g., "Cairo", "Alexandria", "Siwa", "Marsa Matruh")
 * @param count Number of results to return (default: 5)
 * @returns Array of typed GeocodingResult items
 */
export async function searchLocation(query: string, count: number = 5): Promise<GeocodingResult[]> {
  const trimmed = query ? query.trim() : '';

  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  // Cancel prior in-flight search to prevent race conditions & duplicate requests
  if (activeAbortController) {
    activeAbortController.abort();
  }

  activeAbortController = new AbortController();
  const signal = activeAbortController.signal;

  // Intelligent query aliasing for well-known astronomy hotspots
  const searchQueries = [trimmed];
  const lower = trimmed.toLowerCase();
  if (lower === 'siwa') {
    searchQueries.push('Siwah');
  } else if (lower === 'cairo') {
    searchQueries.push('Al Qahirah');
  } else if (lower === 'marsa matruh' || lower === 'matruh') {
    searchQueries.push('Marsa Matruh');
  }

  try {
    const timeoutId = setTimeout(() => {
      if (activeAbortController) {
        activeAbortController.abort();
      }
    }, 8000); // 8-second safety timeout

    // Fetch primary query
    const fetchResultsForName = async (name: string): Promise<GeocodingResult[]> => {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        name
      )}&count=${encodeURIComponent(count)}&language=en&format=json`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal,
      });

      if (!response.ok) return [];
      const data: OpenMeteoGeocodingResponse = await response.json();
      if (!data || !Array.isArray(data.results)) return [];

      return data.results.map((item) => ({
        id: item.id,
        name: item.name,
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        elevation: item.elevation !== undefined ? Number(item.elevation) : undefined,
        country: item.country || '',
        country_code: item.country_code || '',
        admin1: item.admin1,
        admin2: item.admin2,
        timezone: item.timezone,
        population: item.population !== undefined ? Number(item.population) : undefined,
      }));
    };

    const primaryResults = await fetchResultsForName(searchQueries[0]);
    let combinedResults = [...primaryResults];

    if (searchQueries.length > 1) {
      const aliasResults = await fetchResultsForName(searchQueries[1]);
      for (const res of aliasResults) {
        if (!combinedResults.some((existing) => existing.id === res.id)) {
          // If it is in Egypt, promote to top
          if (res.country_code === 'EG') {
            combinedResults.unshift(res);
          } else {
            combinedResults.push(res);
          }
        }
      }
    }

    clearTimeout(timeoutId);
    return combinedResults.slice(0, count);
  } catch (error: any) {
    if (error.name === 'AbortError') {
      // Intentionally aborted for newer query; silently return empty
      return [];
    }
    console.warn('[Open-Meteo Geocoding] Request failed:', error.message || error);
    return [];
  } finally {
    if (activeAbortController?.signal === signal) {
      activeAbortController = null;
    }
  }
}
