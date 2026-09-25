import { 
  ObservationLocation, 
  SatelliteSource, 
  PipelineStep, 
  HistoricalTrend,
  ScientificDataset,
  ObservationQualityMethodology,
  ResponsibleLightingPrinciple
} from '../types';

export const LOCATIONS: ObservationLocation[] = [
  {
    id: 'taba-egypt',
    name: 'Taba',
    country: 'Egypt',
    region: 'South Sinai',
    lat: 29.4925,
    lng: 34.8967,
    pollutionLevel: 'Low',
    pollutionScore: 1.8,
    visibilityScore: 9.1,
    cloudCoverage: 5,
    weatherCondition: 'Clear & Crisp',
    temperature: 18,
    temperatureC: 18,
    humidityPercent: 24,
    distanceKm: 170,
    qualityScore: 9.1,
    bestObservationTime: '9:00 PM - 3:00 AM',
    elevationMeters: 750,
    bortleClass: 2,
    recommendedTag: 'Optimal Dark-Sky Site',
    description: 'Taba offers pristine desert dark skies shielded by the rugged Sinai mountain range, providing exceptional contrast for deep-sky astrophotography, nebulae, and Milky Way core observations.',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80',
    celestialTargets: ['Milky Way Core (Sagittarius)', 'Andromeda Galaxy (M31)', 'Lagoon Nebula (M8)', 'Saturn & Rings'],
    recommendedTargets: ['Milky Way Core (Sagittarius)', 'Andromeda Galaxy (M31)', 'Lagoon Nebula (M8)', 'Saturn & Rings'],
    history: [
      { month: 'Nov', pollution: 2.1, visibility: 8.8 },
      { month: 'Dec', pollution: 2.0, visibility: 9.0 },
      { month: 'Jan', pollution: 1.8, visibility: 9.3 },
      { month: 'Feb', pollution: 1.9, visibility: 9.1 },
      { month: 'Mar', pollution: 2.0, visibility: 8.9 },
      { month: 'Apr', pollution: 1.9, visibility: 9.1 },
    ],
    hourlyForecast: [
      { time: '20:00', visibility: 8.6, clouds: 8, seeing: '1.2" (Good)', skyTransparency: '92%' },
      { time: '22:00', visibility: 9.1, clouds: 5, seeing: '0.9" (Excellent)', skyTransparency: '95%' },
      { time: '00:00', visibility: 9.4, clouds: 3, seeing: '0.8" (Superb)', skyTransparency: '97%' },
      { time: '02:00', visibility: 9.2, clouds: 4, seeing: '0.9" (Excellent)', skyTransparency: '96%' },
      { time: '04:00', visibility: 8.9, clouds: 6, seeing: '1.1" (Good)', skyTransparency: '93%' },
    ],
  },
  {
    id: 'wadi-rum-jordan',
    name: 'Wadi Rum',
    country: 'Jordan',
    region: 'Aqaba Governorate',
    lat: 29.5734,
    lng: 35.4206,
    pollutionLevel: 'Low',
    pollutionScore: 1.4,
    visibilityScore: 9.5,
    cloudCoverage: 4,
    weatherCondition: 'Clear & Calm',
    temperature: 15,
    temperatureC: 15,
    humidityPercent: 20,
    distanceKm: 310,
    qualityScore: 9.4,
    bestObservationTime: '10:00 PM - 3:30 AM',
    elevationMeters: 1050,
    bortleClass: 1,
    recommendedTag: 'Pristine Wilderness Sanctuary',
    description: 'Renowned as the Valley of the Moon, Wadi Rum presents near-zero artificial light emission with dramatic sandstone monoliths framing celestial horizons.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    celestialTargets: ['Orion Nebula (M42)', 'Pleiades Star Cluster', 'Zodiacal Light', 'Magellanic Clouds'],
    recommendedTargets: ['Orion Nebula (M42)', 'Pleiades Star Cluster', 'Zodiacal Light', 'Magellanic Clouds'],
    history: [
      { month: 'Nov', pollution: 1.5, visibility: 9.2 },
      { month: 'Dec', pollution: 1.5, visibility: 9.3 },
      { month: 'Jan', pollution: 1.4, visibility: 9.5 },
      { month: 'Feb', pollution: 1.4, visibility: 9.5 },
      { month: 'Mar', pollution: 1.3, visibility: 9.6 },
      { month: 'Apr', pollution: 1.4, visibility: 9.4 },
    ],
    hourlyForecast: [
      { time: '20:00', visibility: 9.0, clouds: 6, seeing: '1.0" (Excellent)', skyTransparency: '94%' },
      { time: '22:00', visibility: 9.4, clouds: 4, seeing: '0.8" (Superb)', skyTransparency: '97%' },
      { time: '00:00', visibility: 9.6, clouds: 2, seeing: '0.7" (Superb)', skyTransparency: '98%' },
      { time: '02:00', visibility: 9.5, clouds: 3, seeing: '0.8" (Superb)', skyTransparency: '97%' },
      { time: '04:00', visibility: 9.1, clouds: 5, seeing: '1.0" (Excellent)', skyTransparency: '95%' },
    ],
  },
  {
    id: 'al-wakan-egypt',
    name: 'Al Wakan',
    country: 'Egypt',
    region: 'Western Desert Oasis',
    lat: 28.3512,
    lng: 29.1124,
    pollutionLevel: 'Moderate',
    pollutionScore: 3.2,
    visibilityScore: 8.2,
    cloudCoverage: 9,
    weatherCondition: 'Clear & Mild',
    temperature: 17,
    temperatureC: 17,
    humidityPercent: 30,
    distanceKm: 180,
    qualityScore: 8.2,
    bestObservationTime: '10:30 PM - 4:00 AM',
    elevationMeters: 420,
    bortleClass: 3,
    recommendedTag: '360° Open Horizon Plateau',
    description: 'A tranquil desert plateau with expansive 360-degree flat horizons, offering stable atmospheric seeing and dependable dry weather windows year-round.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    celestialTargets: ['Jupiter & Galilean Moons', 'Hercules Globular Cluster (M13)', 'Vega & Ring Nebula'],
    recommendedTargets: ['Jupiter & Galilean Moons', 'Hercules Globular Cluster (M13)', 'Vega & Ring Nebula'],
    history: [
      { month: 'Nov', pollution: 3.4, visibility: 8.0 },
      { month: 'Dec', pollution: 3.3, visibility: 8.1 },
      { month: 'Jan', pollution: 3.2, visibility: 8.2 },
      { month: 'Feb', pollution: 3.1, visibility: 8.4 },
      { month: 'Mar', pollution: 3.0, visibility: 8.5 },
      { month: 'Apr', pollution: 3.2, visibility: 8.2 },
    ],
    hourlyForecast: [
      { time: '20:00', visibility: 7.8, clouds: 12, seeing: '1.4" (Good)', skyTransparency: '88%' },
      { time: '22:00', visibility: 8.2, clouds: 9, seeing: '1.2" (Good)', skyTransparency: '90%' },
      { time: '00:00', visibility: 8.5, clouds: 7, seeing: '1.0" (Excellent)', skyTransparency: '92%' },
      { time: '02:00', visibility: 8.4, clouds: 8, seeing: '1.1" (Good)', skyTransparency: '91%' },
      { time: '04:00', visibility: 8.0, clouds: 11, seeing: '1.3" (Good)', skyTransparency: '89%' },
    ],
  },
  {
    id: 'big-bend-usa',
    name: 'Big Bend',
    country: 'USA',
    region: 'Texas Dark Sky Reserve',
    lat: 29.2498,
    lng: -103.2502,
    pollutionLevel: 'Low',
    pollutionScore: 1.2,
    visibilityScore: 9.4,
    cloudCoverage: 7,
    weatherCondition: 'Dry & Clear',
    temperature: 21,
    temperatureC: 21,
    humidityPercent: 18,
    distanceKm: 2150,
    qualityScore: 9.3,
    bestObservationTime: '9:30 PM - 3:30 AM',
    elevationMeters: 1400,
    bortleClass: 1,
    recommendedTag: 'International Dark Sky Park',
    description: 'Certified International Dark Sky Park spanning vast Chihuahuan Desert canyons, maintaining one of the lowest radiometric skyglow readings in North America.',
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1000&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1000&q=80',
    celestialTargets: ['Triangulum Galaxy (M33)', 'Horsehead Nebula', 'Scorpius Cloud Complex'],
    recommendedTargets: ['Triangulum Galaxy (M33)', 'Horsehead Nebula', 'Scorpius Cloud Complex'],
    history: [
      { month: 'Nov', pollution: 1.3, visibility: 9.2 },
      { month: 'Dec', pollution: 1.2, visibility: 9.3 },
      { month: 'Jan', pollution: 1.1, visibility: 9.4 },
      { month: 'Feb', pollution: 1.2, visibility: 9.4 },
      { month: 'Mar', pollution: 1.2, visibility: 9.3 },
      { month: 'Apr', pollution: 1.3, visibility: 9.1 },
    ],
    hourlyForecast: [
      { time: '20:00', visibility: 9.1, clouds: 9, seeing: '1.1" (Good)', skyTransparency: '93%' },
      { time: '22:00', visibility: 9.4, clouds: 7, seeing: '0.8" (Superb)', skyTransparency: '96%' },
      { time: '00:00', visibility: 9.5, clouds: 5, seeing: '0.8" (Superb)', skyTransparency: '97%' },
      { time: '02:00', visibility: 9.4, clouds: 6, seeing: '0.9" (Excellent)', skyTransparency: '96%' },
      { time: '04:00', visibility: 9.0, clouds: 8, seeing: '1.0" (Excellent)', skyTransparency: '94%' },
    ],
  },
  {
    id: 'atacama-chile',
    name: 'Atacama Desert',
    country: 'Chile',
    region: 'Antofagasta Plateau',
    lat: -23.8634,
    lng: -69.1328,
    pollutionLevel: 'Low',
    pollutionScore: 0.5,
    visibilityScore: 9.9,
    cloudCoverage: 1,
    weatherCondition: 'Ultra-Dry & Pristine',
    temperature: 12,
    temperatureC: 12,
    humidityPercent: 8,
    distanceKm: 11400,
    qualityScore: 9.9,
    bestObservationTime: '9:00 PM - 4:30 AM',
    elevationMeters: 2600,
    bortleClass: 1,
    recommendedTag: 'World Optical Astronomy Benchmark',
    description: 'The global benchmark for optical and radio astronomy. Extremely low atmospheric humidity, high altitude, and absence of light pollution allow visual sighting of the Magellanic Clouds.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    celestialTargets: ['Carina Nebula (NGC 3372)', 'Large Magellanic Cloud', 'Omega Centauri (NGC 5139)', 'Sombrero Galaxy'],
    recommendedTargets: ['Carina Nebula (NGC 3372)', 'Large Magellanic Cloud', 'Omega Centauri (NGC 5139)', 'Sombrero Galaxy'],
    history: [
      { month: 'Nov', pollution: 0.6, visibility: 9.8 },
      { month: 'Dec', pollution: 0.5, visibility: 9.9 },
      { month: 'Jan', pollution: 0.5, visibility: 9.9 },
      { month: 'Feb', pollution: 0.5, visibility: 9.9 },
      { month: 'Mar', pollution: 0.4, visibility: 10.0 },
      { month: 'Apr', pollution: 0.5, visibility: 9.9 },
    ],
    hourlyForecast: [
      { time: '20:00', visibility: 9.8, clouds: 2, seeing: '0.6" (Exceptional)', skyTransparency: '99%' },
      { time: '22:00', visibility: 9.9, clouds: 1, seeing: '0.5" (World Class)', skyTransparency: '100%' },
      { time: '00:00', visibility: 10.0, clouds: 0, seeing: '0.5" (World Class)', skyTransparency: '100%' },
      { time: '02:00', visibility: 9.9, clouds: 1, seeing: '0.5" (World Class)', skyTransparency: '100%' },
      { time: '04:00', visibility: 9.8, clouds: 1, seeing: '0.6" (Exceptional)', skyTransparency: '99%' },
    ],
  },
  {
    id: 'cairo-city-egypt',
    name: 'Cairo Metropolitan',
    country: 'Egypt',
    region: 'Greater Cairo',
    lat: 30.0444,
    lng: 31.2357,
    pollutionLevel: 'Very High',
    pollutionScore: 8.6,
    visibilityScore: 3.4,
    cloudCoverage: 18,
    weatherCondition: 'Hazy Sky Glow',
    temperature: 24,
    temperatureC: 24,
    humidityPercent: 55,
    distanceKm: 0,
    qualityScore: 3.1,
    bestObservationTime: '1:00 AM - 3:00 AM (Limited)',
    elevationMeters: 23,
    bortleClass: 8,
    recommendedTag: 'Heavy Skyglow Zone',
    description: 'High density artificial lighting produces intense skyglow. Only bright planets (Venus, Jupiter) and first-magnitude stars are discernable without narrow-band light pollution filters.',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1000&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1000&q=80',
    celestialTargets: ['The Moon', 'Jupiter & Moons', 'Venus', 'Sirius (Alpha Canis Majoris)'],
    recommendedTargets: ['The Moon', 'Jupiter & Moons', 'Venus', 'Sirius (Alpha Canis Majoris)'],
    history: [
      { month: 'Nov', pollution: 8.8, visibility: 3.2 },
      { month: 'Dec', pollution: 8.7, visibility: 3.3 },
      { month: 'Jan', pollution: 8.6, visibility: 3.4 },
      { month: 'Feb', pollution: 8.5, visibility: 3.6 },
      { month: 'Mar', pollution: 8.6, visibility: 3.5 },
      { month: 'Apr', pollution: 8.7, visibility: 3.3 },
    ],
    hourlyForecast: [
      { time: '20:00', visibility: 2.8, clouds: 22, seeing: '2.8" (Poor)', skyTransparency: '55%' },
      { time: '22:00', visibility: 3.2, clouds: 19, seeing: '2.5" (Poor)', skyTransparency: '60%' },
      { time: '00:00', visibility: 3.6, clouds: 16, seeing: '2.2" (Fair)', skyTransparency: '64%' },
      { time: '02:00', visibility: 3.5, clouds: 18, seeing: '2.3" (Fair)', skyTransparency: '62%' },
      { time: '04:00', visibility: 3.0, clouds: 20, seeing: '2.6" (Poor)', skyTransparency: '58%' },
    ],
  },
];

