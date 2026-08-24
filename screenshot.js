const puppeteer = require('puppeteer');
const path = require('path');

const BASE = 'http://localhost:3099';
const OUT = '/home/vagent/hornada/build/lucienne/qa/ronda2';

const pages = [
  { url: '/home', name: 'home' },
  { url: '/experiencias', name: 'experiencias' },
  { url: '/relajate', name: 'relajate' },
  { url: '/reservar', name: 'reservar' },
  { url: '/membresia', name: 'membresia' },
  { url: '/conocenos', name: 'conocenos' },
  { url: '/galeria', name: 'galeria' },
  { url: '/journal', name: 'journal' },
  { url: '/offline', name: 'offline' },
  { url: '/admin', name: 'admin' },
];

async function shoot(browser, url, name, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${name}_${viewport.width}.png`, fullPage: false });
  await page.close();
  console.log(`✓ ${name} @ ${viewport.width}`);
}

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  for (const p of pages) {
    await shoot(browser, BASE + p.url, p.name, { width: 390, height: 844 });
    await shoot(browser, BASE + p.url, p.name, { width: 1440, height: 900 });
  }

  await browser.close();
  console.log('Done!');
})();
