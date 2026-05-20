const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const apiBaseUrl = process.env.API_BASE_URL || '/api';
const bannerFile = process.env.BANNER_CONFIG_PATH || '/run/configs/web-banner.json';

function loadBanner() {
  try {
    const raw = fs.readFileSync(bannerFile, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { title: 'Docker Swarm Store', message: 'banner config not loaded' };
  }
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'shop-web' });
});

app.get('/env.js', (_req, res) => {
  res.type('application/javascript');
  const banner = loadBanner();
  res.send(`window.__APP_CONFIG__ = ${JSON.stringify({ apiBaseUrl, banner })};`);
});

app.use('/static', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`shop-web listening on ${port}`);
});