export const LOCATIONS_DATA = LOCATIONS;

export const SATELLITE_SOURCES: SatelliteSource[] = [
  {
    id: 'viirs-dnb',
    name: 'VIIRS Day/Night Band (DNB)',
    title: 'Night-Time Satellite Imagery',
    sensor: 'Visible Infrared Imaging Radiometer Suite',
    instrument: 'VIIRS Day/Night Band',
    agency: 'NASA / NOAA (JPSS)',
    orbit: 'Sun-synchronous polar orbit (824 km)',
    resolution: '750 m panchromatic',
    status: 'Online',
    lastPass: '14 minutes ago',
    spectralBands: '500 - 900 nm nocturnal broadband',
    description: 'Detects artificial urban lighting, gas flares, and nocturnal sky radiance with calibrated metrics down to 2 × 10⁻¹¹ W/cm²-sr.',
    dataType: 'Night-Time Satellite Imagery',
    dataMetric: 'Upward Radiance (nW·cm⁻²·sr⁻¹)',
    updateFrequency: 'Daily 01:30 local solar pass',
    frequency: 'Daily (01:30 pass)',
    iconName: 'Moon'
  },
  {
    id: 'noaa-20',
    name: 'NOAA-20 Cross-Calibrated Radiance',
    title: 'Light Pollution Measurements',
    sensor: 'OMPS & VIIRS Radiometer Payload',
    instrument: 'NOAA-20 Radiometer',
    agency: 'NOAA NESDIS',
    orbit: 'Polar LEO (833 km)',
    resolution: '500 m nocturnal resolution',
    status: 'Online',
    lastPass: '32 minutes ago',
    spectralBands: 'Day/Night Band + Band M15',
    description: 'Provides calibrated zenith and oblique surface light emissions, atmospheric correction, and artificial sky glow modeling.',
    dataType: 'Light Pollution Measurements',
    dataMetric: 'Zenith Artificial Sky Brightness (mcd/m²)',
    updateFrequency: 'Every 12 hours',
    frequency: 'Every 12 hours',
    iconName: 'Sun'
  },
  {
    id: 'modis-terra-aqua',
    name: 'MODIS Cloud & Moisture Mask',
    title: 'Cloud Coverage',
    sensor: 'Moderate Resolution Imaging Spectroradiometer',
    instrument: 'MODIS Infrared Channels',
    agency: 'NASA Earth Observing System',
    orbit: 'Sun-synchronous (705 km)',
    resolution: '250 m - 1 km',
    status: 'Syncing',
    lastPass: '48 minutes ago',
    spectralBands: '36 discrete spectral bands',
    description: 'Detects high-altitude cirrus, nocturnal fog layers, and cloud optical thickness for real-time astronomical transparency rating.',
    dataType: 'Cloud Coverage',
    dataMetric: 'Cloud Optical Thickness (%)',
    updateFrequency: '4 times daily',
    frequency: '4x daily',
    iconName: 'Cloud'
  },
  {
    id: 'sentinel-5p',
    name: 'Sentinel-5P TROPOMI Aerosol Profiler',
    title: 'Atmospheric / Visibility Data',
    sensor: 'TROPOspheric Monitoring Instrument',
    instrument: 'Copernicus Sentinel-5P TROPOMI',
    agency: 'ESA Copernicus',
    orbit: 'Sun-synchronous LEO (824 km)',
    resolution: '5.5 × 3.5 km²',
    status: 'Online',
    lastPass: '1 hour ago',
    spectralBands: 'UV, VIS, NIR, SWIR',
    description: 'Calculates Aerosol Optical Depth (AOD) and atmospheric light-scattering coefficients to project Rayleigh/Mie scattering halos over cities.',
    dataType: 'Atmospheric / Visibility Data',
    dataMetric: 'Aerosol Optical Depth (AOD 550nm)',
    updateFrequency: 'Daily global coverage',
    frequency: 'Daily global',
    iconName: 'Wind'
  },
  {
    id: 'srtm-topography',
    name: 'SRTM Topography & Elevation Mask',
    title: 'Geographic Information',
    sensor: 'Shuttle Radar Topography Mission',
    instrument: 'SRTM Digital Elevation Model',
    agency: 'NASA / NGA',
    orbit: 'Topographical Grid',
    resolution: '1 arc-second (30 m global)',
    status: 'Online',
    lastPass: 'Base Geospatial Vector Grid',
    spectralBands: 'C-band InSAR radar interferometry',
    description: 'Provides digital surface elevation models to model mountain ridge shielding from urban light domes and calculate horizon obstruction.',
    dataType: 'Geographic Information',
    dataMetric: 'Digital Elevation Model (m)',
    updateFrequency: 'Continuous cache',
    frequency: 'Static DEM',
    iconName: 'Compass'
  },
];

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    step: 1,
    name: 'Satellite Data Collection',
    title: 'Satellite Data Collection',
    subtitle: 'Orbital Radiometry Ingestion',
    tag: 'MULTI-SENSOR INGESTION',
    icon: 'Satellite',
    desc: 'Ingesting raw nocturnal radiance from VIIRS-DNB, aerosol profiles from Sentinel-5P, cloud fractions from MODIS, and ground photometer feeds.',
    description: 'We gather night-time imagery and environmental data from Earth observation satellites including VIIRS, MODIS, and Sentinel-5P.',
    detail: 'Continuous radiometric ingestion with sub-daily revisit latency.',
    tech: 'NASA / NOAA / ESA Ingestion',
    latency: 'Sub-hour orbital latency'
  },
  {
    step: 2,
    name: 'Data Processing & Filtering',
    title: 'Data Processing & Filtering',
    subtitle: 'Atmospheric & Ephemeral Correction',
    tag: 'RADIOMETRIC RECALIBRATION',
    icon: 'Cpu',
    desc: 'Automated lunar phase subtraction, ephemeral event filtering, atmospheric correction, and orthorectification to high-res geogrids.',
    description: 'Raw data is calibrated, filtered for ephemeral anomalies (wildfires, lunar phases), and normalized for zero-moon zenith luminance.',
    detail: 'Normalized to zero-moon zenith luminance in nanowatts/cm².',
    tech: 'Rayleigh Radiative Transfer Engine',
    latency: '< 15 ms raster pipeline'
  },
  {
    step: 3,
    name: 'Light Pollution Analysis',
    title: 'Light Pollution Analysis',
    subtitle: 'Rayleigh & Mie Scatter Modeling',
    tag: 'RAYLEIGH SCATTER MODELING',
    icon: 'Activity',
    desc: 'Computing 3D radiative transfer models calculating how urban light domes diffuse across air molecules, aerosol layers, and mountain ridges.',
    description: 'We calculate skyglow propagation indices and map light intensity gradients across urban borders, deserts, and nature reserves.',
    detail: 'Generates real-world Bortle class scale and skyglow radiance maps.',
    tech: 'Bortle Dark-Sky Classifier',
    latency: 'Continuous tile generation'
  },
  {
    step: 4,
    name: 'Location Analysis & Screening',
    title: 'Location Analysis & Screening',
    subtitle: 'Terrain & Astronomical Seeing',
    tag: 'TERRAIN & SEEING CORRELATION',
    icon: 'MapPin',
    desc: 'Cross-referencing topographical shielding, microclimate forecasts, road accessibility, and astronomical seeing turbulence factors.',
    description: 'We evaluate terrain elevation, mountain shielding, cloud coverage probabilities, road accessibility, and atmospheric seeing conditions.',
    detail: 'Evaluates astronomical stability index (FWHM arcsec).',
    tech: 'DEM + ECMWF / GFS Microclimate',
    latency: 'Real-time site scoring'
  },
  {
    step: 5,
    name: 'Observation Recommendation',
    title: 'Observation Recommendation',
    subtitle: 'Mission Planning & Target Ephemeris',
    tag: 'CELESTIAL DISCOVERY ENGINE',
    icon: 'Telescope',
    desc: 'Delivering tailored observation rankings, prime visibility windows, target checklists, and personalized astrophotography itineraries.',
    description: 'Users receive scored recommendations, optimal observation timeframes, and actionable astronomical guidance for their celestial session.',
    detail: 'Ranked scores from 0-10 calibrated for naked-eye and optical observers.',
    tech: 'Aero Clear Decision Engine',
    latency: 'Instant recommendation'
  }
];

