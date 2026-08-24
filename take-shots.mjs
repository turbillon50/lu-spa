import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const puppeteerPath = join(__dirname, 'node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js');
const { launch } = await import(puppeteerPath);

const BASE = 'http://localhost:3000';
const OUT = join(__dirname, 'qa/ronda3');
fs.mkdirSync(OUT, { recursive: true });

const publicShots = [
  { url: '/home', name: 'home' },
  { url: '/reservar', name: 'reservar' },
  { url: '/membresia', name: 'membresia' },
  { url: '/experiencias', name: 'experiencias' },
  { url: '/galeria', name: 'galeria' },
];

const adminShots = [
  { url: '/admin', name: 'admin' },
  { url: '/admin/reservas', name: 'admin-reservas' },
  { url: '/admin/clientas', name: 'admin-clientas' },
  { url: '/admin/servicios', name: 'admin-servicios' },
];

const browser = await launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
});

// Public shots
for (const s of publicShots) {
  for (const w of [390, 1440]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w <= 400 ? 844 : 900, deviceScaleFactor: 1 });
    await page.goto(BASE + s.url, { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: `${OUT}/${s.name}_${w}.png`, fullPage: false });
    await page.close();
    console.log('✓ ' + s.name + ' @ ' + w);
  }
}

// Admin shots — set localStorage CORRECTLY
for (const s of adminShots) {
  for (const w of [390, 1440]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w <= 400 ? 844 : 900, deviceScaleFactor: 1 });
    // First navigate to home to get into the app
    await page.goto(BASE + '/home', { waitUntil: 'networkidle2', timeout: 20000 });
    // Set the CORRECT localStorage key
    await page.evaluate(() => localStorage.setItem('lucienne::mode', 'admin'));
    // Now navigate to admin - give it time to hydrate
    await page.goto(BASE + s.url, { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: `${OUT}/${s.name}_${w}.png`, fullPage: false });
    await page.close();
    console.log('✓ ' + s.name + ' @ ' + w);
  }
}
await browser.close();
console.log('All done!');
