# Aero Clear — ASI Space Hackathon Prototype

Aero Clear is a transparent web prototype for exploring astronomical observation conditions alongside artificial-light information.

## Current data architecture

### Live direct inputs
- **Open-Meteo Forecast API** — current/hourly temperature, humidity, cloud cover, visibility, wind and WMO weather code.
- **Open-Meteo Geocoding API** — location search and WGS84 coordinates.

### Verified external light-pollution source
- **Light Pollution Map** — embedded as the light-pollution visualization for the selected coordinate. The map documents VIIRS / NASA Black Marble-derived layers.
- Aero Clear **does not scrape, invent, or interpolate** a VIIRS/Bortle value when a numeric light-pollution feed is unavailable to the application.

### Methodological/reference sources
- NASA Black Marble
- NASA Earthdata Worldview
- Globe at Night
- DarkSky International lighting principles

These sources are documented separately from the direct API inputs so the UI does not imply that an unavailable NASA feed is being queried directly.

## Observation Quality Score

The score is an **Aero Clear project-defined decision-support indicator**, not an official NASA/IAU/ISO measurement.

When verified light-pollution data is available, the project-defined model uses:

- Cloud cover — 35%
- Visibility — 25%
- Relative humidity — 15%
- Wind — 10%
- Light pollution — 15%

When verified light-pollution data is unavailable, the light-pollution factor is excluded and the remaining weather factors are normalized over their available 85%. No coordinate-based Bortle/radiance estimate is substituted.

## Simulation transparency

What-If / responsible-lighting scenarios are simulations based on explicit project assumptions. They are not NASA predictions or direct observations.

## Run locally

Prerequisites: Node.js 18+ (20+ recommended).

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Type checking:

```bash
npm run lint
```

## Environment variables

No API key is required for the current Open-Meteo/geocoding/light-pollution-map workflow.

Optional variables remain documented in `.env.example` for future AI workflows; they are not required for the core dashboard.

## Important limitations

- Open-Meteo provides forecast/model data, not a ground photometer measurement.
- Light Pollution Map is an external visualization; its numeric light-pollution layers are not currently ingested into the Aero Clear score.
- Satellite light data and modeled sky brightness have product-specific spatial/temporal limitations.
- A Bortle class should not be presented as a direct NASA measurement.
- Local haze, aerosols, nearby shielded/unshielded lights, terrain and observing equipment can cause ground conditions to differ from satellite/model products.
- The score is a comparative project indicator and should not replace an on-site astronomical survey.