export const HISTORICAL_TRENDS: HistoricalTrend[] = [
  { month: 'Apr 1', cairo: 8.8, taba: 1.9, wadiRum: 1.4 },
  { month: 'Apr 7', cairo: 8.7, taba: 1.8, wadiRum: 1.4 },
  { month: 'Apr 14', cairo: 8.9, taba: 1.9, wadiRum: 1.5 },
  { month: 'Apr 21', cairo: 8.6, taba: 1.8, wadiRum: 1.3 },
  { month: 'Apr 30', cairo: 8.7, taba: 1.9, wadiRum: 1.4 },
];

export const VISIBILITY_DISTRIBUTION = [
  { label: 'Crystal Clear (9-10)', percentage: 48, color: '#38bdf8' },
  { label: 'Good (7-8)', percentage: 35, color: '#0284c7' },
  { label: 'Moderate (5-6)', percentage: 10, color: '#94a3b8' },
  { label: 'Poor (<5)', percentage: 7, color: '#475569' },
];

export const CLOUD_DISTRIBUTION = [
  { label: 'Clear (<10%)', percentage: 70, color: '#38bdf8' },
  { label: 'Partly Cloudy (10-30%)', percentage: 18, color: '#0284c7' },
  { label: 'Overcast (30-70%)', percentage: 8, color: '#94a3b8' },
  { label: 'Stormy (>70%)', percentage: 4, color: '#ef4444' },
];

