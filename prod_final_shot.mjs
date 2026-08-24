import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 430, height: 950 });
await page.goto('https://luciennespa.beauty/login', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: '/tmp/prod_login_final.png' });
await browser.close();
console.log('DONE');
