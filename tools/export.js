// Deterministic frame-by-frame MP4 export (Playwright + FFmpeg). No screen recording.
// node tools/export.js films/01-gunes [--captions=on|off] [--fps=30] [--workers=2] [--from=0] [--to=T]
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const path = require('path'), fs = require('fs');
const film = path.resolve(process.argv[2]);
const arg = (k, d) => { const a = process.argv.find(x => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : d; };
const CAP = arg('captions', 'on'), FPS = +arg('fps', 30), WORKERS = +arg('workers', 2);
const TIMING = require(path.join(film, 'timing.js'));
const T0 = +arg('from', 0), T1 = +arg('to', TIMING.total);
const name = path.basename(film) + (TIMING.silent ? '_sessiz' : '') + (CAP === 'on' ? '_altyazili' : '');
const outDir = path.join(film, 'export'); fs.mkdirSync(outDir, { recursive: true });
const frames = Math.round((T1 - T0) * FPS);

async function worker(w, f0, f1, browser) {
  const seg = path.join(outDir, `seg${w}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', arg('preset', 'veryfast'), '-crf', arg('crf', '20'), '-pix_fmt', 'yuv420p', '-threads', '1', seg]);
  ff.stderr.on('data', d => process.stderr.write(d));
  const p = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + path.join(film, 'index.html') + '?headless=1&captions=' + CAP);
  await p.waitForFunction('window.__ready === true');
  const t0 = Date.now();
  for (let f = f0; f < f1; f++) {
    const t = T0 + f / FPS;
    const data = await p.evaluate(tt => window.frameJPEG(tt, 0.95), t);
    const buf = Buffer.from(data.slice(data.indexOf(',') + 1), 'base64');
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - f0) % 300 === 0) console.log(`[w${w}] ${f - f0}/${f1 - f0}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await p.close();
  return seg;
}
(async () => {
  const browser = await chromium.launch();
  const per = Math.ceil(frames / WORKERS), jobs = [];
  for (let w = 0; w < WORKERS; w++) jobs.push(worker(w, w * per, Math.min(frames, (w + 1) * per), browser));
  const segs = await Promise.all(jobs); await browser.close();
  const list = path.join(outDir, 'list.txt'); fs.writeFileSync(list, segs.map(s => `file '${s}'`).join('\n'));
  const out = path.join(outDir, name + '.mp4'), audio = path.join(film, 'audio', 'mix.m4a');
  const a = fs.existsSync(audio) ? ['-ss', String(T0), '-t', String(T1 - T0), '-i', audio, '-c:a', 'copy', '-shortest'] : [];
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, ...a, '-c:v', 'copy', '-movflags', '+faststart', out], { stdio: 'inherit' });
  segs.forEach(s => fs.unlinkSync(s)); fs.unlinkSync(list);
  const srt = path.join(film, path.basename(film) + '.srt'); if (fs.existsSync(srt)) fs.copyFileSync(srt, path.join(outDir, path.basename(film) + '.srt'));
  console.log('OK →', out);
})();