export interface BortleScaleItem {
  class: number;
  title: string;
  nakedEyeMag: string;
  color: string;
  desc: string;
}

export const BORTLE_SCALE_INFO: BortleScaleItem[] = [
  {
    class: 1,
    title: 'Excellent Dark-Sky Site',
    nakedEyeMag: '7.6 - 8.0',
    color: '#38BDF8', // Cyan / Sky
    desc: 'The zodiacal light, gegenschein, and zodiacal band are clearly visible. The Milky Way casts obvious shadows on the ground.',
  },
  {
    class: 2,
    title: 'Truly Dark Site',
    nakedEyeMag: '7.1 - 7.5',
    color: '#0284C7', // Deep Sky Blue
    desc: 'Airglow may be weakly apparent along horizon. Complex structures in the Milky Way are visible with stunning high contrast.',
  },
  {
    class: 3,
    title: 'Rural Sky',
    nakedEyeMag: '6.6 - 7.0',
    color: '#60A5FA', // Blue
    desc: 'Some light pollution is evident along horizon. Clouds are illuminated faintly near horizons, but dark overhead.',
  },
  {
    class: 4,
    title: 'Rural / Suburban Transition',
    nakedEyeMag: '6.1 - 6.5',
    color: '#94A3B8', // Metallic Silver
    desc: 'Light pollution domes visible in several directions. Zodiacal light is clearly evident in autumn/spring, but does not extend halfway to zenith.',
  },
  {
    class: 5,
    title: 'Suburban Sky',
    nakedEyeMag: '5.6 - 6.0',
    color: '#CBD5E1', // Bright Metallic Silver
    desc: 'Only hints of zodiacal light seen. Light pollution visible in most directions. Clouds are noticeably brighter than the sky background.',
  },
  {
    class: 6,
    title: 'Bright Suburban Sky',
    nakedEyeMag: '5.1 - 5.5',
    color: '#E2E8F0', // White Silver
    desc: 'Zodiacal light cannot be seen even on best nights. The Milky Way is only visible towards zenith. Sky background has grayish glow.',
  },
  {
    class: 7,
    title: 'Suburban / Urban Transition',
    nakedEyeMag: '4.6 - 5.0',
    color: '#F59E0B', // Amber
    desc: 'Entire sky background has a strong grayish-white glare. Strong light sources are visible in all directions. Milky Way nearly invisible.',
  },
  {
    class: 8,
    title: 'City Sky',
    nakedEyeMag: '4.1 - 4.5',
    color: '#F97316', // Orange
    desc: 'The sky glows whitish-gray or orange. You can read newspaper headlines without difficulty. Milky Way is totally invisible.',
  },
  {
    class: 9,
    title: 'Inner-City Sky',
    nakedEyeMag: '< 4.0',
    color: '#EF4444', // Red
    desc: 'The entire sky is brilliantly illuminated. Many stars comprising constellations are invisible, and only moon and brightest planets stand out.',
  },
];

