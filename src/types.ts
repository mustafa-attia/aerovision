export type ScreenType =
  | 'landing'
  | 'overview'
  | 'map'
  | 'locations'
  | 'location-details'
  | 'analytics'
  | 'satellite'
  | 'satellite-data'
  | 'how-it-works'
  | 'methodology'
  | 'responsible-lighting'
  | 'design-system';

export type PollutionLevel = 'Low' | 'Moderate' | 'High' | 'Very High' | 'Unavailable';
export type LightPollutionLevel = PollutionLevel;

export type DataClassification = 
  | 'scientific-data'
  | 'calculated-indicator'
  | 'recommendation';

export interface ScientificDataset {
  id: string;
  datasetName: string;
  dataSource: string;
  sourceOrganization: string;
  variableName: string;
  unitOfMeasurement: string;
  timePeriod: string;
  spatialResolution: string;
  dataUpdateDate: string;
  processingMethod: string;
  modelUsed: string;
  modelAssumptions: string;
  modelValidityLimitations: string;
  dataTypeCategory: 'Real Scientific Data' | 'Derived Indicator' | 'Demonstration / Simulated Data';
  isSimulated: boolean;
  simulatedDisclaimer: string;
  usedInMetrics: string[];
  officialDocumentationUrl?: string;
}

export interface ObservationQualityMethodology {
  indicatorName: string;
  formula: string;
  formulaLatex?: string;
  description: string;
  inputVariables: {
    symbol: string;
    name: string;
    sourceDataset: string;
    rawUnit: string;
    weight: string;
    normalizationFormula: string;
    normalizedRange: string;
  }[];
  weightingRationale: string;
  stepByStepCalculation: string[];
  limitations: string[];
  disclaimer: string;
}

export interface ResponsibleLightingPrinciple {
  id: string;
  number: number;
  title: string;
  darkSkyReference: string;
  coreRule: string;
  technicalMetric: string;
  scientificBasis: string;
  calculatedIndicator: string;
  practicalRecommendation: string;
  classification: DataClassification;
}

export interface ObservationLocation {
  id: string;
  name: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  pollutionLevel: PollutionLevel;
  pollutionScore: number; // 0 - 10 (lower is darker/better for stargazing)
  visibilityScore: number; // 0 - 10
  cloudCoverage: number; // percentage 0 - 100
  weatherCondition: string;
  temperature: number; // Celsius
  temperatureC?: number;
  distanceKm: number;
  qualityScore: number; // 0 - 10
  bestObservationTime: string;
  elevationMeters: number;
  bortleClass: number; // 1 (darkest) to 9 (inner city)
  description: string;
  image: string;
  imageUrl?: string;
  recommendedTag?: string;
  humidityPercent?: number;
  celestialTargets: string[];
  recommendedTargets?: string[];
  history: {
    month: string;
    pollution: number;
    visibility: number;
  }[];
  hourlyForecast: {
    time: string;
    visibility: number;
    clouds: number;
    seeing: string;
    skyTransparency: string;
  }[];
}

export type LocationObservation = ObservationLocation;

export interface SatelliteSource {
  id: string;
  name: string;
  sensor: string;
  instrument?: string;
  agency: string;
  orbit: string;
  resolution: string;
  status: 'Online' | 'Calibrating' | 'Syncing' | 'Standby' | 'Active';
  lastPass: string;
  spectralBands: string;
  description: string;
  dataType: string;
  title?: string;
  dataMetric: string;
  updateFrequency: string;
  frequency?: string;
  iconName?: string;
}

export interface PipelineStep {
  step: number;
  title?: string;
  name?: string;
  subtitle?: string;
  tag?: string;
  icon?: string;
  iconName?: string;
  desc?: string;
  description?: string;
  detail?: string;
  latency?: string;
  tech?: string;
}

export interface HistoricalTrend {
  month: string;
  cairo: number;
  taba: number;
  wadiRum: number;
}

export interface VisibilityBreakdown {
  label: string;
  percentage: number;
  color: string;
}

export interface CloudBreakdown {
  label: string;
  percentage: number;
  color: string;
}

export interface FilterState {
  searchQuery: string;
  pollutionLevel: string;
  cloudCoverage: string;
  visibility: string;
  distance: string;
  timeOfObservation: string;
}

// ==========================================
// Open-Meteo Integration & Observation Types
// ==========================================

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  country: string;
  country_code?: string;
  admin1?: string;
  admin2?: string;
  timezone?: string;
  population?: number;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number; // °C
  humidity: number; // %
  cloudCover: number; // %
  cloudCoverLow?: number; // %
  cloudCoverMid?: number; // %
  cloudCoverHigh?: number; // %
  visibility: number; // meters
  precipitationProbability: number; // %
  windSpeed: number; // km/h
  weatherCode: number;
}

export interface ObservationConditions {
  location: string;
  country?: string;
  region?: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  temperature: number; // °C
  humidity: number; // %
  cloudCover: number; // %
  cloudCoverLow?: number;
  cloudCoverMid?: number;
  cloudCoverHigh?: number;
  visibility: number; // meters
  visibilityKm: number; // km
  windSpeed: number; // km/h
  weatherCode: number;
  weatherCondition: string;
  isDay: boolean;
  bortleClass?: number; // 1-9, only when a verified light-pollution source is available
  radiance?: number; // nW·cm⁻²·sr⁻¹, only when a verified light-pollution source is available
  isLive: boolean; // true if from Open-Meteo API
  lastUpdated: string;
  hourlyForecast?: HourlyForecastItem[];
}

export interface ObservationFactorScore {
  value: number | string;
  score: number; // 0 - 100
  weight: number; // fraction, e.g. 0.35
  contribution: number; // weight * score
  impact: string; // "Optimal" | "Good" | "Moderate" | "Degraded"
  description: string;
}

export interface ObservationScoreResult {
  score: number; // 0 - 100
  score10: number; // 0 - 10.0
  rating: 'Optimal' | 'Good' | 'Fair' | 'Poor';
  factors: {
    cloudCover: ObservationFactorScore;
    visibility: ObservationFactorScore;
    humidity: ObservationFactorScore;
    wind: ObservationFactorScore;
    lightPollution: ObservationFactorScore;
  };
  summary: string;
  methodologyNote: string;
}

