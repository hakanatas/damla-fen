// node tools/shots.js films/01-gunes out_dir t1 t2 ...   → renders single frames to PNG for inspection
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const [film, out, ...ts] = process.argv.slice(2);
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
  await p.goto('file://' + path.resolve(film, 'index.html') + '?headless=1&captions=' + (process.env.CAP || 'on'));
  await p.waitForFunction('window.__ready === true');
  for (const t of ts) {
    const t0 = Date.now();
    const data = await p.evaluate(tt => window.frameJPEG(tt, 0.85), +t);
    fs.writeFileSync(path.join(out, `t${String(t).padStart(6, '0')}.jpg`), Buffer.from(data.split(',')[1], 'base64'));
    console.log('t=' + t, (Date.now() - t0) + 'ms');
  }
  await b.close();
})();
