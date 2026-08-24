import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 430, height: 950 });
await page.goto('https://lu-esk6yjspf-luis-projects-48b011f9.vercel.app/login', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 1200));
await page.screenshot({ path: '/tmp/login_passkey.png' });
await browser.close();
console.log('DONE');
