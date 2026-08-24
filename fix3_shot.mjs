import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 430, height: 950 });
await page.goto('https://lu-78wswucgh-luis-projects-48b011f9.vercel.app/experiencias', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: '/tmp/experiencias_fixed.png' });
// zoom al tab bar
const nav = await page.$('nav');
if (nav) await nav.screenshot({ path: '/tmp/navbar_fixed.png' });
await browser.close();
console.log('DONE');
