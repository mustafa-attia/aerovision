import React, { useState, useEffect, useCallback } from 'react';
import { ScreenType, ObservationLocation, ObservationConditions, ObservationScoreResult, GeocodingResult } from './types';
import { LOCATIONS_DATA } from './data/mockData';
import { getWeatherData } from './api/openMeteo';
import { calculateObservationScore } from './services/observationScore';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { LandingPage } from './components/screens/LandingPage';
import { MainDashboard } from './components/screens/MainDashboard';
import { LightPollutionMapPage } from './components/screens/LightPollutionMapPage';
import { ObservationLocationsPage } from './components/screens/ObservationLocationsPage';
import { LocationDetailsPage } from './components/screens/LocationDetailsPage';
import { AnalyticsPage } from './components/screens/AnalyticsPage';
import { SatelliteDataPage } from './components/screens/SatelliteDataPage';
import { HowItWorksPage } from './components/screens/HowItWorksPage';
import { DesignSystemPage } from './components/screens/DesignSystemPage';
import { DataMethodologyPage } from './components/screens/DataMethodologyPage';
import { ResponsibleLightingPage } from './components/screens/ResponsibleLightingPage';
import { NotificationModal } from './components/modals/NotificationModal';
import { DataProvenanceModal } from './components/modals/DataProvenanceModal';
import { Layers, Sparkles, Database, Lightbulb, Download } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [selectedLocation, setSelectedLocation] = useState<ObservationLocation>(LOCATIONS_DATA[0]);
  const [currentLocationName, setCurrentLocationName] = useState<string>('Cairo, Egypt');
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Live Open-Meteo weather and Observation Score state
  const [currentConditions, setCurrentConditions] = useState<ObservationConditions | null>(null);
  const [observationScore, setObservationScore] = useState<ObservationScoreResult | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  
  // Scientific Data Provenance Modal State
  const [isProvenanceOpen, setIsProvenanceOpen] = useState<boolean>(false);
  const [provenanceDatasetId, setProvenanceDatasetId] = useState<string>('viirs-dnb');

  const handleOpenProvenance = (datasetId: string) => {
    setProvenanceDatasetId(datasetId);
    setIsProvenanceOpen(true);
  };

  /**
   * Fetches live Open-Meteo forecast and computes the Observation Quality Score
   */
  const loadWeatherForLocation = useCallback(async (
    lat: number,
    lng: number,
    name: string,
    country?: string,
    region?: string,
    elevation?: number,
    initialBortle?: number
  ) => {
    setIsWeatherLoading(true);
    setWeatherError(null);
    const displayName = country ? `${name}, ${country}` : name;
    setCurrentLocationName(displayName);

    try {
      const data = await getWeatherData(lat, lng, name, country, region);

      if (data) {
        // Calculate observation score from live Open-Meteo conditions
        const score = calculateObservationScore({
          cloudCover: data.cloudCover,
          visibilityMeters: data.visibility,
          humidity: data.humidity,
          windSpeed: data.windSpeed,
        });

        setCurrentConditions(data);
        setObservationScore(score);

        // Synchronize selectedLocation
        setSelectedLocation(prev => {
          // Create a dynamic ObservationLocation for the searched site.
          // Light-pollution values are intentionally left unavailable until a verified
          // light-pollution dataset is connected; no coordinate-based estimates are used.
          const safeId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return {
            id: safeId,
            name: data.location || name,
            country: data.country || country || 'Global',
            region: data.region || region || 'Observation Zone',
            lat: data.latitude,
            lng: data.longitude,
            pollutionLevel: 'Unavailable',
            pollutionScore: 0,
            visibilityScore: Number((score.factors.visibility.score / 10).toFixed(1)),
            cloudCoverage: data.cloudCover,
            weatherCondition: data.weatherCondition,
            temperature: data.temperature,
            temperatureC: data.temperature,
            humidityPercent: data.humidity,
            distanceKm: 0,
            qualityScore: score.score10,
            bestObservationTime: 'Current forecast window',
            elevationMeters: data.elevation || elevation || 0,
            bortleClass: 0,
            recommendedTag: 'Live Weather Site',
            description: `${data.location || name} (${data.country || 'Global'}) live atmospheric telemetry from Open-Meteo. Light-pollution data is not inferred from coordinates.`,
            image: prev.image || 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80',
            imageUrl: prev.imageUrl || 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80',
            celestialTargets: ['Milky Way Core', 'Jupiter & Galilean Moons', 'Andromeda Galaxy (M31)', 'Deep-Sky Astrophotography'],
            recommendedTargets: ['Milky Way Core', 'Jupiter & Galilean Moons', 'Andromeda Galaxy (M31)', 'Deep-Sky Astrophotography'],
            history: prev.history || [],
            hourlyForecast: data.hourlyForecast ? data.hourlyForecast.map(h => ({
              time: h.time.includes('T') ? h.time.split('T')[1].slice(0, 5) : h.time,
              visibility: Number((h.visibility / 2500).toFixed(1)),
              clouds: h.cloudCover ?? 0,
              seeing: (h.cloudCover ?? 0) <= 15 ? '0.9" (Superb)' : '1.2" (Good)',
              skyTransparency: `${Math.max(60, 100 - (h.cloudCover ?? 0))}%`
            })) : prev.hourlyForecast,
          };
        });
      } else {
        setCurrentConditions(null);
        setObservationScore(null);
        setWeatherError('Live weather data unavailable. No simulated weather or light-pollution values are substituted.');
      }
    } catch (err) {
      console.warn('Weather fetch error:', err);
      setCurrentConditions(null);
      setObservationScore(null);
      setWeatherError('Live weather data unavailable. No simulated weather or light-pollution values are substituted.');
    } finally {
      setIsWeatherLoading(false);
    }
  }, [selectedLocation]);

  // Initial load: Fetch real Open-Meteo weather for the initial location (Cairo, Egypt)
  useEffect(() => {
    loadWeatherForLocation(30.0444, 31.2357, 'Cairo', 'Egypt', 'Cairo Governorate', 23);
  }, []);

  const handleSelectLocationForDetails = (loc: ObservationLocation) => {
    setSelectedLocation(loc);
    loadWeatherForLocation(loc.lat, loc.lng, loc.name, loc.country, loc.region, loc.elevationMeters, loc.bortleClass);
    setCurrentScreen('location-details');
  };

  const handleSearchSelectLocation = (loc: ObservationLocation) => {
    setSelectedLocation(loc);
    loadWeatherForLocation(loc.lat, loc.lng, loc.name, loc.country, loc.region, loc.elevationMeters, loc.bortleClass);
    setCurrentScreen('location-details');
  };

  const handleSelectGeocodedLocation = (geo: GeocodingResult) => {
    loadWeatherForLocation(geo.latitude, geo.longitude, geo.name, geo.country, geo.admin1, geo.elevation);
  };

  const handleViewLocationFromNotification = (locationId: string) => {
    const loc = LOCATIONS_DATA.find((l: ObservationLocation) => l.id === locationId);
    if (loc) {
      setSelectedLocation(loc);
      loadWeatherForLocation(loc.lat, loc.lng, loc.name, loc.country, loc.region, loc.elevationMeters, loc.bortleClass);
      setCurrentScreen('location-details');
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* If currentScreen is 'landing', show full standalone landing page */}
      {currentScreen === 'landing' ? (
        <LandingPage 
          onNavigate={(screen: ScreenType) => setCurrentScreen(screen)} 
          onExploreSky={() => setCurrentScreen('overview')}
        />
      ) : (
        /* Mission Dashboard layout with Sidebar + Header + Content */
        <div className="flex min-h-screen">
          <Sidebar
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            collapsed={isSidebarCollapsed}
          />

          <div className="flex-1 flex flex-col min-w-0 bg-[#030712] pb-16">
            <Header
              currentLocationName={currentLocationName}
              onSelectCurrentLocation={(name) => {
                const preset = [
                  { name: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357 },
                  { name: 'Alexandria, Egypt', lat: 31.2001, lng: 29.9187 },
                  { name: 'Siwa, Egypt', lat: 29.2032, lng: 25.5195 },
                  { name: 'Marsa Matruh, Egypt', lat: 31.3543, lng: 27.2373 },
                  { name: 'Aswan, Egypt', lat: 24.0889, lng: 32.8998 },
                  { name: 'Taba, Egypt', lat: 29.4925, lng: 34.8967 },
                  { name: 'Wadi Rum, Jordan', lat: 29.5734, lng: 35.4206 },
                  { name: 'Madrid, Spain', lat: 40.4168, lng: -3.7038 },
                  { name: 'Santiago, Chile', lat: -33.4489, lng: -70.6693 }
                ].find(p => p.name === name);
                if (preset) {
                  loadWeatherForLocation(preset.lat, preset.lng, preset.name.split(',')[0], preset.name.split(',')[1]?.trim());
                } else {
                  setCurrentLocationName(name);
                }
              }}
              onSearchSelectLocation={handleSearchSelectLocation}
              onSelectGeocodedLocation={handleSelectGeocodedLocation}
              onOpenNotifications={() => setIsNotificationOpen(true)}
              onNavigateHome={() => setCurrentScreen('landing')}
              unreadCount={2}
              isWeatherLoading={isWeatherLoading}
            />

            <main className="flex-1 overflow-y-auto">
              {currentScreen === 'overview' && (
                <MainDashboard
                  onNavigate={(screen) => setCurrentScreen(screen)}
                  onSelectLocationForDetails={handleSelectLocationForDetails}
                  currentLocationName={currentLocationName}
                  onOpenProvenance={handleOpenProvenance}
                  selectedLocation={selectedLocation}
                  onSelectLocation={(loc) => {
                    setSelectedLocation(loc);
                    loadWeatherForLocation(loc.lat, loc.lng, loc.name, loc.country, loc.region, loc.elevationMeters, loc.bortleClass);
                  }}
                  currentConditions={currentConditions}
                  observationScore={observationScore}
                  isWeatherLoading={isWeatherLoading}
                  weatherError={weatherError}
                  onSelectPresetCity={(city) => {
                    loadWeatherForLocation(city.lat, city.lng, city.name.split(',')[0], city.name.split(',')[1]?.trim());
                  }}
                  onRetryWeather={() => {
                    loadWeatherForLocation(selectedLocation.lat, selectedLocation.lng, selectedLocation.name, selectedLocation.country);
                  }}
                />
              )}

              {currentScreen === 'map' && (
                <LightPollutionMapPage
                  selectedLocation={selectedLocation}
                  onSelectLocationForDetails={handleSelectLocationForDetails}
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'locations' && (
                <ObservationLocationsPage
                  onSelectLocation={handleSelectLocationForDetails}
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'location-details' && (
                <LocationDetailsPage
                  location={selectedLocation}
                  onBack={() => setCurrentScreen('locations')}
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'analytics' && (
                <AnalyticsPage
                  onSelectLocationForDetails={handleSelectLocationForDetails}
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'methodology' && (
                <div className="p-4 lg:p-6 max-w-7xl mx-auto">
                  <DataMethodologyPage
                    onOpenProvenance={handleOpenProvenance}
                    onNavigateToLighting={() => setCurrentScreen('responsible-lighting')}
                  />
                </div>
              )}

              {currentScreen === 'responsible-lighting' && (
                <div className="p-4 lg:p-6 max-w-7xl mx-auto">
                  <ResponsibleLightingPage
                    onNavigateToMethodology={() => setCurrentScreen('methodology')}
                    onOpenProvenance={handleOpenProvenance}
                  />
                </div>
              )}

              {(currentScreen === 'satellite' || currentScreen === 'satellite-data') && (
                <SatelliteDataPage
                  onNavigate={(screen: ScreenType) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'how-it-works' && (
                <HowItWorksPage
                  onNavigate={(screen) => setCurrentScreen(screen)}
                />
              )}

              {currentScreen === 'design-system' && (
                <DesignSystemPage />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Floating Quick Screen Navigator for Space-Tech Hackathon Judges */}
      <aside aria-label="Screen Navigator" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 px-3 py-2 rounded-2xl text-xs max-w-[96vw] overflow-x-auto scrollbar-none" style={{ background: 'rgba(4,8,19,0.95)', backdropFilter: 'blur(24px)', border: '1px solid rgba(56,189,248,0.18)', boxShadow: '0 8px 32px rgba(0,0,0,0.8), 0 0 20px rgba(14,165,233,0.08)' }}>
        <span className="text-[10px] font-mono text-sky-400 font-bold uppercase px-2 hidden sm:inline flex items-center gap-1.5 shrink-0 border-r border-slate-800 pr-2.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>Console:</span>
        </span>

        {[
          { id: 'landing', label: 'Landing' },
          { id: 'overview', label: 'Overview' },
          { id: 'map', label: 'Map' },
          { id: 'locations', label: 'Locations' },
          { id: 'location-details', label: 'Details' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'methodology', label: 'Methodology' },
          { id: 'responsible-lighting', label: 'Lighting' },
          { id: 'satellite', label: 'Satellite' },
          { id: 'how-it-works', label: 'Architecture' },
          { id: 'design-system', label: 'Design' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id as ScreenType)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              currentScreen === item.id
                ? 'bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-600 text-white font-semibold shadow-[0_0_15px_rgba(14,165,233,0.5)] border border-sky-400/50 scale-[1.03]'
                : 'hover:text-white hover:bg-slate-800/80 text-slate-400 hover:border-slate-700/60 border border-transparent'
            }`}
          >
            {item.label}
          </button>
        ))}

        <a
          href="/aero-clear-project.zip"
          download="aero-clear-project.zip"
          title="Download Complete Project ZIP"
          className="ml-1 pl-2.5 border-l border-slate-700/80 text-[11px] font-bold text-sky-400 hover:text-white flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-xl bg-sky-950/60 hover:bg-sky-900/80 border border-sky-500/30 hover:border-sky-400/60 transition-all shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>ZIP</span>
        </a>
      </aside>

      {/* Telemetry Alert Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onViewLocation={handleViewLocationFromNotification}
      />

      {/* Scientific Data Provenance Modal */}
      <DataProvenanceModal
        isOpen={isProvenanceOpen}
        datasetId={provenanceDatasetId}
        onClose={() => setIsProvenanceOpen(false)}
        onNavigateToMethodology={() => {
          setIsProvenanceOpen(false);
          setCurrentScreen('methodology');
        }}
      />
    </div>
  );
}