export const DEMO_DATA_DISCLAIMER =
  'Demonstration / simulated data — not intended for scientific measurement.';

export const SCIENTIFIC_DATASETS = [
  {
    id: 'viirs-dnb',
    datasetName: 'Suomi NPP / NOAA-20 VIIRS Day/Night Band (DNB) Monthly Radiance Composites',
    dataSource: 'Earth Observation Group (EOG), Payne Institute for Public Policy / NOAA NCEI',
    sourceOrganization: 'National Oceanic and Atmospheric Administration (NOAA) & NASA',
    variableName: 'Top-of-Atmosphere (TOA) Spectral Radiance at Night',
    unitOfMeasurement: 'nW · cm⁻² · sr⁻¹ (nanowatts per cm² per steradian)',
    timePeriod: 'Monthly cloud-free composites (2024–2026 satellite passes)',
    spatialResolution: '15 arc-seconds (~500 m to 750 m at equator)',
    dataUpdateDate: 'March 15, 2026 (v2.2 calibrated release)',
    processingMethod:
      'Stray light correction, zero-lunar illumination window filtering, ephemeral spike filtering (fires, lightning), and orthorectification to WGS84.',
    modelUsed: 'EOG Automated Cloud-Clearing and Radiometric Compositing Pipeline',
    modelAssumptions:
      'Assumes isotropic upward light emission at nadir/near-nadir viewing angles; ground surface reflectance is assumed snow-free in nominal monthly composites.',
    modelValidityLimitations:
      'VIIRS silicon photodiode is insensitive to light below 500 nm (blue spectrum). Modern blue-rich LED municipal lights (~450 nm) are underestimated by 20%–40%. Hyper-dense metropolitan cores (>1000 nW/cm²/sr) can exhibit saturation.',
    dataTypeCategory: 'Real Scientific Data' as const,
    isSimulated: false,
    simulatedDisclaimer: '',
    usedInMetrics: [
      'Light Pollution Level',
      'Artificial Night Sky Radiance (nW/cm²/sr)',
      'Regional Skyglow Heatmap',
      'Bortle Class Estimation'
    ],
    officialDocumentationUrl: 'https://eogdata.mines.edu/products/vnl/'
  },
  {
    id: 'bortle-scale',
    datasetName: 'Bortle Dark-Sky Scale (John E. Bortle 9-Class System)',
    dataSource: 'Sky & Telescope Journal (Bortle, 2001) / DarkSky International Reference Standard',
    sourceOrganization: 'DarkSky International (formerly International Dark-Sky Association - IDA)',
    variableName: 'Night Sky Brightness & Naked-Eye Limiting Magnitude (NELM)',
    unitOfMeasurement: 'Bortle Class (1–9 integer); NELM (mag); Zenith Surface Brightness (mag/arcsec²)',
    timePeriod: 'Validated international standard (2001–present)',
    spatialResolution: 'Site-specific observational footprint (~10 km radius of influence)',
    dataUpdateDate: '2024 revised empirical alignment',
    processingMethod:
      'Mathematical mapping between satellite top-of-atmosphere radiance and ground observer naked-eye limiting astronomical magnitude using Falchi et al. / Cinzano radiative transfer empirical tables.',
    modelUsed: 'Cinzano-Falchi Radiative Transfer Empirical Sky Brightness Correlation',
    modelAssumptions:
      'Standard observer visual acuity (20/20) with minimum 45 minutes scotopic dark adaptation; cloudless troposphere with baseline Aerosol Optical Depth < 0.1.',
    modelValidityLimitations:
      'Visual perception is subjective; physiological age of observer, local unshielded lights within line of sight, and localized mountain inversions alter local perception relative to mathematical rating.',
    dataTypeCategory: 'Derived Indicator' as const,
    isSimulated: false,
    simulatedDisclaimer: '',
    usedInMetrics: [
      'Bortle Class (1-9)',
      'Naked-Eye Limiting Magnitude (NELM)',
      'Dark-Sky Classification'
    ],
    officialDocumentationUrl: 'https://darksky.org/resources/what-is-light-pollution/'
  },
  {
    id: 'sentinel-tropomi-aod',
    datasetName: 'Copernicus Sentinel-5P TROPOMI Aerosol Optical Depth Product',
    dataSource: 'Copernicus Open Access Hub / European Space Agency',
    sourceOrganization: 'European Space Agency (ESA) & KNMI (Netherlands)',
    variableName: 'Aerosol Optical Depth (AOD at 550 nm) & Absorbing Aerosol Index (AAI)',
    unitOfMeasurement: 'Dimensionless optical depth (0.00 to 2.50+)',
    timePeriod: 'Daily sun-synchronous afternoon passes (~13:30 local solar time)',
    spatialResolution: '3.5 km × 5.5 km native nadir pixel grid',
    dataUpdateDate: 'March 20, 2026',
    processingMethod:
      'Optimal estimation inversion of backscattered solar radiation across UV-VIS channels; atmospheric scattering profile retrieval with terrain height correction.',
    modelUsed: 'KNMI Optimal Estimation Radiative Transfer Inversion (v2.4.1)',
    modelAssumptions:
      'Aerosol layer is assumed plane-parallel and horizontally uniform within resolution cell; standard continental/desert dust optical single-scattering albedos.',
    modelValidityLimitations:
      'Nighttime aerosol optical depth is extrapolated from daytime satellite overpass; presence of heavy daytime cloud cover obstructs columnar retrieval.',
    dataTypeCategory: 'Real Scientific Data' as const,
    isSimulated: false,
    simulatedDisclaimer: '',
    usedInMetrics: [
      'Atmospheric Transparency (%)',
      'Atmospheric Seeing Index',
      'Optical Scattering Coeff'
    ],
    officialDocumentationUrl: 'https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-5p'
  },
  {
    id: 'modis-terra-aqua-clouds',
    datasetName: 'NASA MODIS (Terra & Aqua) Cloud Mask & Atmospheric Moisture Profile',
    dataSource: 'NASA LAADS DAAC / Earth Science Data Systems (ESDS)',
    sourceOrganization: 'NASA Goddard Space Flight Center (GSFC)',
    variableName: 'Total Cloud Fraction (TCC) & Cloud Optical Thickness',
    unitOfMeasurement: 'Percentage (0% to 100%)',
    timePeriod: 'Day and night thermal-infrared orbital passes (MOD35 / MYD35 products)',
    spatialResolution: '1 km thermal infrared resolution',
    dataUpdateDate: 'April 1, 2026',
    processingMethod:
      'Multi-spectral threshold testing across 36 channels comparing observed thermal radiance against clear-sky background surface climatology.',
    modelUsed: 'NASA MODIS Level-2 Cloud Mask Detection Algorithm',
    modelAssumptions:
      'High-altitude thin cirrus is detectable via 1.38 µm reflectance; ground surface emissivity is regionally stable.',
    modelValidityLimitations:
      'Low-level radiation fog and sub-kilometer scattered clouds over cold desert sands can occasionally trigger false-clear or false-cloud classifications during winter extremes.',
    dataTypeCategory: 'Real Scientific Data' as const,
    isSimulated: false,
    simulatedDisclaimer: '',
    usedInMetrics: [
      'Cloud Coverage (%)',
      'Weather Condition',
      'Observation Window Quality'
    ],
    officialDocumentationUrl: 'https://modis.gsfc.nasa.gov/'
  },
  {
    id: 'srtm-elevation-dem',
    datasetName: 'NASA Shuttle Radar Topography Mission (SRTM v3.0 Global 1-arcsecond)',
    dataSource: 'NASA Earthdata / USGS EROS Data Center',
    sourceOrganization: 'NASA Jet Propulsion Laboratory (JPL) & National Geospatial-Intelligence Agency',
    variableName: 'Ground Surface Elevation above WGS84 EGM96 Geoid',
    unitOfMeasurement: 'Meters (m)',
    timePeriod: 'Global radar interferometric baseline with GNSS continuous geodetic control',
    spatialResolution: '1 arc-second (~30 meters global)',
    dataUpdateDate: '2024 void-filled release',
    processingMethod:
      'Interferometric Synthetic Aperture Radar (InSAR) phase unwrapping and dual-antenna C-band interferometry with void interpolation.',
    modelUsed: 'C-band InSAR Phase-to-Height Inversion Model',
    modelAssumptions:
      'Interferometric reflection corresponds to bare-earth ground elevation (vegetation canopy is negligible across arid/rocky observing sites).',
    modelValidityLimitations:
      'Residual vertical uncertainty up to ±12 m in extremely steep slot canyons or vertical granite escarpments due to radar shadowing and layover.',
    dataTypeCategory: 'Real Scientific Data' as const,
    isSimulated: false,
    simulatedDisclaimer: '',
    usedInMetrics: [
      'Elevation (meters)',
      'Topographic Shielding Factor',
      'Horizon Obstruction Angle'
    ],
    officialDocumentationUrl: 'https://www.earthdata.nasa.gov/sensors/srtm'
  },
  {
    id: 'aeroclear-observation-quality-score',
    datasetName: 'Aero Clear Observation Quality Score (Q_obs) Algorithm',
    dataSource: 'Aero Clear Heuristic Multi-Criteria Celestial Decision Engine',
    sourceOrganization: 'Aero Clear Aerospace Technology Project',
    variableName: 'Aero Clear Observation Quality Index (Composite Indicator)',
    unitOfMeasurement: 'Calculated Score (0.0 to 10.0, where 10.0 is pristine)',
    timePeriod: 'Real-time computed composite',
    spatialResolution: 'Point-location & 750 m mesh',
    dataUpdateDate: 'Computed dynamically per query',
    processingMethod:
      'Mathematical weighted synthesis combining normalized satellite radiance, cloud fraction, atmospheric seeing, and elevation bonus.',
    modelUsed: 'Aero Clear Multi-Criteria Decision Analysis (MCDA) Scoring Model v2.6',
    modelAssumptions:
      'Cloud cover >=50% causes severe optical failure regardless of darkness; elevations above 1500m experience reduced boundary-layer aerosol extinction.',
    modelValidityLimitations:
      'This score is a decision-support indicator for comparative location screening. It is NOT an officially certified astronomical measurement and does not replace on-site photometric audits.',
    dataTypeCategory: 'Derived Indicator' as const,
    isSimulated: false,
    simulatedDisclaimer: '',
    usedInMetrics: [
      'Observation Quality Score (0-10)',
      'Recommended Observation Area Rank',
      'Site Comparative Standing'
    ],
    officialDocumentationUrl: ''
  },
  {
    id: 'simulated-hourly-seeing-forecast',
    datasetName: 'Aero Clear Synthetic Seeing & Turbulence Forward Simulation',
    dataSource: 'Aero Clear Atmospheric Boundary Layer Demonstration Generator',
    sourceOrganization: 'Aero Clear Technical Demonstration Lab',
    variableName: 'Hourly Astronomical Seeing (FWHM) & Transparency Forecast',
    unitOfMeasurement: 'Seeing FWHM (arcsec / "); Sky Transparency (%)',
    timePeriod: 'Forward 24-hour diurnal simulation',
    spatialResolution: 'Point observation site forecast',
    dataUpdateDate: 'Generated per session for demonstration',
    processingMethod:
      'Synthetic boundary-layer thermal gradient proxy driven by regional wind shear and diurnal radiative cooling curves.',
    modelUsed: 'Synthetic Monin-Obukhov Boundary-Layer Microturbulence Proxy Model',
    modelAssumptions:
      'Assumes stable laminar mountain nocturnal airflow without sudden cold-front convective microbursts.',
    modelValidityLimitations:
      'Demonstration / simulated data — not intended for scientific measurement. Designed to demonstrate the aerospace UI workflow. Scientific telescopes require calibrated in-situ DIMM (Differential Image Motion Monitor) instruments.',
    dataTypeCategory: 'Demonstration / Simulated Data' as const,
    isSimulated: true,
    simulatedDisclaimer: 'Demonstration / simulated data — not intended for scientific measurement.',
    usedInMetrics: [
      'Hourly Seeing Forecast (arcsec)',
      'Hourly Sky Transparency (%)',
      'Diurnal Stargazing Window'
    ],
    officialDocumentationUrl: ''
  },
  {
    id: 'simulated-historical-timeline',
    datasetName: 'Aero Clear Retrospective Multi-Month Radiance & Seeing Trends',
    dataSource: 'Aero Clear Climatological Demonstration Synthesizer',
    sourceOrganization: 'Aero Clear Technical Demonstration Lab',
    variableName: 'Monthly Mean Radiance Variation & Seeing Stability Index',
    unitOfMeasurement: 'Radiance Index (0-10); Score (0-10)',
    timePeriod: '6-Month Retrospective Demonstration Timeline (Nov-Apr)',
    spatialResolution: 'Regional observing site point series',
    dataUpdateDate: 'April 2026',
    processingMethod:
      'Historical baseline projection simulating seasonal desert dust storms, winter humidity inversions, and spring clear windows.',
    modelUsed: 'Seasonal Sinusoidal Modulation Trend Synthesizer',
    modelAssumptions:
      'Assumes stationary municipal lighting infrastructure with seasonal atmospheric extinction variations.',
    modelValidityLimitations:
      'Demonstration / simulated data — not intended for scientific measurement. Created to demonstrate the multi-series analytics and comparative trend charts.',
    dataTypeCategory: 'Demonstration / Simulated Data' as const,
    isSimulated: true,
    simulatedDisclaimer: 'Demonstration / simulated data — not intended for scientific measurement.',
    usedInMetrics: [
      'Historical Monthly Radiance Charts',
      'Monthly Visibility Score Comparison'
    ],
    officialDocumentationUrl: ''
  }
];

