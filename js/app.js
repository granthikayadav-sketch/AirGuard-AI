/**
 * AirGuard AI - Frontend Controller & Dashboard Visualizations
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentForecastRange = '24h';
  let activeStationId = 'station-central';
  let forecastChart = null;

  const stationSelect = document.getElementById('stationSelect');
  const refreshBtn = document.getElementById('refreshBtn');
  const liveClockEl = document.getElementById('liveClock');

  function initStationSelector() {
  if (!stationSelect) return;

  stationSelect.innerHTML = '';

  AIRGUARD_DATA.stations.forEach(st => {
    const option = document.createElement('option');

    option.value = st.id;
    option.textContent = st.name;

    if (st.id === activeStationId) {
      option.selected = true;
    }

    stationSelect.appendChild(option);
  });

  stationSelect.addEventListener('change', () => {
    activeStationId = stationSelect.value;
    updateDashboardForStation(activeStationId);
  });
}
  // ================================
  // UPDATE DASHBOARD
  // ================================
  function updateDashboardForStation(stationId) {
    const station =
      AIRGUARD_DATA.stations.find(s => s.id === stationId) ||
      AIRGUARD_DATA.stations[0];

    if (!station) return;

    // AQI
    const aqiNumberEl = document.getElementById('aqiNumber');
    const aqiRadialFill = document.getElementById('aqiRadialFill');
    const aqiStatusChip = document.getElementById('aqiStatusChip');
    const aqiPollutantEl = document.getElementById('aqiPollutant');
    const aqiChangePill = document.getElementById('aqiChangePill');
    const aqiCardEl = document.getElementById('aqiCard');

    if (aqiNumberEl) {
      aqiNumberEl.textContent = station.currentAQI;
    }

    if (aqiStatusChip) {
      aqiStatusChip.textContent = station.aqiCategory || 'Live Data';
      aqiStatusChip.style.borderColor = station.aqiColor || '#06b6d4';
      aqiStatusChip.style.color = station.aqiColor || '#06b6d4';
    }

    if (aqiPollutantEl) {
      aqiPollutantEl.textContent = station.dominantPollutant || 'PM2.5';
    }

    if (aqiChangePill) {
      aqiChangePill.textContent = station.dailyChangePercent || 'Live';
    }

    if (aqiCardEl) {
      aqiCardEl.style.borderLeftColor =
        station.aqiColor || '#06b6d4';
    }

    if (aqiRadialFill) {
      const circumference = 2 * Math.PI * 50;
      const pct = Math.min(
        Math.max(station.currentAQI / 300, 0),
        1
      );

      const offset = circumference - pct * circumference;

      aqiRadialFill.style.stroke =
        station.aqiColor || '#06b6d4';

      aqiRadialFill.style.strokeDashoffset = offset;
    }

    // Risk
    const riskLevelName =
      document.getElementById('riskLevelName');

    const riskScoreVal =
      document.getElementById('riskScoreVal');

    const riskBanner =
      document.getElementById('riskBanner');

    const advisoriesList =
      document.getElementById('riskAdvisoriesList');

    if (riskLevelName && station.risk) {
      riskLevelName.textContent = station.risk.level;
      riskLevelName.style.color = station.risk.color;
    }

    if (riskScoreVal && station.risk) {
      riskScoreVal.textContent = Math.min(
  Math.round((station.currentAQI / 200) * 100),
  100
);
    }

    if (riskBanner && station.risk) {
      riskBanner.style.backgroundColor =
        `${station.risk.color}15`;

      riskBanner.style.borderColor =
        `${station.risk.color}40`;
    }

    // Risk meter
    const segments =
      document.querySelectorAll('.meter-segment');

    let activeSegments = 1;

    if (station.currentAQI <= 50) {
      activeSegments = 1;
    } else if (station.currentAQI <= 100) {
      activeSegments = 2;
    } else if (station.currentAQI <= 150) {
      activeSegments = 3;
    } else if (station.currentAQI <= 200) {
      activeSegments = 4;
    } else {
      activeSegments = 5;
    }

    segments.forEach((seg, idx) => {
      seg.classList.remove('active');

      if (idx < activeSegments) {
        seg.classList.add('active');
      }
    });

    // Advisories
    if (
      advisoriesList &&
      station.risk &&
      station.risk.demographics
    ) {
      advisoriesList.innerHTML =
        station.risk.demographics
          .map(ad => `
            <div class="advisory-item">
              <div class="advisory-dot ${ad.severity}"></div>
              <div>
                <strong>${ad.group}:</strong> ${ad.advice}
              </div>
            </div>
          `)
          .join('');
    }

    // Early warning
    const ew = station.earlyWarning;

    if (ew) {
      const warningBeaconTag =
        document.getElementById('warningBeaconTag');

      const warningTime =
        document.getElementById('warningTime');

      const warningTitle =
        document.getElementById('warningTitle');

      const warningSummary =
        document.getElementById('warningSummary');

      const warningSpike =
        document.getElementById('warningSpike');

      const warningActions =
        document.getElementById('warningActions');

      if (warningBeaconTag)
        warningBeaconTag.textContent = ew.severity;

      if (warningTime)
        warningTime.textContent = ew.timeframe;

      if (warningTitle)
        warningTitle.textContent = ew.title;

      if (warningSummary)
        warningSummary.textContent = ew.summary;

      if (warningSpike)
        warningSpike.textContent = ew.projectedAqiSpike;

      if (warningActions && ew.actions) {
        warningActions.innerHTML =
          ew.actions
            .map(act => `<li>${act}</li>`)
            .join('');
      }
    }

    // Metrics
    const m = station.metrics;

    if (m) {
      updateMetricCard(
        'pm25',
        m.pm25.value,
        m.pm25.status,
        m.pm25.statusType,
        m.pm25.percent,
        `${m.pm25.limit} µg/m³`
      );

      updateMetricCard(
        'pm10',
        m.pm10.value,
        m.pm10.status,
        m.pm10.statusType,
        m.pm10.percent,
        `${m.pm10.limit} µg/m³`
      );

      updateMetricCard(
        'temp',
        m.temperature.value,
        m.temperature.status,
        m.temperature.statusType,
        (m.temperature.value / 45) * 100,
        `Feels ${m.temperature.feelsLike}°C`
      );

      updateMetricCard(
        'humidity',
        m.humidity.value,
        m.humidity.status,
        m.humidity.statusType,
        m.humidity.value,
        `Dew pt ${m.humidity.dewPoint}°C`
      );

      updateMetricCard(
        'wind',
        m.windSpeed.value,
        m.windSpeed.status,
        m.windSpeed.statusType,
        (m.windSpeed.value / 30) * 100,
        `${m.windSpeed.direction}`
      );
    }

    // AI Insights
    const insightsContainer =
      document.getElementById('insightsItemsList');

    if (
      insightsContainer &&
      station.aiInsights
    ) {
      insightsContainer.innerHTML =
        station.aiInsights
          .map(ins => `
            <div class="insight-block">
              <div class="insight-top-bar">
                <span class="insight-tag">
                  ${ins.tag}
                </span>

                <span class="insight-confidence">
                  ${ins.confidence} conf.
                </span>
              </div>

              <div class="insight-headline">
                ${ins.headline}
              </div>

              <div class="insight-detail">
                ${ins.detail}
              </div>

              <div class="insight-impact-pill">
                Impact: ${ins.impact}
              </div>
            </div>
          `)
          .join('');
    }

    renderForecastChart(currentForecastRange);
  }

  // ================================
  // METRIC CARDS
  // ================================
  function updateMetricCard(
    idPrefix,
    val,
    status,
    statusType,
    percent,
    footerText
  ) {
    const valEl =
      document.getElementById(`${idPrefix}Val`);

    const statusEl =
      document.getElementById(`${idPrefix}Status`);

    const barEl =
      document.getElementById(`${idPrefix}Bar`);

    const noteEl =
      document.getElementById(`${idPrefix}Note`);

    if (valEl) valEl.textContent = val;

    if (statusEl) {
      statusEl.textContent = status;
      statusEl.className =
        `metric-status-tag tag-${statusType}`;
    }

    if (barEl) {
      barEl.style.width =
        `${Math.min(Math.max(percent, 5), 100)}%`;

      barEl.className =
        `metric-progress-fill fill-${statusType}`;
    }

    if (noteEl) {
      noteEl.textContent = footerText;
    }
  }

  // ================================
  // LIVE API CONNECTION
  // ================================
  async function fetchLiveAirQuality(station) {
    try {
      console.log('🔄 Getting live air quality...');

      const response = await fetch(
        `http://localhost:3000/api/air-quality?lat=${station.lat}&lon=${station.lon}`
      );

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.current) {
        throw new Error('No current data received');
      }

      const current = data.current;

      console.log('✅ LIVE API DATA:', current);

      // Update AQI
      if (current.us_aqi !== undefined) {
        station.currentAQI =
          Math.round(current.us_aqi);
      }
      document.getElementById('aqiNumber').textContent = station.currentAQI;

      // Update PM2.5
      if (current.pm2_5 !== undefined) {
        station.metrics.pm25.value =
          Number(current.pm2_5).toFixed(1);
      }

      // Update PM10
      if (current.pm10 !== undefined) {
        station.metrics.pm10.value =
          Number(current.pm10).toFixed(1);
      }

      // Update dashboard WITHOUT fetching API again
      updateDashboardForStation(station.id);

      console.log(
        `🌍 AirGuard Live AQI: ${station.currentAQI}`
      );

    } catch (error) {
      console.error(
        '❌ Live Air Quality Error:',
        error
      );
    }
  }

  // ================================
  // FORECAST CHART
  // ================================
  function renderForecastChart(rangeKey) {
    const ctx =
      document.getElementById('forecastChart');

    if (!ctx) return;

    if (typeof Chart === 'undefined') {
      console.warn('Chart.js is not loaded.');
      return;
    }

    const seriesData =
      AIRGUARD_DATA.forecastSeries[rangeKey] ||
      AIRGUARD_DATA.forecastSeries['24h'];

    if (!seriesData) return;

    const rangeTitle =
      rangeKey === '24h'
        ? 'Next 24 Hours'
        : rangeKey === '48h'
          ? '48 Hours'
          : '7 Days';

    if (forecastChart) {
      forecastChart.data.labels =
        seriesData.labels;

      forecastChart.data.datasets[0].data =
        seriesData.aqi;

      forecastChart.data.datasets[1].data =
        seriesData.upperConfidence;

      forecastChart.data.datasets[2].data =
        seriesData.lowerConfidence;

      forecastChart.update('active');
      return;
    }

    const chartContext =
      ctx.getContext('2d');

    const gradient =
      chartContext.createLinearGradient(
        0,
        0,
        0,
        260
      );

    gradient.addColorStop(
      0,
      'rgba(6, 182, 212, 0.45)'
    );

    gradient.addColorStop(
      0.5,
      'rgba(6, 182, 212, 0.15)'
    );

    gradient.addColorStop(
      1,
      'rgba(6, 182, 212, 0.0)'
    );

    const confGradient =
      chartContext.createLinearGradient(
        0,
        0,
        0,
        260
      );

    confGradient.addColorStop(
      0,
      'rgba(99, 102, 241, 0.2)'
    );

    confGradient.addColorStop(
      1,
      'rgba(99, 102, 241, 0.02)'
    );

    forecastChart = new Chart(chartContext, {
      type: 'line',

      data: {
        labels: seriesData.labels,

        datasets: [
          {
            label: `Predicted AQI (${rangeTitle})`,
            data: seriesData.aqi,
            borderColor: '#06b6d4',
            borderWidth: 3,
            pointBackgroundColor: '#06b6d4',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.38,
            fill: true,
            backgroundColor: gradient
          },
          {
            label: 'Upper Confidence (95%)',
            data: seriesData.upperConfidence,
            borderColor:
              'rgba(99, 102, 241, 0.4)',
            borderDash: [5, 5],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: '+1',
            backgroundColor: confGradient,
            tension: 0.38
          },
          {
            label: 'Lower Confidence (95%)',
            data: seriesData.lowerConfidence,
            borderColor:
              'rgba(99, 102, 241, 0.4)',
            borderDash: [5, 5],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
            tension: 0.38
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false
          }
        },

        scales: {
          y: {
            min: 0,
            max: 220,

            ticks: {
              stepSize: 50,

              callback: value =>
                `${value} AQI`
            }
          }
        }
      }
    });
  }

  // ================================
  // TIME RANGE
  // ================================
  function setForecastRange(rangeKey) {
    if (
      !rangeKey ||
      !AIRGUARD_DATA.forecastSeries[rangeKey]
    ) {
      return;
    }

    currentForecastRange = rangeKey;

    document
      .querySelectorAll('.time-toggle-btn')
      .forEach(btn => {
        const bRange =
          btn.getAttribute('data-range') ||
          btn.dataset.range;

        btn.classList.toggle(
          'active',
          bRange === rangeKey
        );
      });

    const subtitleEl =
      document.getElementById(
        'forecastRangeInfo'
      );

    if (subtitleEl) {
      if (rangeKey === '24h') {
        subtitleEl.textContent =
          'Showing: Next 24 Hours (Hourly AI Projection) • 95% Confidence Interval';
      }

      if (rangeKey === '48h') {
        subtitleEl.textContent =
          'Showing: 48-Hour Forecast • 95% Confidence Interval';
      }

      if (rangeKey === '7d') {
        subtitleEl.textContent =
          'Showing: 7-Day Extended Outlook • 95% Confidence Interval';
      }
    }

    renderForecastChart(rangeKey);
  }

  function initTimeRangeToggles() {
    document
      .querySelectorAll('.time-toggle-btn')
      .forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();

          const range =
            btn.getAttribute('data-range') ||
            btn.dataset.range;

          if (range) {
            setForecastRange(range);
          }
        });
      });

    window.setForecastRange =
      setForecastRange;
  }

  // ================================
  // LIVE CLOCK
  // ================================
  function updateLiveClock() {
    if (!liveClockEl) return;

    const now = new Date();

    liveClockEl.textContent =
      now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
  }

  // ================================
  // REFRESH BUTTON
  // ================================
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.style.transform =
        'rotate(180deg)';

      refreshBtn.style.color =
        '#38bdf8';

      const station =
        AIRGUARD_DATA.stations.find(
          s => s.id === activeStationId
        );

      if (station) {
        await fetchLiveAirQuality(station);
      }

      setTimeout(() => {
        refreshBtn.style.transform =
          'rotate(0deg)';

        refreshBtn.style.color = '';
      }, 400);
    });
  }

  // ================================
  // MITIGATION BUTTON
  // ================================
  const mitigateBtn =
    document.getElementById(
      'mitigateBriefBtn'
    );

  if (mitigateBtn) {
    mitigateBtn.addEventListener(
      'click',
      () => {
        const originalText =
          mitigateBtn.textContent;

        mitigateBtn.textContent =
          'Generating Brief...';

        setTimeout(() => {
          mitigateBtn.textContent =
            'Brief Prepared ✓';

          setTimeout(() => {
            mitigateBtn.textContent =
              originalText;
          }, 2000);
        }, 700);
      }
    );
  }

  // ================================
  // START AIRGUARD
  // ================================
  initStationSelector();
  initTimeRangeToggles();

  // Show demo data first
  updateDashboardForStation(
    activeStationId
  );

  // Then load LIVE API data
  const activeStation =
    AIRGUARD_DATA.stations.find(
      s => s.id === activeStationId
    );

  if (activeStation) {
    fetchLiveAirQuality(activeStation);
  }

  updateLiveClock();

  setInterval(
    updateLiveClock,
    1000
  );
  // ===============================
// AIRGUARD LIVE MAP
// ===============================

const airMap = L.map('airMap').setView([40.7128, -74.0060], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(airMap);
// ===============================
// MONITORING STATION MARKERS
// ===============================

const mapStations = [
  {
    name: "Alpha 01",
    type: "Central Monitoring Station",
    lat: 40.7128,
    lon: -74.0060,
    aqi: 66
  },
  {
    name: "Beta 02",
    type: "Industrial Monitoring Station",
    lat: 40.6892,
    lon: -74.0445,
    aqi: 72
  },
  {
    name: "Gamma 03",
    type: "Suburban Monitoring Station",
    lat: 40.7589,
    lon: -73.9851,
    aqi: 54
  }
];
mapStations.forEach(mapStation => {
  const realStation = AIRGUARD_DATA.stations.find(
    s => s.lat === mapStation.lat && s.lon === mapStation.lon
  );

  if (realStation) {
    mapStation.aqi = realStation.currentAQI;
  }
});

mapStations.forEach(station => {

  const marker = L.marker([
    station.lat,
    station.lon
  ]).addTo(airMap);

  marker.bindPopup(`
    <strong>${station.name}</strong><br>
    ${station.type}<br>
    <strong>US AQI: ${station.aqi}</strong>
  `);
  marker.on('click', () => {

  const stationSelect = document.getElementById('stationSelect');

  const matchingStation = AIRGUARD_DATA.stations.find(
    s => s.lat === station.lat && s.lon === station.lon
  );

  if (matchingStation) {
    stationSelect.value = matchingStation.id;
    stationSelect.dispatchEvent(new Event('change'));
  }

   });
   const useMyLocationBtn = document.getElementById('useMyLocationBtn');

if (useMyLocationBtn) {
  useMyLocationBtn.addEventListener('click', () => {

    if (!navigator.geolocation) {
      alert('Location is not supported by your browser.');
      return;
    }

    useMyLocationBtn.textContent = '📍 Getting Location...';

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        airMap.setView([lat, lon], 12);
        fetch(`http://localhost:3000/api/air-quality?lat=${lat}&lon=${lon}`)
  .then(response => response.json())
  .then(data => {
    if (data.current && data.current.us_aqi !== undefined) {
      document.getElementById('aqiNumber').textContent =
        Math.round(data.current.us_aqi);
    }
  })
  .catch(error => {
    console.error('Location AQI Error:', error);
  });

        L.marker([lat, lon])
          .addTo(airMap)
          .bindPopup('<strong>📍 Your Current Location</strong>')
          .openPopup();

        useMyLocationBtn.textContent = '📍 Location Updated';

      },
      () => {
        alert('Please allow location access in your browser.');
        useMyLocationBtn.textContent = '📍 Use My Location';
      }
    );

  });
}

});
});
