/**
 * Aero Clear Environmental Observation Quality Score Model
 * Computes an explainable, multi-factor rating for astronomical observation
 * combining Open-Meteo atmospheric telemetry and light-pollution radiance metrics.
 *
 * NOTE: This is the internal Aero Clear comparative decision-support formulation,
 * calibrated for stargazing and astrophotography site selection.
 * It is not an official ISO or IAU scientific standard.
 */

import { ObservationScoreResult, ObservationFactorScore } from '../types';

export interface ObservationScoreInput {
  cloudCover: number; // 0 - 100%
  visibilityMeters: number; // in meters (e.g. 24140) or km
  humidity: number; // 0 - 100%
  windSpeed: number; // in km/h
  bortleClass?: number; // 1 (pristine) to 9 (inner-city skyglow)
  radiance?: number; // nW·cm⁻²·sr⁻¹
}

/**
 * Calculates the multi-factor Observation Quality Score with full transparency breakdown
 */
export function calculateObservationScore(input: ObservationScoreInput): ObservationScoreResult {
  // Normalize visibility to kilometers
  const visibilityKm =
    input.visibilityMeters > 500
      ? input.visibilityMeters / 1000
      : Math.max(0.1, input.visibilityMeters);

  // 1. Cloud Cover Factor (Weight: 35%)
  // Clear sky (0%) is paramount for telescope and naked-eye observing
  const cloud = Math.min(100, Math.max(0, input.cloudCover));
  let cloudScore = Math.max(0, 100 - cloud * 1.05);
  if (cloud >= 80) cloudScore = Math.max(0, 20 - (cloud - 80) * 1.0);
  cloudScore = Math.round(cloudScore);

  let cloudImpact = 'Optimal';
  if (cloud > 50) cloudImpact = 'Degraded';
  else if (cloud > 20) cloudImpact = 'Moderate';
  else if (cloud > 5) cloudImpact = 'Good';

  const cloudFactor: ObservationFactorScore = {
    value: `${cloud}%`,
    score: cloudScore,
    weight: 0.35,
    contribution: Number((cloudScore * 0.35).toFixed(1)),
    impact: cloudImpact,
    description:
      cloud <= 10
        ? 'Minimal cloud obstruction allows direct stellar and deep-sky visibility.'
        : cloud <= 35
        ? 'Scattered clouds; localized observation windows available between cloud banks.'
        : 'Substantial cloud extinction blocks stellar transparency across most azimuths.',
  };

  // 2. Visibility Factor (Weight: 25%)
  // Horizontal atmospheric transparency indicating low aerosol / mist scattering
  let visScore = 100;
  if (visibilityKm >= 20) {
    visScore = 100;
  } else if (visibilityKm >= 10) {
    visScore = Math.round(75 + ((visibilityKm - 10) / 10) * 25);
  } else if (visibilityKm >= 5) {
    visScore = Math.round(40 + ((visibilityKm - 5) / 5) * 35);
  } else {
    visScore = Math.round(Math.max(10, (visibilityKm / 5) * 40));
  }

  let visImpact = 'Optimal';
  if (visibilityKm < 7) visImpact = 'Degraded';
  else if (visibilityKm < 14) visImpact = 'Moderate';
  else if (visibilityKm < 20) visImpact = 'Good';

  const visibilityFactor: ObservationFactorScore = {
    value: `${visibilityKm.toFixed(1)} km`,
    score: visScore,
    weight: 0.25,
    contribution: Number((visScore * 0.25).toFixed(1)),
    impact: visImpact,
    description:
      visibilityKm >= 20
        ? 'Exceptional optical transparency with low aerosol extinction.'
        : visibilityKm >= 10
        ? 'Acceptable transparency; faint horizon haze may slightly diminish low-elevation objects.'
        : 'Atmospheric mist or dust haze significantly attenuates incoming starlight.',
  };

  // 3. Humidity Factor (Weight: 15%)
  // High humidity causes dew point condensation on corrector plates and lenses
  const hum = Math.min(100, Math.max(0, input.humidity));
  let humScore = 100;
  if (hum <= 40) {
    humScore = 100;
  } else if (hum <= 70) {
    humScore = Math.round(100 - (hum - 40) * 1.0);
  } else if (hum <= 85) {
    humScore = Math.round(70 - (hum - 70) * 2.0);
  } else {
    humScore = Math.round(Math.max(15, 40 - (hum - 85) * 1.6));
  }

  let humImpact = 'Optimal';
  if (hum > 85) humImpact = 'Degraded';
  else if (hum > 70) humImpact = 'Moderate';
  else if (hum > 45) humImpact = 'Good';

  const humidityFactor: ObservationFactorScore = {
    value: `${hum}%`,
    score: humScore,
    weight: 0.15,
    contribution: Number((humScore * 0.15).toFixed(1)),
    impact: humImpact,
    description:
      hum <= 50
        ? 'Dry air minimizes optics fogging and skyglow forward-scattering.'
        : hum <= 75
        ? 'Moderate humidity; keep dew shields or heaters handy for long exposures.'
        : 'High humidity creates high risk of lens condensation and heavy atmospheric water vapor.',
  };

  // 4. Wind Speed Factor (Weight: 10%)
  // Wind causes tripod vibration and atmospheric boundary turbulence (scintillation)
  const wind = Math.max(0, input.windSpeed);
  let windScore = 100;
  if (wind <= 10) {
    windScore = 100;
  } else if (wind <= 20) {
    windScore = Math.round(100 - (wind - 10) * 2.5);
  } else if (wind <= 35) {
    windScore = Math.round(75 - (wind - 20) * 2.0);
  } else {
    windScore = Math.round(Math.max(15, 45 - (wind - 35) * 1.5));
  }

  let windImpact = 'Optimal';
  if (wind > 35) windImpact = 'Degraded';
  else if (wind > 20) windImpact = 'Moderate';
  else if (wind > 10) windImpact = 'Good';

  const windFactor: ObservationFactorScore = {
    value: `${wind} km/h`,
    score: windScore,
    weight: 0.10,
    contribution: Number((windScore * 0.10).toFixed(1)),
    impact: windImpact,
    description:
      wind <= 12
        ? 'Calm to gentle breeze maintains steady seeing and eliminates mount vibration.'
        : wind <= 25
        ? 'Moderate breeze; telescope tracking may require solid ballast or windbreaks.'
        : 'High gusting causes mechanical mount shake and turbulent seeing.',
  };

  // 5. Light Pollution Factor (Weight: 15% when verified light-pollution data is available)
  // We intentionally do NOT estimate Bortle/radiance from coordinates. If no verified
  // light-pollution input is available, this factor is excluded and the remaining
  // available factors are normalized to 100%.
  let lightFactor: ObservationFactorScore;
  if (typeof input.bortleClass === 'number' && Number.isFinite(input.bortleClass)) {
    const bortle = Math.max(1, Math.min(9, input.bortleClass));
    const bortleMap: Record<number, number> = {
      1: 100, 2: 92, 3: 80, 4: 68, 5: 52, 6: 38, 7: 24, 8: 14, 9: 5,
    };
    const lightScore = bortleMap[Math.round(bortle)] || 50;
    let lightImpact = 'Optimal';
    if (bortle >= 7) lightImpact = 'Degraded';
    else if (bortle >= 5) lightImpact = 'Moderate';
    else if (bortle >= 3) lightImpact = 'Good';
    lightFactor = {
      value: `Bortle ${bortle}`,
      score: lightScore,
      weight: 0.15,
      contribution: Number((lightScore * 0.15).toFixed(1)),
      impact: lightImpact,
      description: 'Derived from the verified light-pollution dataset supplied to Aero Clear; not an official NASA score.',
    };
  } else {
    lightFactor = {
      value: 'Unavailable',
      score: 0,
      weight: 0,
      contribution: 0,
      impact: 'Unavailable',
      description: 'No verified light-pollution measurement is connected for this coordinate, so this factor is excluded rather than estimated.',
    };
  }

  // Total Composite Score Calculation
  // If light-pollution data is unavailable, normalize the weather factors so the
  // displayed score remains on a 0–100 scale without pretending the missing factor is known.
  const rawContributions =
    cloudFactor.contribution +
    visibilityFactor.contribution +
    humidityFactor.contribution +
    windFactor.contribution +
    lightFactor.contribution;
  const availableWeight =
    cloudFactor.weight + visibilityFactor.weight + humidityFactor.weight + windFactor.weight + lightFactor.weight;
  const totalScore = Math.round(availableWeight > 0 ? rawContributions / availableWeight : 0);

  const clampedScore = Math.max(0, Math.min(100, totalScore));
  const score10 = Number((clampedScore / 10).toFixed(1));

  // Determine Overall Rating
  let rating: 'Optimal' | 'Good' | 'Fair' | 'Poor';
  if (clampedScore >= 82) rating = 'Optimal';
  else if (clampedScore >= 68) rating = 'Good';
  else if (clampedScore >= 48) rating = 'Fair';
  else rating = 'Poor';

  // Build Human-Readable Summary
  let summary = '';
  if (rating === 'Optimal') {
    summary = 'Outstanding astronomical conditions. Clear skies and optimal transparency present excellent deep-sky opportunities.';
  } else if (rating === 'Good') {
    summary = 'Favorable observing conditions with mild atmospheric or light interference. High-contrast targets will be clearly resolved.';
  } else if (rating === 'Fair') {
    summary = 'Marginal observing conditions. Cloud intervals or urban light pollution recommend focusing on lunar and bright planetary targets.';
  } else {
    summary = 'Sub-optimal observing conditions. High cloud coverage, diminished visibility, or intense skyglow significantly hamper optical viewing.';
  }

  return {
    score: clampedScore,
    score10,
    rating,
    factors: {
      cloudCover: cloudFactor,
      visibility: visibilityFactor,
      humidity: humidityFactor,
      wind: windFactor,
      lightPollution: lightFactor,
    },
    summary,
    methodologyNote:
      lightFactor.weight > 0
        ? 'Project-defined weighting model: 35% Cloud Cover + 25% Visibility + 15% Humidity + 10% Wind + 15% Light Pollution. Comparative decision-support indicator; not an official astronomical standard.'
        : 'Project-defined weather-only weighting: 35% Cloud Cover + 25% Visibility + 15% Humidity + 10% Wind, normalized over the available 85%. Verified light-pollution data was unavailable and was excluded rather than estimated.',
  };
}
