import puppeteer from 'puppeteer';
const pages = [
  'home','conocenos','contacto','experiencias','faq','galeria','gift-cards',
  'journal','membresia','para-dos','quiz','relajate','renueva','reservar',
  'services','store','transforma','buscar'
];
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
for (const p of pages) {
  try {
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`https://luciennespa.beauty/${p}`, { waitUntil: 'networkidle0', timeout: 20000 });
    await page.screenshot({ path: `/tmp/sweep_desk_${p}.png` });
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`https://luciennespa.beauty/${p}`, { waitUntil: 'networkidle0', timeout: 20000 });
    await page.screenshot({ path: `/tmp/sweep_mob_${p}.png` });
    console.log('OK', p);
  } catch (e) {
    console.log('FAIL', p, e.message);
  }
}
await browser.close();
console.log('DONE');
