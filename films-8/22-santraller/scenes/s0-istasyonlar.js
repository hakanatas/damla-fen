// Film 22'ye özel santral çizimleri → window.ST22 (sahne değil; s3 ve s4 kullanır)
// Her çizim 1000×600'lük yerel kutuda (sol-üst 0,0; zemin y≈520). ST22.draw(ctx, key, x, y, s, t) kutuyu (x,y) sol-üstüne s ölçeğiyle yerleştirir.
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK;
  const W = W6;
  const D = {};
  const sky = (ctx, col = PAL.water, a = 0.1) => { const r = W.rect(0, 0, 1000, 600); P.fillPts(ctx, r, '#F4EEE0'); wash(ctx, r, col, a, 6001, { bleed: 2, blooms: 0 }); };
  D.hes = (ctx, t) => { sky(ctx); W.ground(ctx, 0, 1000, 520, 80, PAL.life, 6002); W.dam(ctx, 500, 520, 1.1, t, 1); };
  D.termik = (ctx, t) => { sky(ctx, '#8C8578', 0.12); W.ground(ctx, 0, 1000, 520, 80, '#8A6A45', 6003);
    const hp = [[90, 520], [150, 470], [210, 480], [260, 520]]; P.fillPts(ctx, hp, '#2E2B30', 0.95); stroke(ctx, hp, { w: 2, dry: false });
    W.building(ctx, 330, 520, 300, 170, 6004); W.stack(ctx, 400, 350, 1, t, 1); W.tower(ctx, 800, 520, 1.3, t, 1); };
  D.nukleer = (ctx, t) => { sky(ctx, PAL.water, 0.08); W.ground(ctx, 0, 1000, 520, 80, PAL.life, 6005);
    W.building(ctx, 120, 520, 260, 110, 6006); const dome = P.arc(330, 410, 110, Math.PI, 2 * Math.PI, 30, 120).concat([[440, 520], [220, 520]]); W.shape(ctx, dome, '#C9C2B2', 0.5, 6007);
    W.tower(ctx, 620, 520, 1.15, t, 1); W.tower(ctx, 840, 520, 1.15, t + 1.3, 1); };
  D.jeo = (ctx, t) => { sky(ctx, '#8C8578', 0.06); W.ground(ctx, 0, 1000, 330, 270, '#8A6A45', 6008);
    const res = circlePts(520, 520, 300, 55, 40); P.fillPts(ctx, res, '#BFD4DF'); wash(ctx, res, W.HEAT, 0.45, 6009, { bleed: 2, blooms: 1 }); stroke(ctx, res, { w: 2.4, closed: true, dry: false });
    W.txt(ctx, 'sıcak su', 520, 540, { size: 34, align: 'center', color: '#FBF8F1' });
    const pipe = [[430, 480], [430, 330], [430, 250]]; stroke(ctx, pipe, { w: 16, color: '#5A564E', dry: false }); stroke(ctx, pipe, { w: 9, color: '#D9B1A0', dry: false }); W.dots(ctx, [[430, 480], [430, 250]], t * 2, 1, 5, '#F4D8C8');
    W.building(ctx, 300, 330, 260, 110, 6010); W.tower(ctx, 760, 330, 0.9, t, 1); };
  D.ruzgar = (ctx, t) => { sky(ctx, PAL.water, 0.12); const hill = []; for (let i = 0; i <= 40; i++) { const x = i * 25; hill.push([x, 480 - Math.sin(i / 40 * 3.1) * 60]); } P.fillPts(ctx, hill.concat([[1000, 600], [0, 600]]), '#E6DCC6'); wash(ctx, hill.concat([[1000, 600], [0, 600]]), PAL.life, 0.35, 6011, { bleed: 2, blooms: 1 }); stroke(ctx, hill, { w: 3, dry: false });
    W.wind(ctx, 230, 450, 340, t, 1); W.wind(ctx, 520, 425, 380, t + 0.7, 1); W.wind(ctx, 800, 450, 320, t + 1.4, 1);
    for (let i = 0; i < 3; i++) { const u = ((t * 0.4 + i / 3) % 1); line(ctx, [40 + u * 300, 120 + i * 60], [120 + u * 300, 120 + i * 60], { w: 2.4, alpha: 0.6 * (1 - u), dry: false, color: PAL.water }); } };
  D.dalga = (ctx, t) => { sky(ctx, PAL.water, 0.1); W.ground(ctx, 0, 240, 360, 240, '#C9A35A', 6012); W.building(ctx, 40, 360, 170, 90, 6013);
    W.sea(ctx, 240, 1000, 380, t, 18, 0.55); [420, 600, 780].forEach(x => W.buoy(ctx, x, 380, 1, t));
    line(ctx, [210, 330], [420, 400], { w: 3, dry: false, bend: -0.1 }); line(ctx, [420, 400], [780, 400], { w: 2, dry: false, alpha: 0.6 }); };
  D.gunes = (ctx, t) => { sky(ctx, PAL.light, 0.12); P.sun(ctx, 860, 110, 60, t, { nrays: 14, cells: false }); W.ground(ctx, 0, 1000, 520, 80, '#C9A35A', 6014);
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) W.standPanel(ctx, 150 + c * 220 + r * 110, 380 + r * 125, 150, r * 4 + c); };
  const NAMES = { hes: 'Hidroelektrik', termik: 'Termik', nukleer: 'Nükleer', jeo: 'Jeotermal', ruzgar: 'Rüzgâr', dalga: 'Dalga', gunes: 'Güneş' };
  function draw(ctx, key, x, y, s, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1000, 600); ctx.clip(); D[key](ctx, t); ctx.restore();
    stroke(ctx, W.rect(0, 0, 1000, 600), { w: 3 / Math.max(0.3, s), closed: true, dry: false, seed: 6020 });
    ctx.restore();
  }
  window.ST22 = { draw, NAMES, KEYS: ['hes', 'termik', 'nukleer', 'jeo', 'ruzgar', 'dalga', 'gunes'] };
})();
