const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Air Quality API
async function getAirQuality(lat, lon) {
  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone` +
    `&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Air Quality API error: ${response.status}`);
  }

  return await response.json();
}

// API route
async function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/air-quality') {
    const lat = parseFloat(url.searchParams.get('lat'));
    const lon = parseFloat(url.searchParams.get('lon'));

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      res.writeHead(400, {
        'Content-Type': 'application/json; charset=utf-8'
      });

      res.end(JSON.stringify({
        error: 'Valid latitude and longitude are required.'
      }));

      return;
    }

    try {
      const data = await getAirQuality(lat, lon);

      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });

      res.end(JSON.stringify(data));
    } catch (error) {
      console.error(error);

      res.writeHead(500, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });

      res.end(JSON.stringify({
        error: 'Unable to fetch air quality data.'
      }));
    }

    return true;
  }

  return false;
}

// Serve website files
function serveFile(req, res) {
  let reqPath = req.url.split('?')[0];

  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8'
      });

      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType =
      MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    fs.createReadStream(filePath).pipe(res);
  });
}

// Main server
const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/')) {
    const handled = await handleApi(req, res);

    if (handled) {
      return;
    }
  }

  serveFile(req, res);
});

server.listen(PORT, () => {
  console.log(
    `\x1b[32m[AirGuard AI Server]\x1b[0m Dashboard running at http://localhost:${PORT}`
  );
});
