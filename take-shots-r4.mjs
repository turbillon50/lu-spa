import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:3000';
const OUT = join(__dirname, 'qa/ronda4');
fs.mkdirSync(OUT, { recursive: true });

let browser;
try {
  const puppeteer = await import('puppeteer');
  browser = await puppeteer.default.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
} catch {
  console.error('puppeteer not found, trying puppeteer-core');
  const { launch } = await import('/home/vagent/hornada/build/lucienne/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js');
  browser = await launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
}

const shots = [
  { url: '/splash', name: 'splash' },
  { url: '/home', name: 'home' },
  { url: '/login', name: 'login' },
  { url: '/register', name: 'register' },
  { url: '/relajate', name: 'relajate' },
  { url: '/membresia', name: 'membresia' },
  { url: '/gift-cards', name: 'gift-cards' },
  { url: '/reservar', name: 'reservar' },
  { url: '/mi-lucienne', name: 'mi-lucienne' },
  { url: '/admin', name: 'admin' },
];

async function shot(page, url, name, viewport) {
  try {
    const prefix = viewport.width >= 1024 ? 'desk' : 'mob';
    await page.setViewport(viewport);
    await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 800));
    const filename = join(OUT, `${prefix}-${name}.png`);
    await page.screenshot({ path: filename, fullPage: false });
    console.log(`✓ ${filename}`);
  } catch (e) {
    console.error(`✗ ${name} (${viewport.width}): ${e.message}`);
  }
}

const mobVP = { width: 390, height: 844, deviceScaleFactor: 2 };
const deskVP = { width: 1440, height: 900, deviceScaleFactor: 1 };

const page = await browser.newPage();

// First set admin mode in localStorage for admin shots
await page.goto(`${BASE}/home`, { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});
await page.evaluate(() => {
  try { localStorage.setItem('lucienne::mode', 'client'); } catch {}
});

for (const s of shots) {
  if (s.url !== '/admin' && s.url !== '/mi-lucienne') {
    await shot(page, s.url, s.name, mobVP);
    await shot(page, s.url, s.name, deskVP);
  }
}

// Admin: switch mode
await page.goto(`${BASE}/home`, { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => {});
await page.evaluate(() => {
  try { localStorage.setItem('lucienne::mode', 'admin'); } catch {}
});
await shot(page, '/admin', 'admin', mobVP);
await shot(page, '/admin', 'admin', deskVP);

// mi-lucienne: switch to client mode
await page.evaluate(() => {
  try { localStorage.setItem('lucienne::mode', 'client'); } catch {}
});
await shot(page, '/mi-lucienne', 'mi-lucienne', mobVP);
await shot(page, '/mi-lucienne', 'mi-lucienne', deskVP);

await browser.close();
console.log('\nDone — screenshots in qa/ronda4/');
