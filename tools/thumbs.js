// Öğretmen sayfası görsellerini üretir:
//   img/filmler/<sınıf>-<slug>.jpg  → her filmden bir önizleme karesi (640×360, altyazısız)
//   img/damla.png                   → başlık alanındaki Damla çizimi (saydam arka plan)
// Kullanım: npx http-server -p 8080 . &  ;  node tools/thumbs.js [http://localhost:8080] [--hepsi]
// Varsayılan olarak yalnızca görseli olmayan filmler üretilir; --hepsi hepsini yeniler.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const BASE = (process.argv.find(a => a.startsWith('http')) || 'http://localhost:8080').replace(/\/$/, '');
const ALL = process.argv.includes('--hepsi');
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/catalog.json'), 'utf8'));

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const p = await b.newPage();
  p.on('pageerror', e => console.log('HATA', e.message));

  for (const f of catalog) {
    const out = path.join(ROOT, 'img/filmler', `${f.g}-${f.slug}.jpg`);
    if (!ALL && fs.existsSync(out)) continue;
    const dir = (f.g === 5 ? 'films' : 'films-' + f.g) + '/' + f.slug;
    await p.goto(`${BASE}/${dir}/index.html?headless=1&captions=off`);
    await p.waitForFunction('window.__ready === true', null, { timeout: 60000 });
    const data = await p.evaluate(() => {
      const t = TIMING.total * 0.42;                       // filmin ortasına yakın bir kare
      E.renderFrame(document.getElementById('cv').getContext('2d'), t);
      const c = document.createElement('canvas'); c.width = 640; c.height = 360;
      const x = c.getContext('2d'); x.imageSmoothingQuality = 'high';
      x.drawImage(document.getElementById('cv'), 0, 0, 640, 360);
      return c.toDataURL('image/jpeg', 0.8);
    });
    fs.writeFileSync(out, Buffer.from(data.split(',')[1], 'base64'));
    console.log('görsel:', path.relative(ROOT, out));
  }

  const hero = path.join(ROOT, 'img/damla.png');
  if (ALL || !fs.existsSync(hero)) {
    await p.goto(`${BASE}/films/01-gunes/index.html?headless=1`);
    await p.waitForFunction('window.__ready === true', null, { timeout: 60000 });
    const data = await p.evaluate(() => {
      const c = document.createElement('canvas'); c.width = 600; c.height = 620;
      DAMLA.draw(c.getContext('2d'), { x: 240, y: 585, s: 2.3, view: 'front', expr: 'curious', look: [0.55, -0.1],
        arms: [[-1, 0.45], [1, 2.1, 0.6]], prop: 'lens', propTilt: -0.4, seed: 1, t: 0.4 });
      return c.toDataURL('image/png');
    });
    fs.writeFileSync(hero, Buffer.from(data.split(',')[1], 'base64'));
    console.log('görsel: img/damla.png');
  }
  await b.close();
})();