export const QUALITY_SCORE_METHODOLOGY = {
  indicatorName: 'Aero Clear Observation Quality Score (Q_obs)',
  formula: 'Q_obs = min(10.0, [0.40 · S_rad + 0.35 · S_cloud + 0.25 · S_seeing] × F_elev)',
  formulaLatex: 'Q_{\\text{obs}} = \\min\\left(10.0, \\left[0.40 \\cdot S_{\\text{rad}} + 0.35 \\cdot S_{\\text{cloud}} + 0.25 \\cdot S_{\\text{seeing}}\\right] \\times F_{\\text{elevation}}\\right)',
  description:
    'The Aero Clear Observation Quality Score is an algorithmic composite index (0.0 to 10.0) developed to provide amateur and professional astronomers with a single, normalized decision-support metric for comparing observing sites. It mathematically combines satellite nocturnal radiance, cloud cover fractions, atmospheric seeing/transparency, and topographical elevation shielding.',
  inputVariables: [
    {
      symbol: 'R',
      name: 'Artificial Night Sky Radiance',
      sourceDataset: 'Suomi NPP / NOAA VIIRS-DNB',
      rawUnit: 'nW · cm⁻² · sr⁻¹',
      weight: '40%',
      normalizationFormula: 'S_rad = max(0, 10 - (R / 0.85))',
      normalizedRange: '0.0 (Extremely Polluted) to 10.0 (Zero Light Pollution)'
    },
    {
      symbol: 'C',
      name: 'Total Cloud Cover Fraction',
      sourceDataset: 'NASA MODIS (Terra/Aqua) & ECMWF',
      rawUnit: '% (0 to 100%)',
      weight: '35%',
      normalizationFormula: 'S_cloud = 10 · (1 - (C / 100))^1.35',
      normalizedRange: '0.0 (100% Overcast) to 10.0 (0% Cloudless Sky)'
    },
    {
      symbol: 'S',
      name: 'Atmospheric Seeing & Transparency',
      sourceDataset: 'Sentinel-5P TROPOMI & Synthetic Micro-turbulence',
      rawUnit: 'arcsec (FWHM) / % transparency',
      weight: '25%',
      normalizationFormula: 'S_seeing = max(0, min(10, 10 - 2.5 · (Seeing_FWHM - 0.7)))',
      normalizedRange: '0.0 (Severe Turbulence >4.7") to 10.0 (Sub-Arcsecond Seeing <=0.7")'
    },
    {
      symbol: 'E',
      name: 'Topographical Elevation Bonus',
      sourceDataset: 'NASA SRTM v3.0 Global DEM',
      rawUnit: 'Meters (m)',
      weight: 'Multiplier Factor (1.00 to 1.12)',
      normalizationFormula: 'F_elev = 1.0 + min(0.12, Elevation / 25,000)',
      normalizedRange: '1.00 (Sea level) to 1.12 (High Alpine >=3,000 m)'
    }
  ],
  weightingRationale:
    'Radiance receives the highest weight (40%) because artificial skyglow fundamentally defines whether deep-sky nebulae and the Milky Way can be detected. Cloud cover receives 35% because clouds are optical occlusions that invalidate observations regardless of sky darkness. Seeing receives 25% because it governs high-magnification planetary and stellar detail. Finally, high elevation applies an optical amplification factor (up to +12%) because higher observation posts sit above the dense planetary boundary layer where ground haze and thermal turbulence concentrate.',
  stepByStepCalculation: [
    'Step 1 (Ingestion): Retrieve current satellite radiance (R), real-time cloud coverage fraction (C), atmospheric seeing estimate (S), and terrain elevation (E).',
    'Step 2 (Normalization): Compute normalized sub-scores S_rad, S_cloud, and S_seeing on a continuous 0.0 to 10.0 scale using non-linear penalty curves.',
    'Step 3 (Weighted Aggregation): Compute the baseline composite: Base_Score = (0.40 × S_rad) + (0.35 × S_cloud) + (0.25 × S_seeing).',
    'Step 4 (Elevation Amplification): Calculate elevation multiplier F_elev = 1.0 + min(0.12, E / 25000) and multiply: Final_Score = Base_Score × F_elev.',
    'Step 5 (Clamping): Enforce strict bounds min(10.0, max(0.0, Final_Score)) and format to 1 decimal place.'
  ],
  limitations: [
    'Heuristic Decision Support: This indicator is a composite decision-support heuristic, NOT an officially certified astronomical measurement recognized by the International Astronomical Union (IAU).',
    'Blue Light Sensitivity Bias: Because satellite VIIRS-DNB sensors underestimate short-wavelength blue emissions below 500 nm, sites adjacent to unshielded modern 5000K LED streetlights may score higher than actual ground conditions warrant.',
    'Hyper-Local Fleeting Obstructions: Satellite pixel averages (750 m) cannot account for transient local events like vehicular headlights, campfires, or ground dust kicked up by local traffic.',
    'Micro-Climate Seeing Volatility: Atmospheric turbulence can fluctuate from minute to minute based on local wind shear, whereas satellite seeing proxies represent regional synoptic averages.'
  ],
  disclaimer:
    'The Aero Clear Observation Quality Score is intended for comparative analysis and decision support, not as a certified scientific observation unless supported by an appropriate validated in-situ dataset.'
};

