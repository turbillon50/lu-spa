const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');

const BASE = 'http://localhost:3000';
const OUT = '/home/vagent/hornada/build/lucienne/qa/ronda3';
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  { url: '/home', name: 'home', admin: false },
  { url: '/reservar', name: 'reservar', admin: false },
  { url: '/membresia', name: 'membresia', admin: false },
  { url: '/experiencias', name: 'experiencias', admin: false },
  { url: '/galeria', name: 'galeria', admin: false },
  { url: '/admin', name: 'admin', admin: true },
  { url: '/admin/reservas', name: 'admin-reservas', admin: true },
  { url: '/admin/servicios', name: 'admin-servicios', admin: true },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  for (const s of shots) {
    for (const w of [390, 1440]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: w <= 400 ? 844 : 900, deviceScaleFactor: 1 });
      if (s.admin) {
        await page.goto(BASE + '/home', { waitUntil: 'networkidle2', timeout: 20000 });
        await page.evaluate(() => localStorage.setItem('lucienne-demo-mode', 'admin'));
      }
      await page.goto(BASE + s.url, { waitUntil: 'networkidle2', timeout: 20000 });
      await new Promise(r => setTimeout(r, 1500));
      await page.screenshot({ path: `${OUT}/${s.name}_${w}.png`, fullPage: false });
      await page.close();
      console.log('✓ ' + s.name + ' @ ' + w);
    }
  }
  await browser.close();
  console.log('All screenshots done!');
})();
