// Film 23'e özel çizimler → window.D23 (sahne değil)
(function () {
  const { PAL, stroke, line, circlePts, wash, inkDot } = INK;
  const W = W6;
  const D = {};
  // LED ampul: kubbe + soğutucu gövde; merkez (x,y) kubbe merkezi
  D.led = (ctx, x, y, s = 1, on = 1) => {
    if (on > 0) W.glow(ctx, x, y, 150 * s, on);
    const dome = P.arc(x, y, 30 * s, Math.PI * 0.92, Math.PI * 2.08, 30).concat([[x + 26 * s, y + 18 * s], [x - 26 * s, y + 18 * s]]);
    P.fillPts(ctx, dome, on > 0.5 ? '#FFF6DA' : PAL.white, 0.95); stroke(ctx, dome, { w: 2.6 * s, closed: true, dry: false, seed: 7001 });
    const body = [[x - 26 * s, y + 18 * s], [x + 26 * s, y + 18 * s], [x + 14 * s, y + 46 * s], [x - 14 * s, y + 46 * s], [x - 26 * s, y + 18 * s]]; W.shape(ctx, body, '#9A968C', 0.5, 7002);
    for (let i = 1; i < 4; i++) line(ctx, [x - 24 * s + i * 2 * s, y + 18 * s + i * 7 * s], [x + 24 * s - i * 2 * s, y + 18 * s + i * 7 * s], { w: 1.2, dry: false });
    const base = W.rect(x - 11 * s, y + 46 * s, x + 11 * s, y + 62 * s); P.fillPts(ctx, base, '#B9B2A2'); stroke(ctx, base, { w: 2 * s, closed: true, dry: false });
    [-12, 0, 12].forEach((d, i) => inkDot(ctx, x + d * s, y + 4 * s, 3 * s, { color: '227,160,58' }));
  };
  D.fridge = (ctx, x, y, s = 1, open = 0) => { // sol-alt
    const b = W.rect(x, y - 300 * s, x + 170 * s, y); W.shape(ctx, b, '#DCE3E6', 0.4, 7010);
    line(ctx, [x, y - 190 * s], [x + 170 * s, y - 190 * s], { w: 2.4, dry: false });
    if (open > 0) { const d = [[x + 170 * s, y - 300 * s], [x + 170 * s + 90 * s * open, y - 310 * s], [x + 170 * s + 90 * s * open, y + 10 * s], [x + 170 * s, y]]; W.shape(ctx, d, '#EEF1F2', 0.3, 7011); W.glow(ctx, x + 85 * s, y - 150 * s, 120 * s, open * 0.6, '200,225,240'); }
    line(ctx, [x + 145 * s, y - 270 * s], [x + 145 * s, y - 220 * s], { w: 5, dry: false }); line(ctx, [x + 145 * s, y - 170 * s], [x + 145 * s, y - 110 * s], { w: 5, dry: false });
  };
  D.washer = (ctx, x, y, s = 1, full = 1) => { // sol-alt
    const b = W.rect(x, y - 220 * s, x + 200 * s, y); W.shape(ctx, b, '#E6E4DE', 0.3, 7020);
    line(ctx, [x, y - 180 * s], [x + 200 * s, y - 180 * s], { w: 2, dry: false });
    const dr = circlePts(x + 100 * s, y - 85 * s, 62 * s, 62 * s, 36); P.fillPts(ctx, dr, '#9FC0D6', 0.8); stroke(ctx, dr, { w: 3, closed: true, dry: false, seed: 7021 });
    if (full > 0) [['#D98FA0', -18, 10], ['#9FC48A', 16, 18], ['#D9B45A', -4, -18], ['#8FB0C4', 22, -14]].forEach(([c, dx, dy], i) => P.fillPts(ctx, circlePts(x + (100 + dx) * s, y + (-85 + dy) * s, 22 * s, 16 * s, 16), c, 0.85 * full));
  };
  D.window = (ctx, x, y, w, h, t) => { // sol-üst
    const f = W.rect(x, y, x + w, y + h); P.fillPts(ctx, f, '#DDEBF2'); P.sun(ctx, x + w * 0.7, y + h * 0.35, Math.min(w, h) * 0.18, t, { nrays: 12, cells: false, glow: false });
    stroke(ctx, f, { w: 3, closed: true, dry: false }); line(ctx, [x + w / 2, y], [x + w / 2, y + h], { w: 2.4, dry: false });
    for (let i = 0; i < 4; i++) line(ctx, [x + w * 0.6 - i * 30, y + h * 0.5 + i * 20], [x + w * 0.2 - i * 40, y + h + 60 + i * 30], { w: 3, color: W.SUB, alpha: 0.35, dry: false });
  };
  D.bill = (ctx, x, y, s, lv = 1) => { // sol-üst; lv: çubuk boyu 0..1
    const p = W.rect(x, y, x + 220 * s, y + 290 * s); W.shape(ctx, p, null, 0, 7030);
    W.txt(ctx, 'FATURA', x + 110 * s, y + 46 * s, { size: 36 * s, align: 'center', color: W.ELEC });
    for (let i = 0; i < 3; i++) line(ctx, [x + 24 * s, y + (76 + i * 22) * s], [x + 196 * s, y + (76 + i * 22) * s], { w: 1.4, dry: false, alpha: 0.5 });
    [0.9, 0.8, 1].forEach((v, i) => { const h = 110 * s * v * (i === 2 ? lv : 1); P.fillPts(ctx, W.rect(x + (40 + i * 60) * s, y + 270 * s - h, x + (80 + i * 60) * s, y + 270 * s), i === 2 ? W.MOVE : '#9A968C', 0.85); });
  };
  D.switch = (ctx, x, y, s, on) => { const p = W.rr(x - 50 * s, y - 75 * s, 100 * s, 150 * s, 12 * s); W.shape(ctx, p, null, 0, 7040); const r = W.rr(x - 22 * s, y - 45 * s, 44 * s, 90 * s, 8 * s); P.fillPts(ctx, r, '#E6DFD0'); stroke(ctx, r, { w: 2, closed: true, dry: false }); P.fillPts(ctx, W.rect(x - 18 * s, on ? y - 40 * s : y + 2 * s, x + 18 * s, on ? y - 2 * s : y + 40 * s), '#8C8578'); };
  D.houseMini = (ctx, x, y, s, lit) => { const w = 80 * s, h = 60 * s; const b = W.rect(x - w / 2, y - h, x + w / 2, y); P.fillPts(ctx, b, '#E8DCC4'); stroke(ctx, b, { w: 1.6, closed: true, dry: false }); const r = [[x - w / 2 - 6 * s, y - h], [x, y - h - 36 * s], [x + w / 2 + 6 * s, y - h]]; P.fillPts(ctx, r, W.HEAT, 0.7); const wi = W.rect(x - 14 * s, y - 42 * s, x + 14 * s, y - 16 * s); P.fillPts(ctx, wi, lit ? '#FFE7A8' : '#46505C'); if (lit) W.glow(ctx, x, y - 30 * s, 34 * s, 0.6); };
  D.plant = (ctx, x, y, s, t) => { line(ctx, [x, y], [x + 6 * s, y - 220 * s], { w: 6 * s, color: '#4E6B2A', dry: false });
    [[-1, 0.35], [1, 0.55], [-1, 0.75], [1, 0.9]].forEach(([d, f], i) => { const bx = x + 3 * s, by = y - 220 * s * f; const sw = Math.sin(t * 1.2 + i) * 0.05; const lf = []; for (let j = 0; j <= 24; j++) { const u = j / 24, a = Math.PI * u; lf.push([bx + d * u * 110 * s, by - Math.sin(a) * 34 * s * (j < 12 ? 1 : 1) - u * 30 * s + sw * 40]); } for (let j = 24; j >= 0; j--) { const u = j / 24; lf.push([bx + d * u * 110 * s, by + Math.sin(Math.PI * u) * 14 * s - u * 30 * s + sw * 40]); } P.fillPts(ctx, lf, PAL.life, 0.85); stroke(ctx, lf, { w: 2, closed: true, dry: false, seed: 7050 + i }); }); };
  window.D23 = D;
})();