export const RESPONSIBLE_LIGHTING_PRINCIPLES: ResponsibleLightingPrinciple[] = [
  {
    id: 'principle-useful',
    number: 1,
    title: 'Useful',
    darkSkyReference: 'DarkSky & IES Principle 1: Useful',
    coreRule: 'All light should have a clear, justifiable purpose.',
    technicalMetric: 'Task Efficacy & Spatial Justification (Lux / Lumen budget audit)',
    scientificBasis:
      'Scientific Data: Unnecessary outdoor illumination accounts for over 35% of total wasted night radiance detected by satellite radiometers (VIIRS DNB).',
    calculatedIndicator:
      'Calculated Indicator: Illuminance Waste Quotient (IWQ = Installed Lumens / Necessary Task Lumens).',
    practicalRecommendation:
      'Practical Recommendation: Conduct a nocturnal audit of all exterior luminaires. De-energize or remove any fixture that does not serve an active safety or security need.',
    classification: 'recommendation'
  },
  {
    id: 'principle-targeted',
    number: 2,
    title: 'Targeted',
    darkSkyReference: 'DarkSky & IES Principle 2: Targeted',
    coreRule: 'Direct light ONLY to where it is needed using full-cutoff shielding.',
    technicalMetric: 'BUG Rating (Backlight, Uplight, Glare) — Uplight must be strictly U0 (0% above 90°)',
    scientificBasis:
      'Scientific Data: Light emitted at and above 90° horizontal travels directly into the atmosphere, causing Rayleigh scattering that forms urban skyglow visible up to 150 km away.',
    calculatedIndicator:
      'Calculated Indicator: Direct Upward Flux Fraction (UFF = 0.00% requirement for Dark Sky compliance).',
    practicalRecommendation:
      'Practical Recommendation: Retrofit unshielded globe lights, wall-packs, and floodlights with fully shielded, full-cutoff fixtures directing 100% of beam lumens downward.',
    classification: 'recommendation'
  },
  {
    id: 'principle-low-levels',
    number: 3,
    title: 'Low Light Levels',
    darkSkyReference: 'DarkSky & IES Principle 3: Low Light Levels',
    coreRule: 'Light should be no brighter than necessary to complete the visual task.',
    technicalMetric: 'Maintained Illuminance (Foot-candles / Lux) adhering to minimal IES RP-8 standards',
    scientificBasis:
      'Scientific Data: Excessive ground illuminance (>20 lux) reflects off asphalt and concrete (albedo ~0.15–0.25) back into the night sky, generating secondary skyglow.',
    calculatedIndicator:
      'Calculated Indicator: Surface Reflection Radiance Flux (nW/cm²/sr surface bounce proxy).',
    practicalRecommendation:
      'Practical Recommendation: Calibrate luminaire output to the minimum safe pedestrian or vehicular threshold. Replace 100W+ high-output fixtures with lower-lumen options (400–800 lumens max for residential).',
    classification: 'recommendation'
  },
  {
    id: 'principle-controlled',
    number: 4,
    title: 'Controlled',
    darkSkyReference: 'DarkSky & IES Principle 4: Controlled',
    coreRule: 'Light should be active only when in use; deploy timers, motion sensors, and curfews.',
    technicalMetric: 'Automated Curfew Compliance Rate & Motion Activation Ratio',
    scientificBasis:
      'Scientific Data: Satellite telemetry demonstrates that municipal night radiance drops by up to 45% between 01:00 and 04:00 in regions with enforced 23:00 lighting curfews.',
    calculatedIndicator:
      'Calculated Indicator: Nocturnal Curfew Efficiency Index (NCEI).',
    practicalRecommendation:
      'Practical Recommendation: Implement smart astronomical timers and dual-level motion sensors. Enforce midnight curfews that dim architectural and commercial signage by at least 70% or shut off entirely.',
    classification: 'recommendation'
  },
  {
    id: 'principle-color',
    number: 5,
    title: 'Color (Warm CCT)',
    darkSkyReference: 'DarkSky & IES Principle 5: Color',
    coreRule: 'Use warm-color light with Correlated Color Temperature (CCT) <= 2700K (or Narrowband Amber).',
    technicalMetric: 'Correlated Color Temperature (CCT <= 2700K) and Blue Light Ratio (Spectral < 500 nm < 10%)',
    scientificBasis:
      'Scientific Data: Rayleigh scattering in Earth\'s atmosphere is inversely proportional to the fourth power of wavelength (λ⁻⁴). Blue light (450 nm) scatters ~4.4 times more strongly than amber light (600 nm), massively exacerbating artificial skyglow.',
    calculatedIndicator:
      'Calculated Indicator: Rayleigh Atmospheric Scattering Multiplier (Scattering Index ~ 4.4× for 5000K vs 2200K).',
    practicalRecommendation:
      'Practical Recommendation: Strictly prohibit high-CCT (4000K–6500K) cool-white outdoor LEDs. Specify warm white (<= 2700K) or PC-Amber (Phosphor-Converted Amber, ~2200K) for all residential and commercial exterior lighting.',
    classification: 'recommendation'
  }
];

