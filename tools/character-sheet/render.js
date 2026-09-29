const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 2400, height: 1600 } });
  p.on('console', m => console.log('console:', m.text())); p.on('pageerror', e => console.log('ERR', e.message));
  for (const m of ['sheet', 'frame']) {
    await p.goto('file://' + __dirname + '/sheet.html?m=' + m);
    await p.waitForFunction('window.__done === true', null, { timeout: 60000 });
    await (await p.$('canvas')).screenshot({ path: m + '.png' });
  }
  await b.close();
})();
