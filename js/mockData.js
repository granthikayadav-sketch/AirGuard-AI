/**
 * AirGuard AI - Static Mock Data Store
 * Simulates real-time sensor streams, neural forecasts, and early warning systems.
 */

const AIRGUARD_DATA = {
  stations: [
    {
      id: "station-central",
      name: "Downtown Metro Station - Alpha 01",
      city: "Metro Central",
      coordinates: "40.7128° N, 74.0060° W",
      lat: 40.7128,
      lon: -74.0060,
      currentAQI: 148,
      aqiCategory: "Unhealthy for Sensitive Groups",
      aqiColor: "#f97316",
      aqiStatusBadge: "Sensitive Alert",
      dominantPollutant: "PM2.5",
      dailyChangePercent: "+12%",
      trendDirection: "up",
      lastUpdated: "Just now",
      metrics: {
        pm25: {
          value: 58.4,
          unit: "µg/m³",
          limit: 35,
          percent: 167,
          status: "Elevated",
          statusType: "warning",
          description: "Primary concern today. Respirable particulate matter."
        },
        pm10: {
          value: 86.2,
          unit: "µg/m³",
          limit: 150,
          percent: 57,
          status: "Moderate",
          statusType: "normal",
          description: "Coarse particles from dust and road traffic."
        },
        temperature: {
          value: 28.5,
          unit: "°C",
          feelsLike: 31.2,
          status: "Warm",
          statusType: "normal",
          description: "Thermal conditions promote secondary photochemical ozone."
        },
        humidity: {
          value: 68,
          unit: "%",
          dewPoint: 21.8,
          status: "Humid",
          statusType: "normal",
          description: "High humidity fosters moisture condensation on aerosol nuclei."
        },
        windSpeed: {
          value: 3.8,
          unit: "km/h",
          direction: "ENE (65°)",
          dispersion: "Very Low",
          status: "Stagnant",
          statusType: "danger",
          description: "Critical calm conditions inhibiting vertical pollutant dispersal."
        }
      },
      risk: {
        score: 72,
        level: "Elevated Threat",
        color: "#f97316",
        demographics: [
          { group: "Asthma & Respiratory Patients", advice: "Limit prolonged outdoor exertion; keep rescue inhalers accessible.", severity: "high" },
          { group: "Children & Senior Citizens", advice: "Avoid intensive physical activity during midday peak hours.", severity: "medium" },
          { group: "Healthy Adults & Athletes", advice: "Take frequent indoor rest breaks during high-intensity training.", severity: "low" }
        ],
        safetyIndex: {
          outdoorSports: "Moderate Risk",
          indoorAirQuality: "Clean (HEPA Active)",
          ventilationAdvice: "Keep Windows Closed"
        }
      },
      earlyWarning: {
        active: true,
        title: "Atmospheric Stagnation & Inversion Warning",
        severity: "CRITICAL ALERT",
        severityLevel: "high",
        timeframe: "Predicted Impact: In 2 - 4 hours",
        confidence: "96.4% Neural Certainty",
        summary: "Thermal inversion cap detected at 240m altitude with near-zero boundary winds. Local vehicular PM2.5 will concentrate rapidly in street canyons.",
        projectedAqiSpike: "186 AQI (Unhealthy)",
        actions: [
          "Auto-notify urban school districts & athletic faculties",
          "Trigger municipal misting systems across Highway 101 corridor",
          "Switch building HVAC filtration to recirculate & activate carbon stages"
        ]
      },
      aiInsights: [
        {
          id: 1,
          tag: "Pollutant Dispersion",
          type: "anomaly",
          headline: "Calm Wind Trap in Downtown Canyon",
          detail: "Wind speed dropped to 3.8 km/h. Dispersion index is currently 78% below seasonal average, trapping micro-soot at pedestrian breathing heights.",
          impact: "+34% PM2.5 concentration",
          confidence: "95%"
        },
        {
          id: 2,
          tag: "Predictive Forecast",
          type: "trend",
          headline: "Evening Rush Hour Convergence Risk",
          detail: "Machine learning ensemble predicts peak AQI will breach 175 between 18:30 and 20:00 as commuter exhaust intersects the descending cooler air layer.",
          impact: "Peak AQI ~186 at 19:15",
          confidence: "93%"
        },
        {
          id: 3,
          tag: "Mitigation Opportunity",
          type: "action",
          headline: "Favorable Marine Front Clearing by 22:30",
          detail: "High-probability maritime wind shift (+14 km/h westerly) will displace trapped stagnant plume, restoring AQI to 'Moderate' (<75) by late night.",
          impact: "-55% particulate load expected",
          confidence: "91%"
        }
      ]
    },
    {
      id: "station-industrial",
      name: "Industrial Port & Freight Hub - Beta 02",
      city: "Port District",
      coordinates: "40.6892° N, 74.0445° W",
      lat: 40.6892,
      lon: -74.0445,
      currentAQI: 172,
      aqiCategory: "Unhealthy",
      aqiColor: "#ef4444",
      aqiStatusBadge: "Hazard Warning",
      dominantPollutant: "PM10 / SO2",
      dailyChangePercent: "+24%",
      trendDirection: "up",
      lastUpdated: "1 min ago",
      metrics: {
        pm25: { value: 74.8, unit: "µg/m³", limit: 35, percent: 213, status: "Unhealthy", statusType: "danger", description: "Heavy diesel soot and boiler emissions." },
        pm10: { value: 168.4, unit: "µg/m³", limit: 150, percent: 112, status: "High", statusType: "danger", description: "Bulk cargo handling dust and industrial emissions." },
        temperature: { value: 30.1, unit: "°C", feelsLike: 34.0, status: "Hot", statusType: "warning", description: "Asphalt and metallic surfaces creating localized micro-heat island." },
        humidity: { value: 62, unit: "%", dewPoint: 21.0, status: "Normal", statusType: "normal", description: "Ambient harbor humidity." },
        windSpeed: { value: 5.1, unit: "km/h", direction: "NNE (30°)", dispersion: "Poor", status: "Low", statusType: "warning", description: "Weak surface breeze pushing smoke towards adjacent residential pockets." }
      },
      risk: {
        score: 84,
        level: "High Hazard",
        color: "#ef4444",
        demographics: [
          { group: "All Individuals", advice: "Avoid all strenuous outdoor physical work or sports.", severity: "high" },
          { group: "Vulnerable Populations", advice: "Remain indoors with continuous air filtration active.", severity: "high" },
          { group: "Dock & Port Personnel", advice: "Mandatory N95 particulate respirator usage recommended.", severity: "high" }
        ],
        safetyIndex: {
          outdoorSports: "Dangerous",
          indoorAirQuality: "Requires Air Scrubber",
          ventilationAdvice: "Seal Intakes"
        }
      },
      earlyWarning: {
        active: true,
        title: "Diesel Flume & Sulfur Concentration Spike",
        severity: "SEVERE ADVISORY",
        severityLevel: "danger",
        timeframe: "Predicted Impact: Immediate - 5 hours",
        confidence: "98.2% Neural Certainty",
        summary: "Simultaneous cargo ship berthing and low atmospheric ceiling are producing heavy sulfur dioxide and PM10 plumes.",
        projectedAqiSpike: "205 AQI (Very Unhealthy)",
        actions: [
          "Enforce shore-power protocol on idling freight ships",
          "Reroute heavy diesel truck convoy through eastern perimeter",
          "Issue public alert for harbor residential buffer zones"
        ]
      },
      aiInsights: [
        {
          id: 1,
          tag: "Industrial Emission",
          type: "anomaly",
          headline: "Stack Emission Plume Tracking",
          detail: "Optical and sensor triangulation detected unscrubbed particulate release from Terminal 4 at 17:40.",
          impact: "+48 µg/m³ spike detected",
          confidence: "98%"
        },
        {
          id: 2,
          tag: "Corridor Dispersion",
          type: "action",
          headline: "Buffer Zone Encroachment Alert",
          detail: "Downwind dispersion plume is encroaching on Bayview School District. Recommended prompt notification.",
          impact: "Buffer impact radius: 2.4 km",
          confidence: "94%"
        }
      ]
    },
    {
      id: "station-suburb",
      name: "Green Valley Ecological Reserve - Gamma 03",
      city: "Valley Ridge",
      coordinates: "40.7589° N, 73.9851° W",
      lat: 40.7589,
      lon: -73.9851,
      currentAQI: 42,
      aqiCategory: "Good",
      aqiColor: "#10b981",
      aqiStatusBadge: "Optimal Air",
      dominantPollutant: "Ozone (Low)",
      dailyChangePercent: "-6%",
      trendDirection: "down",
      lastUpdated: "Just now",
      metrics: {
        pm25: { value: 9.4, unit: "µg/m³", limit: 35, percent: 27, status: "Clean", statusType: "good", description: "Well within pristine WHO health criteria." },
        pm10: { value: 18.2, unit: "µg/m³", limit: 150, percent: 12, status: "Clean", statusType: "good", description: "Natural baseline background dust." },
        temperature: { value: 24.2, unit: "°C", feelsLike: 24.2, status: "Mild", statusType: "good", description: "Comfortable canopy-sheltered forest microclimate." },
        humidity: { value: 54, unit: "%", dewPoint: 14.5, status: "Pleasant", statusType: "good", description: "Optimal human comfort range." },
        windSpeed: { value: 12.6, unit: "km/h", direction: "SW (220°)", dispersion: "Excellent", status: "Breezy", statusType: "good", description: "Fresh mountain downslope clearing any regional haze." }
      },
      risk: {
        score: 18,
        level: "Minimal Risk",
        color: "#10b981",
        demographics: [
          { group: "All Population Segments", advice: "Air quality is considered satisfactory, and air pollution poses little or no risk.", severity: "low" },
          { group: "Athletes & Outdoor Enthusiasts", advice: "Prime conditions for outdoor training, running, and cycling.", severity: "low" }
        ],
        safetyIndex: {
          outdoorSports: "Safe & Encouraged",
          indoorAirQuality: "Pristine",
          ventilationAdvice: "Natural Ventilation Recommended"
        }
      },
      earlyWarning: {
        active: false,
        title: "No Adverse Alerts",
        severity: "NORMAL",
        severityLevel: "good",
        timeframe: "Next 48 Hours Stable",
        confidence: "99.1% Confidence",
        summary: "Continuous laminar mountain airflow and dense vegetative bio-filtration are maintaining pristine environmental conditions.",
        projectedAqiSpike: "Max 52 AQI (Good)",
        actions: [
          "Routine continuous telemetry monitoring",
          "Automated baseline calibration verified"
        ]
      },
      aiInsights: [
        {
          id: 1,
          tag: "Bio-Filtration",
          type: "trend",
          headline: "Canopy Air Purification Baseline",
          detail: "Natural forest canopy absorbing estimated 4.2 tons of particulate matter per week across reserve perimeter.",
          impact: "-70% pollutant level vs. Downtown",
          confidence: "97%"
        }
      ]
    }
  ],

  // Timeseries forecast data
  forecastSeries: {
    "24h": {
      labels: ["12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "00:00", "02:00", "04:00", "06:00", "08:00", "10:00"],
      aqi: [135, 142, 148, 172, 186, 168, 145, 120, 98, 110, 138, 145],
      upperConfidence: [145, 152, 160, 185, 198, 180, 156, 130, 108, 122, 148, 156],
      lowerConfidence: [125, 132, 136, 159, 174, 156, 134, 110, 88, 98, 128, 134],
      pm25: [52.1, 55.4, 58.4, 71.0, 79.2, 68.5, 56.0, 44.2, 35.8, 41.5, 54.0, 57.2]
    },
    "48h": {
      labels: ["Today 12:00", "Today 16:00", "Today 20:00", "Tmrw 00:00", "Tmrw 04:00", "Tmrw 08:00", "Tmrw 12:00", "Tmrw 16:00", "Tmrw 20:00", "Day 3 00:00", "Day 3 04:00", "Day 3 08:00", "Day 3 12:00"],
      aqi: [148, 175, 192, 150, 105, 132, 160, 182, 140, 95, 75, 88, 102],
      upperConfidence: [160, 188, 206, 164, 118, 146, 174, 196, 154, 108, 88, 100, 115],
      lowerConfidence: [136, 162, 178, 136, 92, 118, 146, 168, 126, 82, 62, 76, 89],
      pm25: [58.4, 69.2, 82.5, 57.0, 39.4, 51.2, 64.0, 75.8, 52.0, 36.5, 27.0, 32.4, 38.0]
    },
    "7d": {
      labels: ["Mon (Today)", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      aqi: [148, 170, 135, 96, 74, 52, 38],
      upperConfidence: [162, 185, 148, 108, 85, 62, 46],
      lowerConfidence: [134, 155, 122, 84, 63, 42, 30],
      pm25: [58.4, 67.2, 51.5, 34.8, 25.2, 17.0, 12.5]
    }
  }
};
